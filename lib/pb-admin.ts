import 'server-only';
import PocketBase from 'pocketbase';

const PB_URL = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL || 'https://api.vmst.host';
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'admin@vmst.host';
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || 'admin@!@#';

// Singleton — cache admin PB client + token across requests
let cachedPb: PocketBase | null = null;
let authPromise: Promise<PocketBase> | null = null;

async function authenticatePb(): Promise<PocketBase> {
  const pb = new PocketBase(PB_URL);
  pb.autoCancellation(false);
  try {
    await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  } catch {
    try {
      await (pb as any).admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    } catch {
      console.error('[pb-admin] All admin auth methods failed');
    }
  }
  return pb;
}

export function createAdminPb() {
  const pb = new PocketBase(PB_URL);
  pb.autoCancellation(false);
  return pb;
}

export async function getAdminPb(): Promise<PocketBase> {
  if (cachedPb && cachedPb.authStore.isValid) {
    return cachedPb;
  }
  // Deduplicate concurrent auth calls
  if (!authPromise) {
    authPromise = authenticatePb().then((pb) => {
      cachedPb = pb;
      authPromise = null;
      return pb;
    }).catch((err) => {
      authPromise = null;
      throw err;
    });
  }
  return authPromise;
}
