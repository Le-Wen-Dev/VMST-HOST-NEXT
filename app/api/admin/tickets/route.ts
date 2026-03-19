import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const TICKETS_COLLECTION = 'tickets';

export async function GET(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 20);
    const status = searchParams.get('status') || '';
    const department = searchParams.get('department') || '';
    const priority = searchParams.get('priority') || '';
    const userId = searchParams.get('userId') || '';
    const search = searchParams.get('search') || '';

    const filters: string[] = [];
    if (status && status !== 'all') filters.push(`trang_thai = "${status}"`);
    if (department && department !== 'all') filters.push(`bo_phan = "${department}"`);
    if (priority && priority !== 'all') filters.push(`do_uu_tien = "${priority}"`);
    if (userId) filters.push(`khach_hang = "${userId}"`);
    if (search) {
      const s = search.replace(/"/g, '\\"');
      filters.push(`(tieu_de ~ "${s}" || tin_nhan ~ "${s}")`);
    }
    const filter = filters.length ? filters.join(' && ') : undefined;

    const res = await pb.collection(TICKETS_COLLECTION).getList(page, perPage, { filter, sort: '-updated' });
    return NextResponse.json({
      items: res.items,
      page: res.page,
      perPage: res.perPage,
      totalPages: res.totalPages,
      totalItems: res.totalItems,
    });
  } catch (err: any) {
    console.error('[admin/tickets GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tải danh sách ticket' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const input = await req.json();
    const record = await pb.collection(TICKETS_COLLECTION).create(input);
    return NextResponse.json(record, { status: 201 });
  } catch (err: any) {
    console.error('[admin/tickets POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tạo ticket' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { id, ...data } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const record = await pb.collection(TICKETS_COLLECTION).update(id, data);
    return NextResponse.json(record);
  } catch (err: any) {
    console.error('[admin/tickets PATCH]', err);
    return NextResponse.json({ error: err?.message || 'Không thể cập nhật ticket' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await pb.collection(TICKETS_COLLECTION).delete(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[admin/tickets DELETE]', err);
    return NextResponse.json({ error: err?.message || 'Không thể xóa ticket' }, { status: 500 });
  }
}
