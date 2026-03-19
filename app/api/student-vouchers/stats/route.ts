import { NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

export async function GET() {
  try {
    const pb = await getAdminPb();

    let students: any[] = [];
    try {
      students = await pb.collection('student_vouchers').getFullList();
    } catch {
      // collection may not exist yet
    }

    const total = students.length;
    const used = students.filter(s => s.used).length;
    const available = total - used;

    return NextResponse.json({
      total,
      used,
      available,
      voucher_code: 'VOVANMY2026',
      product_id: ''
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    return NextResponse.json({ error: 'Không thể lấy thống kê' }, { status: 500 });
  }
}
