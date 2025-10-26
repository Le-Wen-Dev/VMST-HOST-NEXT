import PocketBase from 'pocketbase';

const baseUrl = process.env.VITE_PB_URL || 'https://api.vmst.host';
const email = process.env.VITE_CONTACT_ADMIN_EMAIL || 'admin@vmst.host';
const password = process.env.VITE_CONTACT_ADMIN_PASSWORD || 'admin@!@#';

async function main() {
  const pb = new PocketBase(baseUrl);
  pb.autoCancellation(false);
  try {
    await pb.admins.authWithPassword(email, password);
    console.log('Admin auth OK');
  } catch (e) {
    console.error('Admin auth failed:', e?.message || e);
  }
  try {
    const res = await pb.collection('products').getList(1, 50, { filter: 'trang_thai = "active"', sort: '-created' });
    console.log('Products count:', res.items?.length);
    console.log(res.items?.map(r => ({ id: r.id, ten_san_pham: r.ten_san_pham, danh_muc: r.danh_muc, trang_thai: r.trang_thai })));
  } catch (e) {
    console.error('List products failed:', e?.message || e);
  }
}

main();