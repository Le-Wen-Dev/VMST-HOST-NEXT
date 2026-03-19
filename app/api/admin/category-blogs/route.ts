import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const COLLECTION = 'category_blogs';

export async function GET(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const url = req.nextUrl.searchParams;
    const id = url.get('id');

    if (id) {
      const record = await pb.collection(COLLECTION).getOne(id);
      return NextResponse.json(record);
    }

    const page = parseInt(url.get('page') || '1');
    const perPage = parseInt(url.get('perPage') || '50');
    const search = url.get('search') || '';
    const parentId = url.get('parentId') || '';
    const expand = url.get('expand') || 'danh_muc_cha';

    const filters: string[] = [];
    if (search) {
      const s = search.replace(/'/g, "\\'");
      filters.push(`(name~"${s}" || slug~"${s}" || description~"${s}")`);
    }
    if (parentId) filters.push(`danh_muc_cha='${parentId}'`);

    const filter = filters.length ? filters.join(' && ') : '';
    const res = await pb.collection(COLLECTION).getList(page, perPage, { filter, sort: 'name', expand });
    return NextResponse.json(res);
  } catch (err: any) {
    console.error('[admin/category-blogs GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tải danh mục' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const contentType = req.headers.get('content-type') || '';
    let data: any;
    if (contentType.includes('multipart/form-data')) {
      data = await req.formData();
    } else {
      data = await req.json();
    }
    const record = await pb.collection(COLLECTION).create(data);
    return NextResponse.json(record, { status: 201 });
  } catch (err: any) {
    console.error('[admin/category-blogs POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tạo danh mục' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const contentType = req.headers.get('content-type') || '';
    let body: any;
    let id: string;
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      id = formData.get('id') as string;
      formData.delete('id');
      body = formData;
    } else {
      const json = await req.json();
      id = json.id;
      delete json.id;
      body = json;
    }
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const record = await pb.collection(COLLECTION).update(id, body);
    return NextResponse.json(record);
  } catch (err: any) {
    console.error('[admin/category-blogs PATCH]', err);
    return NextResponse.json({ error: err?.message || 'Không thể cập nhật danh mục' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await pb.collection(COLLECTION).delete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[admin/category-blogs DELETE]', err);
    return NextResponse.json({ error: err?.message || 'Không thể xóa danh mục' }, { status: 500 });
  }
}
