Viết một Node.js Express middleware server dùng ké server của sepay nhưng ko làm ảnh hưởng đến tính năng hiện tại của sepay chỉ là đặt code cùng folder để dễ quản lý sau này thôi  để tự động tạo hosting user trên DirectAdmin khi có đơn hàng thanh toán thành công từ PocketBase.
Thông tin hệ thống
PocketBase:

URL: https://api.vmst.host
Collection orders có các field:

ma_don_hang — mã đơn
thanh_toan — trạng thái: "da_thanh_toan" | "cho_thanh_toan"
trang_thai_su_dung — "dang_su_dung" | "chua_su_dung"
san_pham — array relation ID đến collection products
khach_hang — relation ID đến collection users
host_url — tên miền khách hàng (VD: wind.com) — đây là domain truyền vào DA
host_username — tài khoản hosting admin đã điền sẵn (VD: wind76517)
host_password — mật khẩu hosting admin đã điền sẵn (VD: GWAkCtNPjV0ZHr5P)
ngay_het_han — ngày hết hạn dịch vụ
sepay — JSON chứa thông tin thanh toán Sepay


Collection products có field thong_so là JSON:
ví dụ 
json{
  "package_da": "HOST2GB",
  "Dung lượng": "2 GB",
  "Databases": "10"
}

Collection users (khach_hang) có field email, name, phone

DirectAdmin:

URL: http://36.50.27.158:2222
Admin user: admin
Admin pass: KnVyapcSEWgeM#4t
IP shared: 36.50.27.158
2 package đã tạo sẵn: HOST2GB, HOST5GB
API endpoint tạo user: POST /CMD_API_ACCOUNT_USER dùng Basic Auth, body là application/x-www-form-urlencoded
DA trả về dạng error=0&text=Account Created — parse bằng URLSearchParams, error=0 là thành công


Yêu cầu chức năng
1. Hàm processOrder(orderId)

Gọi PocketBase lấy đơn hàng, expand relation san_pham và khach_hang
Kiểm tra: thanh_toan === "da_thanh_toan" VÀ trang_thai_su_dung !== "dang_su_dung" → mới xử lý, tránh tạo trùng
Lấy package_da từ order.expand.san_pham[0].thong_so.package_da
Lấy email từ order.expand.khach_hang.email
Lấy trực tiếp từ đơn hàng — KHÔNG tự sinh:

domain = order.host_url → tên miền truyền vào DA
username = order.host_username → tài khoản truyền vào DA
password = order.host_password → mật khẩu truyền vào DA


Gọi DA API tạo user với đúng 3 giá trị trên + package_da
Nếu DA trả về error=0 → PATCH lại đơn hàng trong PocketBase: trang_thai_su_dung: "dang_su_dung"
Nếu lỗi → log chi tiết, KHÔNG crash server

2. Webhook endpoint POST /webhook/order

Header x-secret: YOUR_SECRET để xác thực
Body: { "order_id": "abc123" } HOẶC { "ma_don_hang": "T0X45C" }
Nếu nhận ma_don_hang → query PocketBase tìm order theo mã → lấy id → gọi processOrder()
Trả về { ok: true } ngay lập tức, xử lý bất đồng bộ ở background

3. Webhook endpoint POST /webhook/sepay

Sepay gửi body có field content chứa mã đơn hàng (VD: "MBVCB...T0X45C...")
Extract mã đơn từ content bằng regex pattern T[A-Z0-9]{5} (mã đơn dạng T0X45C)
Tìm order theo mã đơn trong PocketBase → gọi processOrder()
Trả về { ok: true } ngay

4. Endpoint GET /health

Trả về status server, timestamp

5. Endpoint POST /retry/:orderId

Cho phép retry thủ công 1 đơn hàng cụ thể
Reset trang_thai_su_dung về "chua_su_dung" trước khi retry


Yêu cầu kỹ thuật

Node.js + Express
Dùng built-in fetch của Node 18+, không cần thư viện HTTP thêm
Tất cả config (PB_TOKEN, DA_PASS, SECRET) đọc từ .env file
Có file package.json với script start và dev (nodemon)
Có file .env.example mẫu
Log rõ ràng mỗi bước: nhận đơn → lấy package → lấy thông tin host từ đơn → gọi DA API → cập nhật PB → xong
Xử lý lỗi đầy đủ: DA lỗi, PB lỗi, thiếu field host_username/host_password/host_url, order không tồn tại


Output mong muốn
Trả về 3 file:

index.js — toàn bộ server
package.json
.env.example


Đây là file mẫu có thể tham khảo hoạc điuef chỉnh để hệ thống hoạt đôngj
index.js

