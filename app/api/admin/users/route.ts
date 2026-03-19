import { NextRequest, NextResponse } from 'next/server';
import { getAdminPb } from '@/lib/pb-admin';

const USERS_COLLECTION = 'users';

export async function GET(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 50);
    const search = searchParams.get('search') || '';
    const vai_tro = searchParams.get('vai_tro') || '';
    const trang_thai = searchParams.get('trang_thai') || '';
    const id = searchParams.get('id') || '';

    // Single record lookup
    if (id) {
      const record = await pb.collection(USERS_COLLECTION).getOne(id);
      const pbUrl = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL || 'https://api.vmst.host';
      return NextResponse.json(mapUser(record, pb, pbUrl));
    }

    const filters: string[] = [];
    if (search.trim()) {
      const s = search.trim().replace(/"/g, '\\"');
      filters.push(`(email ~ "${s}" || name ~ "${s}")`);
    }
    if (vai_tro && vai_tro !== 'all') filters.push(`vai_tro = "${vai_tro}"`);
    if (trang_thai && trang_thai !== 'all') filters.push(`trang_thai = "${trang_thai}"`);
    const filter = filters.length ? filters.join(' && ') : undefined;

    const res = await pb.collection(USERS_COLLECTION).getList(page, perPage, { filter, sort: '-created' });
    const pbUrl = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL || 'https://api.vmst.host';
    return NextResponse.json({
      items: res.items.map(r => mapUser(r, pb, pbUrl)),
      page: res.page,
      perPage: res.perPage,
      totalPages: res.totalPages,
      totalItems: res.totalItems,
    });
  } catch (err: any) {
    console.error('[admin/users GET]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tải danh sách người dùng' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const data = await req.json();

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('passwordConfirm', data.passwordConfirm);
    if (data.emailVisibility !== undefined) formData.append('emailVisibility', String(data.emailVisibility));
    if (data.verified !== undefined) formData.append('verified', String(data.verified));
    if (data.name) formData.append('name', data.name);
    if (data.bio) formData.append('bio', data.bio);
    if (data.vai_tro) formData.append('vai_tro', data.vai_tro);
    if (data.trang_thai) formData.append('trang_thai', data.trang_thai);
    if (data.so_luong_don_hang) formData.append('so_luong_don_hang', data.so_luong_don_hang);
    if (data.gia_tri_mua) formData.append('gia_tri_mua', data.gia_tri_mua);
    if (data.dang_nhap_lan_cuoi) formData.append('dang_nhap_lan_cuoi', data.dang_nhap_lan_cuoi);

    const record = await pb.collection(USERS_COLLECTION).create(formData);
    const pbUrl = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL || 'https://api.vmst.host';
    return NextResponse.json(mapUser(record, pb, pbUrl), { status: 201 });
  } catch (err: any) {
    console.error('[admin/users POST]', err);
    return NextResponse.json({ error: err?.message || 'Không thể tạo người dùng' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { id, ...data } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const formData = new FormData();
    if (data.email) formData.append('email', data.email);
    if (data.emailVisibility !== undefined) formData.append('emailVisibility', String(data.emailVisibility));
    if (data.verified !== undefined) formData.append('verified', String(data.verified));
    if (data.name !== undefined) formData.append('name', data.name || '');
    if (data.bio !== undefined) formData.append('bio', data.bio || '');
    if (data.vai_tro !== undefined) formData.append('vai_tro', data.vai_tro || '');
    if (data.trang_thai !== undefined) formData.append('trang_thai', data.trang_thai || '');
    if (data.so_luong_don_hang !== undefined) formData.append('so_luong_don_hang', data.so_luong_don_hang || '0');
    if (data.gia_tri_mua !== undefined) formData.append('gia_tri_mua', data.gia_tri_mua || '0');
    if (data.dang_nhap_lan_cuoi !== undefined) formData.append('dang_nhap_lan_cuoi', data.dang_nhap_lan_cuoi || '');
    if (data.password && data.passwordConfirm) {
      formData.append('password', data.password);
      formData.append('passwordConfirm', data.passwordConfirm);
    }

    const record = await pb.collection(USERS_COLLECTION).update(id, formData);
    const pbUrl = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL || 'https://api.vmst.host';
    return NextResponse.json(mapUser(record, pb, pbUrl));
  } catch (err: any) {
    console.error('[admin/users PATCH]', err);
    return NextResponse.json({ error: err?.message || 'Không thể cập nhật người dùng' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const pb = await getAdminPb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await pb.collection(USERS_COLLECTION).delete(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[admin/users DELETE]', err);
    return NextResponse.json({ error: err?.message || 'Không thể xóa người dùng' }, { status: 500 });
  }
}

function mapUser(r: any, pb: any, pbUrl: string) {
  return {
    id: r.id,
    email: r.email || '',
    emailVisibility: r.emailVisibility,
    verified: r.verified,
    name: r.name || '',
    avatar: r.avatar ? pb.files.getUrl(r, r.avatar) : undefined,
    bio: r.bio || '',
    vai_tro: r.vai_tro || '',
    trang_thai: r.trang_thai || 'active',
    so_luong_don_hang: r.so_luong_don_hang || '0',
    gia_tri_mua: r.gia_tri_mua || '0',
    dang_nhap_lan_cuoi: r.dang_nhap_lan_cuoi || '',
    created: r.created,
    updated: r.updated,
    role: r.vai_tro || '',
    status: r.trang_thai || 'active',
    totalOrders: parseInt(r.so_luong_don_hang || '0'),
    totalSpent: parseFloat(r.gia_tri_mua || '0'),
    lastLogin: r.dang_nhap_lan_cuoi || '',
  };
}
