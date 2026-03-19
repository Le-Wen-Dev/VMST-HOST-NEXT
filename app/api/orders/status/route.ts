import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

const PB_URL = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL || 'https://api.vmst.host';

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('orderId');
  if (!orderId) {
    return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
  }

  try {
    const pb = new PocketBase(PB_URL);
    pb.autoCancellation(false);

    // Forward user auth token if present
    const authHeader = req.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      pb.authStore.save(authHeader.slice(7), null);
    }

    const escaped = orderId.replace(/"/g, '\\"');

    let order: any = null;

    // Tìm theo ma_don_hang
    try {
      order = await pb.collection('orders').getFirstListItem(
        `ma_don_hang = "${escaped}"`
      );
    } catch (e: any) {
      console.log(`[orders/status] getFirstListItem failed for "${orderId}":`, e?.status, e?.message);
    }

    // Fallback: tìm theo record ID
    if (!order) {
      try {
        order = await pb.collection('orders').getOne(orderId);
      } catch (e: any) {
        console.log(`[orders/status] getOne failed for "${orderId}":`, e?.status, e?.message);
      }
    }

    if (!order) {
      return NextResponse.json({ error: 'order_not_found' }, { status: 404 });
    }

    return NextResponse.json({
      ma_don_hang: order.ma_don_hang,
      thanh_toan: order.thanh_toan,
      trang_thai_su_dung: order.trang_thai_su_dung,
    });
  } catch (err: any) {
    console.error('[orders/status] Unexpected error:', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
