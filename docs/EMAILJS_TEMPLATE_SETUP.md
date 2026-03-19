# Hướng dẫn Setup EmailJS Template

## Thông tin đã fix cứng:
- **Service ID**: `service_2hn9ch6`
- **Template ID**: `template_9lxzpgt`
- **Email nhận**: `lequelcm@gmail.com`

## Các bước setup:

### 1. Đăng nhập EmailJS Dashboard
- Truy cập: https://dashboard.emailjs.com/
- Đăng nhập tài khoản của bạn

### 2. Mở Template hiện có
- Vào **Email Templates**
- Tìm template có ID: `template_9lxzpgt` (tên: Auto-Reply)
- Click vào để chỉnh sửa

### 3. Cập nhật Template

#### Subject (Tiêu đề):
```
Đơn hàng mới {{order_code}} - VMST Host
```

#### Content (Nội dung):
- Chọn format: **HTML**
- Copy toàn bộ nội dung từ file `EMAILJS_TEMPLATE_HTML.html`
- Paste vào ô Content

### 4. Cấu hình Template Variables

Đảm bảo các biến sau được khai báo trong template:
- `{{order_code}}` - Mã đơn hàng
- `{{order_id}}` - ID đơn hàng
- `{{order_status}}` - Trạng thái đơn hàng
- `{{payment_status}}` - Trạng thái thanh toán
- `{{customer_name}}` - Tên khách hàng
- `{{customer_email}}` - Email khách hàng
- `{{customer_phone}}` - Số điện thoại
- `{{customer_company}}` - Công ty (optional)
- `{{customer_domain}}` - Domain (optional)
- `{{message}}` - Chi tiết đơn hàng (text format)
- `{{subtotal_amount}}` - Tạm tính
- `{{discount_amount}}` - Giảm giá
- `{{total_amount}}` - Tổng thành tiền
- `{{current_date}}` - Ngày giờ hiện tại

### 5. Lưu Template
- Click **Save** để lưu template
- Template sẽ tự động sử dụng Service ID: `service_2hn9ch6`

### 6. Test Template
- Click tab **Test**
- Điền các giá trị test:
  - `order_code`: ORD-2024-001
  - `order_id`: test123
  - `customer_name`: Nguyễn Văn A
  - `customer_email`: test@example.com
  - `customer_phone`: 0901234567
  - `total_amount`: 1.000.000₫
  - etc...
- Click **Send Test Email**
- Kiểm tra email `lequelcm@gmail.com`

### 7. Cấu hình Public Key (nếu chưa có)

Thêm vào file `.env`:
```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Lấy Public Key từ:
- EmailJS Dashboard → **Account** → **General** → **Public Key**

## Template sẽ hiển thị:

✅ **Header đẹp** với gradient màu xanh VMST Host
✅ **Thông tin đơn hàng** đầy đủ (mã, ID, trạng thái, thanh toán)
✅ **Thông tin khách hàng** chi tiết (tên, email, SĐT, công ty, domain)
✅ **Chi tiết sản phẩm** với format dễ đọc
✅ **Tổng kết** với breakdown rõ ràng (tạm tính, giảm giá, thành tiền)
✅ **Tổng tiền nổi bật** với box màu xanh
✅ **Hành động cần thiết** với box cảnh báo màu đỏ
✅ **Footer** chuyên nghiệp

## Lưu ý:

- Template sử dụng HTML với CSS inline để đảm bảo hiển thị tốt trên mọi email client
- Các biến `{{#variable}}...{{/variable}}` là conditional (chỉ hiển thị nếu có giá trị)
- Email sẽ tự động gửi đến `lequelcm@gmail.com` mỗi khi có đơn hàng mới
- Không cần cấu hình thêm Service ID và Template ID vì đã được fix cứng trong code

## Troubleshooting:

Nếu không nhận được email:
1. Kiểm tra Public Key đã được set trong `.env`
2. Kiểm tra Service ID và Template ID đúng
3. Kiểm tra email service đã được verify trong EmailJS
4. Xem console log để kiểm tra lỗi
5. Test template trực tiếp trong EmailJS dashboard

