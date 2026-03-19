import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const ORDERS_COLLECTION = 'orders';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pb = await getAdminPb();
    const data = await req.json();
    const payload: any = { ...data };

    ['server','khach_hang','ngay_het_han','gia_tri','hoa_hong_cho_aff','host_url','host_username','host_password','ghi_chu_noi_bo'].forEach(k => {
      if (payload[k] !== undefined && String(payload[k]).trim() === '') delete payload[k];
    });
    if (payload.san_pham !== undefined) {
      if (Array.isArray(payload.san_pham)) {
        payload.san_pham = payload.san_pham.filter((id: any) => typeof id === 'string' && id.trim() !== '');
        if (payload.san_pham.length === 0) delete payload.san_pham;
      } else if (typeof payload.san_pham === 'string' && payload.san_pham.trim() === '') {
        delete payload.san_pham;
      }
    }

    const record = await pb.collection(ORDERS_COLLECTION).update(id, payload);
    return NextResponse.json(record);
  } catch (err: any) {
    console.error('[admin/orders PATCH]', err);
    return NextResponse.json({ error: err?.message || 'Không thể cập nhật đơn hàng' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pb = await getAdminPb();
    await pb.collection(ORDERS_COLLECTION).delete(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[admin/orders DELETE]', err);
    return NextResponse.json({ error: err?.message || 'Không thể xóa đơn hàng' }, { status: 500 });
  }
}
