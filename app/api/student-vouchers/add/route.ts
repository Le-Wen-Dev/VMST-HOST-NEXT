import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

export async function POST(req: NextRequest) {
  try {
    const { emails } = await req.json();

    if (!Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: 'Danh sách email không hợp lệ' }, { status: 400 });
    }

    const pb = await getAdminPb();

    // Normalize and filter valid emails
    const newEmails = emails
      .map((e: string) => e.toLowerCase().trim())
      .filter(e => e && e.includes('@'));

    // Fetch existing emails to avoid duplicates
    let existingEmails: Set<string> = new Set();
    try {
      const existing = await pb.collection('student_vouchers').getFullList({
        fields: 'email'
      });
      existing.forEach(r => existingEmails.add(r.email.toLowerCase()));
    } catch {
      // collection may not exist yet
    }

    const toAdd = newEmails.filter(e => !existingEmails.has(e));

    for (const email of toAdd) {
      await pb.collection('student_vouchers').create({
        email,
        used: false,
        usedAt: null,
        orderId: null
      });
    }

    return NextResponse.json({
      success: true,
      added: toAdd.length,
      message: `Đã thêm ${toAdd.length} email vào danh sách`
    });
  } catch (error) {
    console.error('Error adding students:', error);
    return NextResponse.json({ error: 'Không thể thêm email vào danh sách' }, { status: 500 });
  }
}
