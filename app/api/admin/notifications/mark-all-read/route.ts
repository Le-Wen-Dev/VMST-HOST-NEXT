import { NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const COLLECTION = 'notifications';

export async function POST() {
  try {
    const pb = await getAdminPb();
    const unread = await pb.collection(COLLECTION).getFullList({
      filter: 'trang_thai = "chua_doc"',
      fields: 'id',
    });
    await Promise.all(unread.map((r) => pb.collection(COLLECTION).update(r.id, { trang_thai: 'da_doc' })));
    return NextResponse.json({ ok: true, updated: unread.length });
  } catch (err: any) {
    console.error('[admin/notifications/mark-all-read POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể đánh dấu tất cả đã đọc' }, { status: 500 });
  }
}
