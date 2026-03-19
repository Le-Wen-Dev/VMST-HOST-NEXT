// API routes are relative in Next.js — no base URL needed
const API_BASE = '';

export interface StudentVoucherData {
  voucher_code: string;
  product_id: string;
  students: StudentEmail[];
}

export interface StudentEmail {
  email: string;
  used: boolean;
  usedAt: string | null;
  orderId: string | null;
}

export interface CheckResult {
  allowed: boolean;
  used: boolean;
  usedAt: string | null;
  orderId: string | null;
  message: string;
}

export interface Stats {
  total: number;
  used: number;
  available: number;
  voucher_code: string;
  product_id: string;
}

// Kiểm tra email có trong danh sách và đã sử dụng chưa
export async function checkStudentEmail(email: string): Promise<CheckResult> {
  try {
    const response = await fetch(`${API_BASE}/api/student-vouchers/check/${encodeURIComponent(email)}`);
    if (!response.ok) {
      throw new Error('Không thể kiểm tra email');
    }
    return await response.json();
  } catch (error: any) {
    console.error('Error checking student email:', error);
    throw new Error(error?.message || 'Không thể kiểm tra email');
  }
}

// Đánh dấu email đã sử dụng voucher
export async function markStudentEmailUsed(email: string, orderId?: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/api/student-vouchers/mark-used`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, orderId }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error || 'Không thể đánh dấu email đã sử dụng');
    }
  } catch (error: any) {
    console.error('Error marking student email as used:', error);
    throw new Error(error?.message || 'Không thể đánh dấu email đã sử dụng');
  }
}

// Lấy danh sách đầy đủ (admin only)
export async function getStudentList(): Promise<StudentVoucherData> {
  try {
    const response = await fetch(`${API_BASE}/api/student-vouchers/list`);
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách sinh viên');
    }
    return await response.json();
  } catch (error: any) {
    console.error('Error getting student list:', error);
    throw new Error(error?.message || 'Không thể lấy danh sách sinh viên');
  }
}

// Thêm email vào danh sách (admin only)
export async function addStudentEmails(emails: string[]): Promise<{ success: boolean; added: number; message: string }> {
  try {
    const response = await fetch(`${API_BASE}/api/student-vouchers/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error || 'Không thể thêm email vào danh sách');
    }
    return await response.json();
  } catch (error: any) {
    console.error('Error adding student emails:', error);
    throw new Error(error?.message || 'Không thể thêm email vào danh sách');
  }
}

// Lấy thống kê
export async function getStudentVoucherStats(): Promise<Stats> {
  try {
    const response = await fetch(`${API_BASE}/api/student-vouchers/stats`);
    if (!response.ok) {
      throw new Error('Không thể lấy thống kê');
    }
    return await response.json();
  } catch (error: any) {
    console.error('Error getting stats:', error);
    throw new Error(error?.message || 'Không thể lấy thống kê');
  }
}
