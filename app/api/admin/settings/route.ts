import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const COLLECTION = 'setting_system';

export async function GET() {
  try {
    const pb = await getAdminPb();
    const res = await pb.collection(COLLECTION).getList(1, 1);
    if (res.items.length === 0) {
      return NextResponse.json(null);
    }
    return NextResponse.json(res.items[0]);
  } catch (err: any) {
    console.error('[admin/settings GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tải cài đặt' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const input = await req.json();
    const record = await pb.collection(COLLECTION).create(input);
    return NextResponse.json(record, { status: 201 });
  } catch (err: any) {
    console.error('[admin/settings POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tạo cài đặt' }, { status: 500 });
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
    console.error('[admin/settings PATCH]', err);
    return NextResponse.json({ error: err?.message || 'Không thể cập nhật cài đặt' }, { status: 500 });
  }
}
