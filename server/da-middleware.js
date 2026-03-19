// ============================================================
//  VMST Host — DirectAdmin Middleware
//  Tự động tạo hosting user trên DA khi đơn thanh toán thành công
//  Import vào sepay-webhook.js, KHÔNG chạy riêng
// ============================================================

// ── CẤU HÌNH DA ──────────────────────────────────────────────
const DA_URL   = process.env.DA_URL   || 'http://36.50.27.158:2222';
const DA_ADMIN = process.env.DA_ADMIN || 'admin';
const DA_PASS  = process.env.DA_PASS  || '';
const DA_IP    = process.env.DA_IP    || '36.50.27.158';
const DA_WEBHOOK_SECRET = process.env.DA_WEBHOOK_SECRET || '';

function log(tag, msg, data = '') {
  console.log(`[${new Date().toISOString()}] [${tag}] ${msg}`, data);
}

// ── DIRECTADMIN: TẠO USER ────────────────────────────────────

async function createDAUser({ username, password, email, domain, packageName }) {
  const body = new URLSearchParams({
    action:   'create',
    add:      'Submit',
    username,
    passwd:   password,
    passwd2:  password,
    domain,
    email,
    package:  packageName,
    ip:       DA_IP,
    notify:   'no',
  });

  log('DA', `Gọi API: username=${username} domain=${domain} package=${packageName}`);

  const res = await fetch(`${DA_URL}/CMD_API_ACCOUNT_USER`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${DA_ADMIN}:${DA_PASS}`).toString('base64'),
      'Content-Type':  'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const text = await res.text();
  const result = new URLSearchParams(text);
  log('DA', `Response: ${text}`);

  if (result.get('error') !== '0') {
    throw new Error(`DA Error: ${result.get('text')} — ${result.get('details') || ''}`);
  }
  return true;
}

// ── XỬ LÝ ĐƠN HÀNG: LẤY INFO → TẠO DA USER → CẬP NHẬT PB ──

async function processOrder(orderId, pb) {
  log('ORDER', `Bắt đầu xử lý đơn: ${orderId}`);

  // 1. Lấy đơn hàng từ PocketBase (expand san_pham + khach_hang)
  let order;
  try {
    order = await pb.collection('orders').getOne(orderId, { expand: 'san_pham,khach_hang' });
  } catch (err) {
    throw new Error(`PB: Không tìm thấy đơn hàng ${orderId} — ${err.message}`);
  }

  log('ORDER', `Mã đơn: ${order.ma_don_hang} | Thanh toán: ${order.thanh_toan} | Trạng thái: ${order.trang_thai_su_dung}`);

  // 2. Kiểm tra điều kiện — chỉ xử lý đơn đã thanh toán + chưa kích hoạt
  if (order.thanh_toan !== 'da_thanh_toan') {
    log('ORDER', 'Bỏ qua — chưa thanh toán');
    return { skipped: true, reason: 'chua_thanh_toan' };
  }
  if (order.trang_thai_su_dung === 'dang_su_dung') {
    log('ORDER', 'Bỏ qua — đã tạo host rồi');
    return { skipped: true, reason: 'da_tao_host' };
  }

  // 3. Lấy thông tin host TRỰC TIẾP từ đơn hàng
  const { host_url, host_username, host_password } = order;
  if (!host_url)      throw new Error(`Đơn ${order.ma_don_hang} thiếu host_url (tên miền)`);
  if (!host_username) throw new Error(`Đơn ${order.ma_don_hang} thiếu host_username`);
  if (!host_password) throw new Error(`Đơn ${order.ma_don_hang} thiếu host_password`);

  log('ORDER', `Domain: ${host_url} | Username: ${host_username}`);

  // 4. Lấy package_da từ sản phẩm
  const sanPhamArr = order.expand?.san_pham;
  const sanPham = Array.isArray(sanPhamArr) ? sanPhamArr[0] : sanPhamArr;
  if (!sanPham) throw new Error('Đơn không có sản phẩm');

  let thongSo = sanPham.thong_so;
  if (typeof thongSo === 'string') {
    try { thongSo = JSON.parse(thongSo); } catch { thongSo = {}; }
  }
  const packageName = thongSo?.package_da;
  if (!packageName) {
    log('ORDER', `Sản phẩm "${sanPham.ten_san_pham}" không có package_da — bỏ qua DA`);
    return { skipped: true, reason: 'no_package_da' };
  }

  log('ORDER', `Package DA: ${packageName}`);

  // 5. Lấy email khách hàng
  const email = order.expand?.khach_hang?.email || `${host_username}@vmst.host`;
  log('ORDER', `Email: ${email}`);

  // 6. Gọi DA API tạo user
  await createDAUser({
    username:    host_username,
    password:    host_password,
    email,
    domain:      host_url,
    packageName,
  });
  log('DA', `Tạo user thành công: ${host_username}`);

  // 7. Cập nhật trạng thái đơn hàng → dang_su_dung
  await pb.collection('orders').update(order.id, {
    trang_thai_su_dung: 'dang_su_dung',
  });
  log('PB', `Đơn ${order.ma_don_hang} → dang_su_dung`);
  log('ORDER', `Hoàn thành: ${order.ma_don_hang}`);

  return { ok: true, username: host_username, domain: host_url, package: packageName };
}

// ── ĐĂNG KÝ ROUTES VÀO EXPRESS APP ──────────────────────────

function registerDARoutes(app, getAdminPbFn) {

  // Auth middleware cho DA endpoints
  function daAuth(req, res, next) {
    if (!DA_WEBHOOK_SECRET) return next(); // dev mode — skip
    const secret = req.headers['x-secret'];
    if (secret !== DA_WEBHOOK_SECRET) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }
    next();
  }

  // POST /webhook/order — trigger thủ công theo order_id hoặc ma_don_hang
  app.post('/webhook/order', daAuth, async (req, res) => {
    const { order_id, ma_don_hang } = req.body;
    if (!order_id && !ma_don_hang) {
      return res.status(400).json({ ok: false, error: 'Cần order_id hoặc ma_don_hang' });
    }

    res.json({ ok: true, message: 'Đang xử lý...' });

    try {
      const pb = await getAdminPbFn();
      if (order_id) {
        await processOrder(order_id, pb);
      } else {
        const order = await pb.collection('orders').getFirstListItem(`ma_don_hang = "${ma_don_hang}"`, { expand: 'san_pham,khach_hang' });
        await processOrder(order.id, pb);
      }
    } catch (err) {
      log('ERROR', 'Webhook order thất bại:', err.message);
    }
  });

  // POST /retry/:orderId — retry thủ công, reset trạng thái trước
  app.post('/retry/:orderId', daAuth, async (req, res) => {
    const { orderId } = req.params;
    try {
      const pb = await getAdminPbFn();
      await pb.collection('orders').update(orderId, { trang_thai_su_dung: 'chua_su_dung' });
      log('RETRY', `Reset đơn ${orderId} → chua_su_dung`);

      res.json({ ok: true, message: 'Đang retry...' });
      await processOrder(orderId, pb);
    } catch (err) {
      log('ERROR', 'Retry thất bại:', err.message);
      if (!res.headersSent) {
        res.status(500).json({ ok: false, error: err.message });
      }
    }
  });

  log('DA-MW', `Routes registered: POST /webhook/order, POST /retry/:orderId`);
  log('DA-MW', `DA: ${DA_URL} | IP: ${DA_IP}`);
}

export { processOrder, registerDARoutes };
