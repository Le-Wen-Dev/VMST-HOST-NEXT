import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, service: 'vmst-host', time: new Date().toISOString() });
}
