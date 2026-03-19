import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const COLLECTION = 'affiliate';

export async function GET(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const record = await pb.collection(COLLECTION).getOne(id, { expand: 'user_aff' });
      return NextResponse.json(record);
    }

    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 20);
    const sort = searchParams.get('sort') || '-created';
    const filter = searchParams.get('filter') || undefined;

    const res = await pb.collection(COLLECTION).getList(page, perPage, { filter, sort, expand: 'user_aff' });
    return NextResponse.json({
      items: res.items,
      page: res.page,
      perPage: res.perPage,
      totalPages: res.totalPages,
      totalItems: res.totalItems,
    });
  } catch (err: any) {
    console.error('[admin/affiliate GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tải danh sách affiliate' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const input = await req.json();
    const record = await pb.collection(COLLECTION).create(input);
    return NextResponse.json(record, { status: 201 });
  } catch (err: any) {
    console.error('[admin/affiliate POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tạo affiliate' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { id, ...data } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const record = await pb.collection(COLLECTION).update(id, data);
    return NextResponse.json(record);
  } catch (err: any) {
    console.error('[admin/affiliate PATCH]', err);
    return NextResponse.json({ error: err?.message || 'Không thể cập nhật affiliate' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await pb.collection(COLLECTION).delete(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[admin/affiliate DELETE]', err);
    return NextResponse.json({ error: err?.message || 'Không thể xóa affiliate' }, { status: 500 });
  }
}
