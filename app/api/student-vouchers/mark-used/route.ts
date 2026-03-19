import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

export async function POST(req: NextRequest) {
  try {
    const { email, orderId } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email là bắt buộc' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const pb = await getAdminPb();

    let items: any[] = [];
    try {
      const res = await pb.collection('student_vouchers').getList(1, 1, {
        filter: `email = "${normalizedEmail}"`
      });
      items = res.items;
    } catch {
      // collection may not exist yet
    }

    if (items.length === 0) {
      return NextResponse.json({ error: 'Email không nằm trong danh sách sinh viên' }, { status: 404 });
    }

    const student = items[0];

    if (student.used) {
      return NextResponse.json({ error: 'Email này đã sử dụng voucher rồi' }, { status: 400 });
    }

    const updated = await pb.collection('student_vouchers').update(student.id, {
      used: true,
      usedAt: new Date().toISOString(),
      orderId: orderId || null
    });

    return NextResponse.json({
      success: true,
      message: 'Đã đánh dấu email đã sử dụng voucher',
      student: updated
    });
  } catch (error) {
    console.error('Error marking student as used:', error);
    return NextResponse.json({ error: 'Không thể đánh dấu email đã sử dụng' }, { status: 500 });
  }
}
