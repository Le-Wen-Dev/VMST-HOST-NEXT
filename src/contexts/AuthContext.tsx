import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { pb, getCurrentUser, isAdmin, UserRecord } from '../services/pocketbase';

interface RegisterInput {
  email: string;
  password: string;
  passwordConfirm: string;
  name?: string;
}

interface UpdateProfileInput {
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

interface AuthContextType {
  user: UserRecord | null;
  token: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<UserRecord>;
  logout: () => void;
  register: (input: RegisterInput) => Promise<UserRecord>;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: (input: UpdateProfileInput) => Promise<UserRecord>;
  changePassword: (newPassword: string, confirmPassword: string) => Promise<UserRecord>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 7-day token persistence
const TOKEN_STORAGE_KEY = 'pb_auth_token_7days';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
function saveTokenToStorage(token: string | null, model: UserRecord | null) {
  if (!token || !model) {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    return;
  }
  const payload = {
    token,
    model,
    expiresAt: Date.now() + SEVEN_DAYS_MS,
  };
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(payload));
  } catch {}
}
function loadTokenFromStorage(): { token: string; model: UserRecord } | null {
  try {
    const raw = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.token || !parsed?.model) return null;
    if (Date.now() > (parsed.expiresAt || 0)) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    }
    return { token: parsed.token, model: parsed.model };
  } catch {
    return null;
  }
}
function persistCookieFromAuthStore(maxAgeSeconds: number) {
  try {
    // Persist to cookie so services/pocketbase.ts can load immediately on app start
    const cookie = pb.authStore.exportToCookie({
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
      path: '/',
      maxAge: maxAgeSeconds,
    });
    document.cookie = cookie;
  } catch {}
}
function clearAuthCookie() {
  try {
    const cookie = pb.authStore.exportToCookie({ path: '/', maxAge: -1 });
    document.cookie = cookie;
  } catch {}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Initialize auth state from PocketBase + localStorage (7 days)
  useEffect(() => {
    // Try hydrate from PocketBase first
    let currentUser = getCurrentUser();
    let currentToken = pb.authStore.token;

    // If not valid, try localStorage 7-day token
    if (!currentUser || !currentToken) {
      const restored = loadTokenFromStorage();
      if (restored) {
        try {
          // Set PocketBase auth store from persisted token
          // @ts-ignore save method is available on AuthStore implementations
          pb.authStore.save(restored.token, restored.model);
          currentUser = restored.model;
          currentToken = restored.token;
          persistCookieFromAuthStore(SEVEN_DAYS_MS / 1000);
        } catch (e) {
          console.warn('Restore token from localStorage failed', e);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      }
    }

    setUser(currentUser);
    setToken(currentToken);

    // Listen for auth changes and persist for 7 days
    const unsubscribe = pb.authStore.onChange((changedToken, model) => {
      setUser(model as UserRecord);
      setToken(changedToken);
      if (changedToken && model) {
        saveTokenToStorage(changedToken, model as UserRecord);
        persistCookieFromAuthStore(SEVEN_DAYS_MS / 1000);
      } else {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        clearAuthCookie();
      }
    });

    return unsubscribe;
  }, []);

  // Handle OAuth2 callback
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      
      if (code && state) {
        try {
          const codeVerifier = sessionStorage.getItem('pb_oauth_code_verifier');
          const redirectUrl = sessionStorage.getItem('pb_oauth_redirect') || window.location.origin + window.location.pathname;
          const oauthCollection = sessionStorage.getItem('pb_oauth_collection') || 'users';
          
          if (!codeVerifier) {
            console.error('Missing code verifier in sessionStorage');
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
          }

          if (!oauthCollection) {
            console.error('Missing collection name in sessionStorage');
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
          }

          // Ensure we're using the correct collection
          const collection = pb.collection(oauthCollection);
          
          // Call authWithOAuth2Code with proper parameters
          // Note: redirectUrl should match what was used in the initial auth request
          const authData = await collection.authWithOAuth2Code(
            'google', 
            code, 
            codeVerifier, 
            redirectUrl
          );
          
          // Clean up sessionStorage
          sessionStorage.removeItem('pb_oauth_code_verifier');
          sessionStorage.removeItem('pb_oauth_redirect');
          sessionStorage.removeItem('pb_oauth_collection');
          
          // Update state from authData
          const curUser = authData.record as UserRecord;
          const curToken = authData.token;
          setUser(curUser);
          setToken(curToken);
          saveTokenToStorage(curToken, curUser);
          persistCookieFromAuthStore(SEVEN_DAYS_MS / 1000);
          
          // Clean URL
          window.history.replaceState({}, document.title, window.location.pathname);
          
          // Small delay to ensure state is updated
          setTimeout(() => {
            // Redirect based on user role
            const userIsAdmin = isAdmin();
            if (userIsAdmin) {
              window.location.href = '/admin';
            } else {
              window.location.href = '/portal';
            }
          }, 100);
        } catch (error: any) {
          console.error('OAuth callback error:', error);
          // Clean up on error
          sessionStorage.removeItem('pb_oauth_code_verifier');
          sessionStorage.removeItem('pb_oauth_redirect');
          sessionStorage.removeItem('pb_oauth_collection');
          // Clean URL even on error
          window.history.replaceState({}, document.title, window.location.pathname);
          // Show error to user if we have toast context
          if (error?.message) {
            console.error('OAuth error details:', error.message);
          }
        }
      }
    };

    handleOAuthCallback();
  }, []);

  const isLoggedIn = useMemo(() => !!user && !!token, [user, token]);
  const isAdminUser = useMemo(() => isAdmin(), [user]);

  const login = async (email: string, password: string) => {
    const emailNormalized = email.trim().toLowerCase();
    
    // Try both collections in parallel for faster response
    // Wrap in catch to handle 404 (collection doesn't exist) gracefully
    const usersPromise = pb.collection('users').authWithPassword(emailNormalized, password).catch((e) => {
      // Don't log 404 errors as they're expected if collection doesn't exist
      if (e?.status !== 404 && e?.code !== 404) {
        console.debug('[Auth] users collection auth failed:', e?.status || e?.code, e?.message);
      }
      return { error: e };
    });
    const thanhVienPromise = pb.collection('thanh_vien').authWithPassword(emailNormalized, password).catch((e) => {
      // Don't log 404 errors as they're expected if collection doesn't exist
      if (e?.status !== 404 && e?.code !== 404) {
        console.debug('[Auth] thanh_vien collection auth failed:', e?.status || e?.code, e?.message);
      }
      return { error: e };
    });
    
    try {
      // Wait for both, but use the first successful one
      const [usersResult, thanhVienResult] = await Promise.all([usersPromise, thanhVienPromise]);
      
      // Try 'users' first
      if (!('error' in usersResult)) {
        const userRecord = usersResult.record as UserRecord;
        setUser(userRecord);
        setToken(usersResult.token);
        saveTokenToStorage(usersResult.token, userRecord);
        persistCookieFromAuthStore(SEVEN_DAYS_MS / 1000);
        return userRecord;
      }
      
      // Fallback to 'thanh_vien'
      if (!('error' in thanhVienResult)) {
        const userRecord2 = thanhVienResult.record as UserRecord;
        setUser(userRecord2);
        setToken(thanhVienResult.token);
        saveTokenToStorage(thanhVienResult.token, userRecord2);
        persistCookieFromAuthStore(SEVEN_DAYS_MS / 1000);
        return userRecord2;
      }
      
      // Both failed, throw the more descriptive error
      const e1 = (usersResult as any).error;
      const e2 = (thanhVienResult as any).error;
      const data = e1?.data?.data || e2?.data?.data || e2?.data || e1?.data;
      if (data && typeof data === 'object') {
        const messages: string[] = [];
        for (const key of Object.keys(data)) {
          const field = (data as any)[key];
          const msg = field?.message || field;
          if (msg) messages.push(`${key}: ${msg}`);
        }
        throw new Error(messages.join(', '));
      }
      throw new Error(e2?.message || e1?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } catch (error: any) {
      // Re-throw if it's already an Error, otherwise wrap it
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    clearAuthCookie();
  };

  const register = async (input: RegisterInput) => {
    const data = {
      email: input.email.trim().toLowerCase(),
      emailVisibility: true,
      password: input.password,
      passwordConfirm: input.passwordConfirm,
      name: input.name || '', // per users collection API
      vai_tro: 'customer',
      trang_thai: 'active'
    };
    const record = await pb.collection('users').create(data);
    // (optional) send email verification request
    try { await pb.collection('users').requestVerification(data.email); } catch {}
    return record as UserRecord;
  };

  const forgotPassword = async (email: string) => {
    const emailNormalized = email.trim().toLowerCase();
    // Try reset for 'users', then fall back to 'thanh_vien'
    try {
      await pb.collection('users').requestPasswordReset(emailNormalized);
    } catch (e1) {
      try {
        await pb.collection('thanh_vien').requestPasswordReset(emailNormalized);
      } catch (e2) {
        throw e2;
      }
    }
  };

  const updateProfile = async (input: UpdateProfileInput) => {
    if (!user) throw new Error('Not authenticated');
    const collectionName = (user as any)?.collectionName || 'users';
    const updateData: any = {};
    // Map fields to PocketBase schema based on collection
    const normalizedEmail = input.email ? input.email.trim().toLowerCase() : undefined;
    if (collectionName === 'users') {
      if (normalizedEmail) updateData.email = normalizedEmail;
      if (input.name) updateData.name = input.name;
      if (input.bio) updateData.bio = input.bio;
      // Avoid sending fields that may not exist in 'users' to prevent validation errors
    } else {
      if (normalizedEmail) updateData.email = normalizedEmail;
      if (input.name) updateData.ten = input.name;
      if (input.phone) updateData.so_dien_thoai = input.phone;
      if (input.address) updateData.dia_chi = input.address;
      if (input.bio) updateData.ghi_chu = input.bio;
    }

    const record = await pb.collection(collectionName).update(user.id, updateData);
    setUser(record as UserRecord);
    // If email changed, re-request verification
    if (normalizedEmail && normalizedEmail !== user.email) {
      try { await pb.collection(collectionName).requestVerification(normalizedEmail); } catch {}
    }
    return record as UserRecord;
  };

  const changePassword = async (newPassword: string, confirmPassword: string) => {
    if (!user) throw new Error('Not authenticated');
    const collectionName = (user as any)?.collectionName || 'users';
    const record = await pb.collection(collectionName).update(user.id, {
      password: newPassword,
      passwordConfirm: confirmPassword,
    });
    setUser(record as UserRecord);
    return record as UserRecord;
  };

  const loginWithGoogle = async () => {
    // Use 'users' collection (as shown in the PocketBase config)
    let methods: any;
    let collection = 'users';
    
    try {
      methods = await pb.collection('users').listAuthMethods();
      const googleProvider = methods?.authProviders?.find((p: any) => p.name === 'google');
      
      if (!googleProvider) {
        throw new Error('Google OAuth2 provider not found in users collection');
      }

      if (!googleProvider.codeVerifier) {
        throw new Error('Google OAuth2 codeVerifier is missing');
      }

      // Use the redirect URL from the provider or construct it
      // PocketBase usually expects the redirect URL to match what's configured in the provider
      const redirectUrl = googleProvider.redirectUrl || `${window.location.origin}/login`;
      
      // Store OAuth data in sessionStorage
      sessionStorage.setItem('pb_oauth_code_verifier', googleProvider.codeVerifier);
      sessionStorage.setItem('pb_oauth_redirect', redirectUrl);
      sessionStorage.setItem('pb_oauth_collection', collection);
      
      // Redirect to Google OAuth
      window.location.href = googleProvider.authUrl;
    } catch (e: any) {
      console.error('Google OAuth setup error:', e);
      throw new Error(e?.message || 'Google OAuth2 chưa được cấu hình đúng trong PocketBase. Vui lòng kiểm tra lại cấu hình OAuth2 trong admin panel.');
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoggedIn,
    isAdmin: isAdminUser,
    login,
    logout,
    register,
    forgotPassword,
    updateProfile,
    changePassword,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}