// ============================================================
//  VMST Host — Middleware Server
//  Tự động tạo hosting DA khi đơn hàng được thanh toán
// ============================================================

require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

// ── CẤU HÌNH ─────────────────────────────────────────────────
const CONFIG = {
  pb: {
    url:   process.env.PB_URL   || "https://api.vmst.host",
    token: process.env.PB_TOKEN,
  },
  da: {
    url:   process.env.DA_URL   || "http://36.50.27.158:2222",
    admin: process.env.DA_ADMIN || "admin",
    pass:  process.env.DA_PASS,
    ip:    process.env.DA_IP    || "36.50.27.158",
  },
  server: {
    port:   process.env.PORT   || 3000,
    secret: process.env.SECRET,
  },
};

// ── LOG HELPER ────────────────────────────────────────────────
function log(tag, msg, data = "") {
  const time = new Date().toISOString();
  console.log(`[${time}] [${tag}] ${msg}`, data);
}

// ── POCKETBASE HELPERS ────────────────────────────────────────

async function getOrder(orderId) {
  const url = `${CONFIG.pb.url}/api/collections/orders/records/${orderId}?expand=san_pham,khach_hang`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${CONFIG.pb.token}` },
  });
  if (!res.ok) throw new Error(`PB: Không tìm thấy đơn hàng ${orderId}`);
  return res.json();
}

async function findOrderByCode(maDonHang) {
  const url = `${CONFIG.pb.url}/api/collections/orders/records?filter=(ma_don_hang='${maDonHang}')&expand=san_pham,khach_hang`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${CONFIG.pb.token}` },
  });
  if (!res.ok) throw new Error(`PB: Lỗi khi tìm đơn ${maDonHang}`);
  const data = await res.json();
  if (!data.items?.length) throw new Error(`PB: Không tìm thấy đơn ${maDonHang}`);
  return data.items[0];
}

async function updateOrder(orderId, fields) {
  const res = await fetch(
    `${CONFIG.pb.url}/api/collections/orders/records/${orderId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${CONFIG.pb.token}`,
      },
      body: JSON.stringify(fields),
    }
  );
  if (!res.ok) throw new Error(`PB: Cập nhật đơn ${orderId} thất bại`);
  return res.json();
}

// ── DIRECTADMIN HELPER ────────────────────────────────────────

