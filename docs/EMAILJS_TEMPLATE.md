# EmailJS Template cho Thông báo Đơn hàng Mới

## Service ID
```
service_2hn9ch6
```

## Template Content

### Subject (Tiêu đề):
```
Đơn hàng mới {{order_code}} - VMST Host
```

### Body (Nội dung):

**Option 1: Plain Text (Đơn giản, dễ test)**

```
🚀 ĐƠN HÀNG MỚI TỪ VMST HOST

📋 THÔNG TIN ĐƠN HÀNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mã đơn hàng: {{order_code}}
ID đơn hàng: {{order_id}}
Trạng thái: {{order_status}}
Thanh toán: {{payment_status}}

👤 THÔNG TIN KHÁCH HÀNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Họ tên: {{customer_name}}
Email: {{customer_email}}
Số điện thoại: {{customer_phone}}
{{#customer_company}}Công ty: {{customer_company}}{{/customer_company}}
{{#customer_domain}}Domain: {{customer_domain}}{{/customer_domain}}

🛒 CHI TIẾT ĐƠN HÀNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

💰 TỔNG KẾT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tổng thành tiền: {{total_amount}}

⚠️ HÀNH ĐỘNG CẦN THIẾT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vui lòng soạn đơn và liên hệ khách hàng để kích hoạt dịch vụ.

─────────────────────────────────────────
Email này được gửi tự động từ hệ thống VMST Host
```

**Option 2: HTML (Đẹp, chuyên nghiệp)**

