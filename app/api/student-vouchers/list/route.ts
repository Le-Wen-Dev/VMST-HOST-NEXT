import { NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

export async function GET() {
  try {
    const pb = await getAdminPb();

    let students: any[] = [];
    try {
      const res = await pb.collection('student_vouchers').getFullList({ sort: 'email' });
      students = res;
    } catch {
      // collection may not exist yet
    }

    return NextResponse.json({
      voucher_code: 'VOVANMY2026',
      product_id: '',
      students: students.map(s => ({
        id: s.id,
        email: s.email,
        used: s.used || false,
        usedAt: s.usedAt || null,
        orderId: s.orderId || null
      }))
    });
  } catch (error) {
    console.error('Error reading student list:', error);
    return NextResponse.json({ error: 'Không thể đọc danh sách sinh viên' }, { status: 500 });
  }
}
