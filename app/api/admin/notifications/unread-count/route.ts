import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const COLLECTION = 'notifications';

export async function GET(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter') || 'trang_thai = "chua_doc"';
    const count = await pb.collection(COLLECTION).getList(1, 1, { filter });
    return NextResponse.json({ count: count.totalItems });
  } catch (err: any) {
    console.error('[admin/notifications/unread-count GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể lấy số thông báo chưa đọc' }, { status: 500 });
  }
}
