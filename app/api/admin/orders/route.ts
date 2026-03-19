import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const ORDERS_COLLECTION = 'orders';

function generateOrderCode(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function GET(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 20);
    const thanh_toan = searchParams.get('thanh_toan') || '';
    const trang_thai_su_dung = searchParams.get('trang_thai_su_dung') || '';
    const search = searchParams.get('search') || '';
    const expand = searchParams.get('expand') || undefined;

    const filters: string[] = [];
    if (thanh_toan && thanh_toan !== 'all') filters.push(`thanh_toan = "${thanh_toan}"`);
    if (trang_thai_su_dung && trang_thai_su_dung !== 'all') filters.push(`trang_thai_su_dung = "${trang_thai_su_dung}"`);
    if (search) {
      const s = search.replace(/"/g, '\\"');
      // If search looks like a PocketBase record ID (15 chars alphanumeric), filter by khach_hang relation
      if (/^[a-z0-9]{15}$/.test(s)) {
        filters.push(`khach_hang = "${s}"`);
      } else {
        filters.push(`(ma_don_hang ~ "${s}" || gia_tri ~ "${s}" || host_url ~ "${s}" || host_username ~ "${s}")`);
      }
    }
    const filter = filters.length ? filters.join(' && ') : undefined;

    const res = await pb.collection(ORDERS_COLLECTION).getList(page, perPage, {
      filter,
      sort: '-ngay_dat_hang',
      expand,
    });
    return NextResponse.json({
      items: res.items,
      page: res.page,
      perPage: res.perPage,
      totalPages: res.totalPages,
      totalItems: res.totalItems,
    });
  } catch (err: any) {
    console.error('[admin/orders GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tải danh sách đơn hàng' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const input = await req.json();
    const payload: any = { ...input };

    if (!payload.ma_don_hang || !String(payload.ma_don_hang).trim()) {
      payload.ma_don_hang = generateOrderCode();
    }
    if (!payload.trang_thai_su_dung) payload.trang_thai_su_dung = 'tat_tam_thoi';
    if (!payload.thanh_toan) payload.thanh_toan = 'cho_thanh_toan';

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

    const record = await pb.collection(ORDERS_COLLECTION).create(payload);
    return NextResponse.json(record, { status: 201 });
  } catch (err: any) {
    console.error('[admin/orders POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tạo đơn hàng' }, { status: 500 });
  }
}
