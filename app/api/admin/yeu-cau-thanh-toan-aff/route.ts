import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const COLLECTION = 'yeu_cau_thanh_toan_aff';

export async function GET(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 20);
    const sort = searchParams.get('sort') || '-ngay_yeu_cau';
    const filter = searchParams.get('filter') || undefined;

    const res = await pb.collection(COLLECTION).getList(page, perPage, { filter, sort, expand: 'user_yeu_cau' });
    return NextResponse.json({
      items: res.items,
      page: res.page,
      perPage: res.perPage,
      totalPages: res.totalPages,
      totalItems: res.totalItems,
    });
  } catch (err: any) {
    console.error('[admin/yeu-cau-thanh-toan-aff GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tải danh sách yêu cầu thanh toán' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const input = await req.json();
    const record = await pb.collection(COLLECTION).create(input);
    return NextResponse.json(record, { status: 201 });
  } catch (err: any) {
    console.error('[admin/yeu-cau-thanh-toan-aff POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tạo yêu cầu thanh toán' }, { status: 500 });
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
    console.error('[admin/yeu-cau-thanh-toan-aff PATCH]', err);
    return NextResponse.json({ error: err?.message || 'Không thể cập nhật yêu cầu thanh toán' }, { status: 500 });
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
    console.error('[admin/yeu-cau-thanh-toan-aff DELETE]', err);
    return NextResponse.json({ error: err?.message || 'Không thể xóa yêu cầu thanh toán' }, { status: 500 });
  }
}
