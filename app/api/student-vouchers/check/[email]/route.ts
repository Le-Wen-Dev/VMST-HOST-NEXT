import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email: rawEmail } = await params;
    const email = decodeURIComponent(rawEmail).toLowerCase().trim();
    const pb = await getAdminPb();

    let items: any[] = [];
    try {
      const res = await pb.collection('student_vouchers').getList(1, 1, {
        filter: `email = "${email}"`
      });
      items = res.items;
    } catch {
      // collection may not exist yet
    }

    if (items.length === 0) {
      return NextResponse.json({
        allowed: false,
        used: false,
        message: 'Email không nằm trong danh sách sinh viên được phép'
      });
    }

    const student = items[0];
    return NextResponse.json({
      allowed: true,
      used: student.used || false,
      usedAt: student.usedAt || null,
      orderId: student.orderId || null,
      message: student.used ? 'Email này đã sử dụng voucher' : 'Email hợp lệ và chưa sử dụng'
    });
  } catch (error) {
    console.error('Error checking student email:', error);
    return NextResponse.json({ error: 'Không thể kiểm tra email' }, { status: 500 });
  }
}
