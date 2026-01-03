# Hướng dẫn cấu hình EmailJS

## Bước 1: Đăng ký tài khoản EmailJS

1. Truy cập https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí (100 emails/tháng)
3. Xác thực email của bạn

## Bước 2: Tạo Email Service

1. Vào **Email Services** trong dashboard
2. Click **Add New Service**
3. Chọn email provider của bạn (Gmail, Outlook, etc.)
4. Làm theo hướng dẫn để kết nối email của bạn
5. Lưu lại **Service ID** (ví dụ: `service_xxxxx`)

## Bước 3: Tạo Email Template

1. Vào **Email Templates** trong dashboard
2. Click **Create New Template**
3. Sử dụng template sau:

**Subject:**
```
Đơn hàng mới {{order_code}}
```

**Content:**
```
Chào {{to_name}},

Bạn có đơn hàng mới từ VMST Host:

Mã đơn hàng: {{order_code}}
Giá trị: {{total_amount}}
Trạng thái: {{order_status}}
Thanh toán: {{payment_status}}

--- Thông tin khách hàng ---
Họ tên: {{customer_name}}
Email: {{customer_email}}
SĐT: {{customer_phone}}
{{#customer_company}}Công ty: {{customer_company}}{{/customer_company}}
{{#customer_domain}}Domain: {{customer_domain}}{{/customer_domain}}

--- Chi tiết đơn hàng ---
{{message}}

Vui lòng soạn đơn và liên hệ khách hàng để kích hoạt dịch vụ.

Trân trọng,
VMST Host
```

4. Lưu lại **Template ID** (ví dụ: `template_xxxxx`)

## Bước 4: Lấy Public Key

1. Vào **Account** → **General**
2. Copy **Public Key** (ví dụ: `xxxxxxxxxxxxx`)

## Bước 5: Cấu hình trong project

Thêm các biến môi trường vào file `.env` hoặc `.env.local`:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
VITE_ADMIN_EMAIL=lequelcm@gmail.com
```

## Bước 6: Test

1. Tạo một đơn hàng test
2. Kiểm tra email của bạn
3. Nếu không nhận được email, kiểm tra console để xem lỗi

## Lưu ý

- EmailJS miễn phí cho 100 emails/tháng
- Nếu cần nhiều hơn, có thể nâng cấp plan
- Email sẽ được gửi từ email bạn đã kết nối trong Email Service
- Đảm bảo email service đã được verify

## Template Variables

Các biến có sẵn trong template:
- `{{to_name}}` - Tên người nhận
- `{{to_email}}` - Email người nhận
- `{{subject}}` - Tiêu đề email
- `{{message}}` - Nội dung chi tiết đơn hàng
- `{{order_id}}` - ID đơn hàng
- `{{order_code}}` - Mã đơn hàng
- `{{customer_name}}` - Tên khách hàng
- `{{customer_email}}` - Email khách hàng
- `{{customer_phone}}` - SĐT khách hàng
- `{{customer_company}}` - Công ty (nếu có)
- `{{customer_domain}}` - Domain (nếu có)
- `{{total_amount}}` - Tổng tiền
- `{{payment_status}}` - Trạng thái thanh toán
- `{{order_status}}` - Trạng thái đơn hàng

