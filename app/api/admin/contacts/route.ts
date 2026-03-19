import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const CONTACTS_COLLECTION = 'contacts';

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
      filters.push(`(ho_va_ten ~ "${s}" || email ~ "${s}")`);
    }
    const filter = filters.length ? filters.join(' && ') : undefined;

    const res = await pb.collection(CONTACTS_COLLECTION).getList(page, perPage, { filter, sort: '-created' });
    return NextResponse.json({
      items: res.items,
      page: res.page,
      perPage: res.perPage,
      totalPages: res.totalPages,
      totalItems: res.totalItems,
    });
  } catch (err: any) {
    console.error('[admin/contacts GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tải danh sách liên hệ' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const input = await req.json();
    const payload = {
      ...input,
      email: String(input.email || '').trim().toLowerCase(),
      trang_thai: input.trang_thai || 'newlead',
    };
    const record = await pb.collection(CONTACTS_COLLECTION).create(payload);
    return NextResponse.json(record, { status: 201 });
  } catch (err: any) {
    console.error('[admin/contacts POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tạo liên hệ' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { id, ...data } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const payload: any = { ...data };
    if (payload.email) payload.email = String(payload.email).trim().toLowerCase();
    const record = await pb.collection(CONTACTS_COLLECTION).update(id, payload);
    return NextResponse.json(record);
  } catch (err: any) {
    console.error('[admin/contacts PATCH]', err);
    return NextResponse.json({ error: err?.message || 'Không thể cập nhật liên hệ' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await pb.collection(CONTACTS_COLLECTION).delete(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[admin/contacts DELETE]', err);
    return NextResponse.json({ error: err?.message || 'Không thể xóa liên hệ' }, { status: 500 });
  }
}
