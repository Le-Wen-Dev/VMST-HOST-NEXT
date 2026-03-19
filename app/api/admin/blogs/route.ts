import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const COLLECTION = 'blogs';

export async function GET(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const url = req.nextUrl.searchParams;
    const id = url.get('id');

    if (id) {
      const expand = url.get('expand') || 'danh_muc,tac_gia';
      const record = await pb.collection(COLLECTION).getOne(id, { expand });
      return NextResponse.json(record);
    }

    const page = parseInt(url.get('page') || '1');
    const perPage = parseInt(url.get('perPage') || '20');
    const search = url.get('search') || '';
    const status = url.get('status') || '';
    const categoryId = url.get('categoryId') || '';
    const authorId = url.get('authorId') || '';
    const sort = url.get('sort') || '-created';
    const expand = url.get('expand') || 'danh_muc,tac_gia';

    const filters: string[] = [];
    if (search) {
      const s = search.replace(/'/g, "\\'");
      filters.push(`(tieu_de~"${s}" || mo_ta_ngan~"${s}" || slug~"${s}")`);
    }
    if (status) filters.push(`trang_thai='${status}'`);
    if (categoryId) filters.push(`danh_muc='${categoryId}'`);
    if (authorId) filters.push(`tac_gia='${authorId}'`);

    const filter = filters.length ? filters.join(' && ') : '';
    const res = await pb.collection(COLLECTION).getList(page, perPage, { filter, sort, expand });
    return NextResponse.json(res);
  } catch (err: any) {
    console.error('[admin/blogs GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tải blogs' }, { status: 500 });
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
    console.error('[admin/blogs POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tạo blog' }, { status: 500 });
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
    console.error('[admin/blogs PATCH]', err);
    return NextResponse.json({ error: err?.message || 'Không thể cập nhật blog' }, { status: 500 });
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
    console.error('[admin/blogs DELETE]', err);
    return NextResponse.json({ error: err?.message || 'Không thể xóa blog' }, { status: 500 });
  }
}
