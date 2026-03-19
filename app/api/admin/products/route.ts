import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const PRODUCTS_COLLECTION = 'products';

export async function GET(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 20);
    const status = searchParams.get('status') || '';
    const search = searchParams.get('search') || '';

    const filters: string[] = [];
    if (status && status !== 'all') filters.push(`trang_thai = "${status}"`);
    if (search) {
      const s = search.replace(/"/g, '\\"');
      filters.push(`(ten_san_pham ~ "${s}" || danh_muc ~ "${s}")`);
    }
    const filter = filters.length ? filters.join(' && ') : undefined;

    const res = await pb.collection(PRODUCTS_COLLECTION).getList(page, perPage, { filter, sort: '-created' });
    return NextResponse.json({
      items: res.items,
      page: res.page,
      perPage: res.perPage,
      totalPages: res.totalPages,
      totalItems: res.totalItems,
    });
  } catch (err: any) {
    console.error('[admin/products GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tải danh sách sản phẩm' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const input = await req.json();
    const payload: any = { ...input };
    payload.ten_san_pham = String(input.ten_san_pham || '').trim();
    if (input.danh_muc) payload.danh_muc = String(input.danh_muc).trim();
    payload.trang_thai = input.trang_thai || 'active';
    const record = await pb.collection(PRODUCTS_COLLECTION).create(payload);
    return NextResponse.json(record, { status: 201 });
  } catch (err: any) {
    console.error('[admin/products POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tạo sản phẩm' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { id, ...data } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const payload: any = { ...data };
    if (payload.ten_san_pham) payload.ten_san_pham = String(payload.ten_san_pham).trim();
    if (payload.danh_muc) payload.danh_muc = String(payload.danh_muc).trim();
    const record = await pb.collection(PRODUCTS_COLLECTION).update(id, payload);
    return NextResponse.json(record);
  } catch (err: any) {
    console.error('[admin/products PATCH]', err);
    return NextResponse.json({ error: err?.message || 'Không thể cập nhật sản phẩm' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await pb.collection(PRODUCTS_COLLECTION).delete(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[admin/products DELETE]', err);
    return NextResponse.json({ error: err?.message || 'Không thể xóa sản phẩm' }, { status: 500 });
  }
}