**Chọn format: HTML**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #034CC9 0%, #0B2B6F 100%);
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #f9f9f9;
      padding: 20px;
      border: 1px solid #ddd;
      border-top: none;
    }
    .section {
      background: white;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 5px;
      border-left: 4px solid #034CC9;
    }
    .section h2 {
      margin-top: 0;
      color: #034CC9;
      font-size: 18px;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: bold;
      color: #666;
      width: 40%;
    }
    .value {
      color: #333;
      width: 60%;
      text-align: right;
    }
    .highlight {
      background: #fff3cd;
      padding: 10px;
      border-radius: 5px;
      margin: 10px 0;
      border-left: 4px solid #ffc107;
    }
    .total-box {
      background: #d4edda;
      padding: 15px;
      border-radius: 5px;
      margin-top: 15px;
      border-left: 4px solid #28a745;
    }
    .total-box .amount {
      font-size: 24px;
      font-weight: bold;
      color: #155724;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
      border-top: 1px solid #ddd;
      margin-top: 20px;
    }
    .status-badge {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 12px;
      font-weight: bold;
    }
    .status-pending {
      background: #fff3cd;
      color: #856404;
    }
    .status-paid {
      background: #d4edda;
      color: #155724;
    }
    .status-active {
      background: #d1ecf1;
      color: #0c5460;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚀 Đơn hàng mới từ VMST Host</h1>
  </div>
  
  <div class="content">
    <!-- Thông tin đơn hàng -->
    <div class="section">
      <h2>📋 Thông tin đơn hàng</h2>
      <div class="info-row">
        <span class="label">Mã đơn hàng:</span>
        <span class="value"><strong>{{order_code}}</strong></span>
      </div>
      <div class="info-row">
        <span class="label">ID đơn hàng:</span>
        <span class="value">{{order_id}}</span>
      </div>
      <div class="info-row">
        <span class="label">Trạng thái:</span>
        <span class="value">
          <span class="status-badge status-active">{{order_status}}</span>
        </span>
      </div>
      <div class="info-row">
        <span class="label">Thanh toán:</span>
        <span class="value">
          <span class="status-badge status-pending">{{payment_status}}</span>
        </span>
      </div>
    </div>

    <!-- Thông tin khách hàng -->
    <div class="section">
      <h2>👤 Thông tin khách hàng</h2>
      <div class="info-row">
        <span class="label">Họ tên:</span>
        <span class="value"><strong>{{customer_name}}</strong></span>
      </div>
      <div class="info-row">
        <span class="label">Email:</span>
        <span class="value">{{customer_email}}</span>
      </div>
      <div class="info-row">
        <span class="label">Số điện thoại:</span>
        <span class="value">{{customer_phone}}</span>
      </div>
      {{#customer_company}}
      <div class="info-row">
        <span class="label">Công ty:</span>
        <span class="value">{{customer_company}}</span>
      </div>
      {{/customer_company}}
      {{#customer_domain}}
      <div class="info-row">
        <span class="label">Domain:</span>
        <span class="value">{{customer_domain}}</span>
      </div>
      {{/customer_domain}}
    </div>

    <!-- Chi tiết đơn hàng -->
    <div class="section">
      <h2>🛒 Chi tiết đơn hàng</h2>
      <div style="white-space: pre-line; font-family: monospace; background: #f5f5f5; padding: 15px; border-radius: 5px;">
{{message}}
      </div>
    </div>

    <!-- Tổng kết -->
    <div class="total-box">
      <div style="text-align: center;">
        <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Tổng thành tiền</div>
        <div class="amount">{{total_amount}}</div>
      </div>
    </div>

    <!-- Ghi chú -->
    <div class="highlight">
      <strong>⚠️ Hành động cần thiết:</strong><br>
      Vui lòng soạn đơn và liên hệ khách hàng để kích hoạt dịch vụ.
    </div>
  </div>

  <div class="footer">
    <p>Email này được gửi tự động từ hệ thống VMST Host</p>
    <p>Thời gian: {{current_date}}</p>
  </div>
</body>
</html>
```

## Cách tạo template trong EmailJS Dashboard

1. **Đăng nhập EmailJS Dashboard**
   - Truy cập https://dashboard.emailjs.com/
   - Đăng nhập tài khoản của bạn

2. **Tạo Template mới**
   - Vào menu **Email Templates**
   - Click nút **Create New Template**
   - Chọn **Blank Template**

3. **Cấu hình Template**
   - **Template Name**: `Order Notification - VMST Host`
   - **Subject**: Copy phần Subject ở trên
   - **Content**: 
     - Chọn format **HTML**
     - Copy toàn bộ HTML code ở trên vào ô Content

4. **Lưu Template**
   - Click **Save**
   - Copy **Template ID** (sẽ có dạng `template_xxxxx`)

5. **Cập nhật biến môi trường**
   - Thêm vào file `.env`:
   ```env
   VITE_EMAILJS_SERVICE_ID=service_2hn9ch6
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxx  # ID bạn vừa copy
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_ADMIN_EMAIL=lequelcm@gmail.com
   ```

## Template Variables (Biến có sẵn)

Các biến sau sẽ được tự động điền vào template:

- `{{order_code}}` - Mã đơn hàng (ví dụ: ORD-2024-001)
- `{{order_id}}` - ID đơn hàng trong database
- `{{customer_name}}` - Tên khách hàng
- `{{customer_email}}` - Email khách hàng
- `{{customer_phone}}` - Số điện thoại
- `{{customer_company}}` - Công ty (nếu có)
- `{{customer_domain}}` - Domain (nếu có)
- `{{message}}` - Chi tiết đầy đủ về sản phẩm và tổng kết
- `{{total_amount}}` - Tổng tiền (đã format)
- `{{payment_status}}` - Trạng thái thanh toán
- `{{order_status}}` - Trạng thái đơn hàng

## Test Template

Sau khi tạo template, bạn có thể test bằng cách:
1. Vào **Email Templates** → Click vào template vừa tạo
2. Click **Test** tab
3. Điền các giá trị test
4. Click **Send Test Email**

## Lưu ý

- Template sử dụng HTML với CSS inline để đảm bảo hiển thị tốt trên mọi email client
- Các biến có dấu `{{#variable}}...{{/variable}}` là conditional (chỉ hiển thị nếu có giá trị)
- Email sẽ được gửi tự động mỗi khi có đơn hàng mới