async function createDAUser({ username, password, email, domain, packageName }) {
  const body = new URLSearchParams({
    action:  "create",
    add:     "Submit",
    username: username,
    passwd:   password,
    passwd2:  password,
    domain:   domain,
    email:    email,
    package:  packageName,
    ip:       CONFIG.da.ip,
    notify:   "no",
  });

  const res = await fetch(`${CONFIG.da.url}/CMD_API_ACCOUNT_USER`, {
    method: "POST",
    headers: {
      "Authorization": "Basic " + Buffer.from(`${CONFIG.da.admin}:${CONFIG.da.pass}`).toString("base64"),
      "Content-Type":  "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const text = await res.text();
  const result = new URLSearchParams(text);
  log("DA", `Response: ${text}`);

  if (result.get("error") !== "0") {
    throw new Error(`DA Error: ${result.get("text")} — ${result.get("details") || ""}`);
  }

  return true;
}

// ── XỬ LÝ ĐƠN HÀNG ───────────────────────────────────────────

async function processOrder(orderId) {
  log("ORDER", `Bắt đầu xử lý đơn: ${orderId}`);

  // 1. Lấy đơn hàng từ PocketBase
  const order = await getOrder(orderId);
  log("ORDER", `Mã đơn: ${order.ma_don_hang} | Thanh toán: ${order.thanh_toan} | Trạng thái: ${order.trang_thai_su_dung}`);

  // 2. Kiểm tra điều kiện
  if (order.thanh_toan !== "da_thanh_toan") {
    log("ORDER", `⏳ Bỏ qua — chưa thanh toán`);
    return;
  }
  if (order.trang_thai_su_dung === "dang_su_dung") {
    log("ORDER", `✅ Bỏ qua — đã tạo host rồi`);
    return;
  }

  // 3. Lấy thông tin host TRỰC TIẾP từ đơn hàng
  const { host_url, host_username, host_password } = order;

  if (!host_url)      throw new Error(`Đơn ${order.ma_don_hang} thiếu host_url (tên miền)`);
  if (!host_username) throw new Error(`Đơn ${order.ma_don_hang} thiếu host_username (tài khoản)`);
  if (!host_password) throw new Error(`Đơn ${order.ma_don_hang} thiếu host_password (mật khẩu)`);

  log("ORDER", `🌐 Domain: ${host_url} | 👤 Username: ${host_username}`);

  // 4. Lấy package_da từ sản phẩm
  const sanPham = order.expand?.san_pham?.[0];
  if (!sanPham) throw new Error("Đơn không có sản phẩm");

  const packageName = sanPham.thong_so?.package_da;
  if (!packageName) throw new Error(`Sản phẩm "${sanPham.ten_san_pham}" chưa có package_da trong thong_so`);

  log("ORDER", `📦 Package DA: ${packageName}`);

  // 5. Lấy email khách hàng
  const email = order.expand?.khach_hang?.email || `${host_username}@vmst.host`;
  log("ORDER", `📧 Email: ${email}`);

  // 6. Gọi DA API — ném thẳng thông tin từ đơn hàng vào
  log("DA", `Đang tạo: username=${host_username} domain=${host_url} package=${packageName}`);
  await createDAUser({
    username:    host_username,  // ← từ order.host_username
    password:    host_password,  // ← từ order.host_password
    email:       email,
    domain:      host_url,       // ← từ order.host_url
    packageName: packageName,    // ← từ san_pham.thong_so.package_da
  });
  log("DA", `✅ Tạo user thành công: ${host_username}`);

  // 7. Cập nhật trạng thái đơn hàng
  await updateOrder(order.id, {
    trang_thai_su_dung: "dang_su_dung",
  });
  log("PB", `✅ Đơn ${order.ma_don_hang} → dang_su_dung`);
  log("ORDER", `🎉 Hoàn thành: ${order.ma_don_hang}`);
}

// ── MIDDLEWARE XÁC THỰC ───────────────────────────────────────

function authMiddleware(req, res, next) {
  const secret = req.headers["x-secret"];
  if (!CONFIG.server.secret || secret !== CONFIG.server.secret) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }
  next();
}

// ── ROUTES ────────────────────────────────────────────────────

// Health check
app.get("/health", (req, res) => {
  res.json({
    ok:        true,
    timestamp: new Date().toISOString(),
    service:   "VMST Host Middleware",
  });
});

// Webhook thủ công — trigger theo order_id hoặc ma_don_hang
app.post("/webhook/order", authMiddleware, async (req, res) => {
  const { order_id, ma_don_hang } = req.body;

  if (!order_id && !ma_don_hang) {
    return res.status(400).json({ ok: false, error: "Cần order_id hoặc ma_don_hang" });
  }

  res.json({ ok: true, message: "Đang xử lý..." });

  try {
    if (order_id) {
      await processOrder(order_id);
    } else {
      const order = await findOrderByCode(ma_don_hang);
      await processOrder(order.id);
    }
  } catch (err) {
    log("ERROR", `Webhook order thất bại:`, err.message);
  }
});

// Webhook Sepay — tự động khi khách chuyển khoản
app.post("/webhook/sepay", async (req, res) => {
  log("SEPAY", `Nhận webhook:`, JSON.stringify(req.body));

  res.json({ ok: true });

  try {
    const content = req.body?.content || "";
    log("SEPAY", `Nội dung CK: ${content}`);

    // Extract mã đơn hàng từ nội dung (dạng T0X45C)
    const match = content.match(/\bT[A-Z0-9]{5}\b/);
    if (!match) {
      log("SEPAY", `⚠️ Không tìm thấy mã đơn trong: ${content}`);
      return;
    }

    const maDonHang = match[0];
    log("SEPAY", `📋 Mã đơn: ${maDonHang}`);

    const order = await findOrderByCode(maDonHang);
    await processOrder(order.id);
  } catch (err) {
    log("ERROR", `Webhook Sepay thất bại:`, err.message);
  }
});

// Retry thủ công 1 đơn
app.post("/retry/:orderId", authMiddleware, async (req, res) => {
  const { orderId } = req.params;

  try {
    await updateOrder(orderId, { trang_thai_su_dung: "chua_su_dung" });
    log("RETRY", `Reset đơn ${orderId} → chua_su_dung`);

    res.json({ ok: true, message: "Đang retry..." });

    await processOrder(orderId);
  } catch (err) {
    log("ERROR", `Retry thất bại:`, err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ── START ─────────────────────────────────────────────────────
app.listen(CONFIG.server.port, () => {
  log("SERVER", `🚀 Chạy tại port ${CONFIG.server.port}`);
  log("SERVER", `DA: ${CONFIG.da.url} | PB: ${CONFIG.pb.url}`);
});


package

Copy

{
  "name": "vmst-middleware",
  "version": "1.0.0",
  "description": "VMST Host — Middleware tự động tạo hosting DA",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "dotenv": "^16.0.0",
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
