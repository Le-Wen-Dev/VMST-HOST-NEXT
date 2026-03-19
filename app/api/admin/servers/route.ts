import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const SERVERS_COLLECTION = 'servers';

export async function GET(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 20);
    const status = searchParams.get('status') || '';
    const search = searchParams.get('search') || '';

    const filters: string[] = [];
    if (status && status !== 'all') filters.push(`status = "${status}"`);
    if (search) {
      const s = search.replace(/"/g, '\\"');
      filters.push(`(nha_cung_cap ~ "${s}" || ip ~ "${s}")`);
    }
    const filter = filters.length ? filters.join(' && ') : undefined;

    const res = await pb.collection(SERVERS_COLLECTION).getList(page, perPage, { filter, sort: '-created' });
    return NextResponse.json({
      items: res.items,
      page: res.page,
      perPage: res.perPage,
      totalPages: res.totalPages,
      totalItems: res.totalItems,
    });
  } catch (err: any) {
    console.error('[admin/servers GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tải danh sách server' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const input = await req.json();
    const record = await pb.collection(SERVERS_COLLECTION).create(input);
    return NextResponse.json(record, { status: 201 });
  } catch (err: any) {
    console.error('[admin/servers POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tạo server' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { id, ...data } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const record = await pb.collection(SERVERS_COLLECTION).update(id, data);
    return NextResponse.json(record);
  } catch (err: any) {
    console.error('[admin/servers PATCH]', err);
    return NextResponse.json({ error: err?.message || 'Không thể cập nhật server' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await pb.collection(SERVERS_COLLECTION).delete(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[admin/servers DELETE]', err);
    return NextResponse.json({ error: err?.message || 'Không thể xóa server' }, { status: 500 });
  }
}
