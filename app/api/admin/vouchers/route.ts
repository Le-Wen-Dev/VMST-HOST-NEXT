import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const VOUCHERS_COLLECTION = 'vochers'; // typo baked into schema

export async function GET(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 50);
    const sort = searchParams.get('sort') || '-created';
    const filter = searchParams.get('filter') || '';

    const res = await pb.collection(VOUCHERS_COLLECTION).getList(page, perPage, { sort, filter });
    return NextResponse.json({
      items: res.items,
      page: res.page,
      perPage: res.perPage,
      totalPages: res.totalPages,
      totalItems: res.totalItems,
    });
  } catch (err: any) {
    console.error('[admin/vouchers GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tải danh sách voucher' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const input = await req.json();
    const data = {
      code_giam_gia: String(input.code_giam_gia || '').toUpperCase(),
      dieu_kien: input.dieu_kien || '',
      ten_chien_dich: input.ten_chien_dich || '',
      gia_tri: input.gia_tri,
      don_toi_thieu: input.don_toi_thieu || '0',
      so_luong: input.so_luong || '0',
      da_dung: input.da_dung || '0',
    };
    const record = await pb.collection(VOUCHERS_COLLECTION).create(data);
    return NextResponse.json(record, { status: 201 });
  } catch (err: any) {
    console.error('[admin/vouchers POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tạo voucher' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { id, ...input } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const updateData: any = {};
    if (input.code_giam_gia !== undefined) updateData.code_giam_gia = String(input.code_giam_gia).toUpperCase();
    if (input.dieu_kien !== undefined) updateData.dieu_kien = input.dieu_kien;
    if (input.ten_chien_dich !== undefined) updateData.ten_chien_dich = input.ten_chien_dich;
    if (input.gia_tri !== undefined) updateData.gia_tri = input.gia_tri;
    if (input.don_toi_thieu !== undefined) updateData.don_toi_thieu = input.don_toi_thieu;
    if (input.so_luong !== undefined) updateData.so_luong = input.so_luong;
    if (input.da_dung !== undefined) updateData.da_dung = input.da_dung;
    const record = await pb.collection(VOUCHERS_COLLECTION).update(id, updateData);
    return NextResponse.json(record);
  } catch (err: any) {
    console.error('[admin/vouchers PATCH]', err);
    return NextResponse.json({ error: err?.message || 'Không thể cập nhật voucher' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await pb.collection(VOUCHERS_COLLECTION).delete(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[admin/vouchers DELETE]', err);
    return NextResponse.json({ error: err?.message || 'Không thể xóa voucher' }, { status: 500 });
  }
}
