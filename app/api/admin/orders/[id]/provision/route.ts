import { NextRequest, NextResponse } from 'next/server';

const SIDECAR_URL = process.env.SIDECAR_URL || 'http://localhost:4000';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const res = await fetch(`${SIDECAR_URL}/webhook/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: id }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || 'DA provisioning failed', status: res.status },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, ...data });
  } catch (err: any) {
    console.error('[provision]', err);
    return NextResponse.json(
      { error: err?.message || 'Không thể kết nối sidecar server' },
      { status: 502 }
    );
  }
}
