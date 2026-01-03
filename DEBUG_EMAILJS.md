# Hướng dẫn Debug EmailJS - Tại sao không nhận được email?

## Các bước kiểm tra:

### 1. Kiểm tra Console Logs

Mở **Developer Tools** (F12) → Tab **Console** và tìm các log sau:

#### ✅ Logs thành công:
```
[EmailJS] Starting to send order notification email...
[EmailJS] Configuration: { SERVICE_ID: 'service_2hn9ch6', TEMPLATE_ID: 'template_9lxzpgt', ... }
[EmailJS] Initialized successfully
[EmailJS] Sending email with params: { ... }
[EmailJS] EmailJS response: { status: 200, ... }
[EmailJS] ✅ Email sent successfully to lequelcm@gmail.com
[notifyAdminNewOrder] ✅ Email sent successfully via EmailJS
```

#### ❌ Logs lỗi thường gặp:

**Lỗi 1: Missing Public Key**
```
[EmailJS] ❌ Missing Public Key! Please set VITE_EMAILJS_PUBLIC_KEY in .env file
```
**Giải pháp**: Thêm vào file `.env`:
```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Lỗi 2: EmailJS not configured**
```
[notifyAdminNewOrder] ⚠️ EmailJS not configured (missing Public Key?)
```
**Giải pháp**: Kiểm tra Public Key đã được set chưa

**Lỗi 3: No customer data**
```
[notifyAdminNewOrder] ⚠️ No customer data provided, cannot send email
```
**Giải pháp**: Đảm bảo form checkout có đầy đủ thông tin khách hàng

**Lỗi 4: EmailJS API error**
```
[EmailJS] ❌ Error sending email: ...
```
**Giải pháp**: 
- Kiểm tra Service ID và Template ID đúng chưa
- Kiểm tra Public Key có hợp lệ không
- Kiểm tra email service đã được verify chưa

### 2. Kiểm tra Public Key

1. Vào EmailJS Dashboard: https://dashboard.emailjs.com/
2. Vào **Account** → **General**
3. Copy **Public Key**
4. Thêm vào file `.env`:
```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```
5. **Restart dev server** (npm run dev)

### 3. Kiểm tra Service và Template

Đảm bảo:
- ✅ Service ID: `service_2hn9ch6` (đã fix cứng)
- ✅ Template ID: `template_9lxzpgt` (đã fix cứng)
- ✅ Email nhận: `lequelcm@gmail.com` (đã fix cứng)

### 4. Test trực tiếp trong EmailJS

1. Vào EmailJS Dashboard
2. Mở template `template_9lxzpgt`
3. Click tab **Test**
4. Điền các giá trị test
5. Click **Send Test Email**
6. Kiểm tra email `lequelcm@gmail.com`

Nếu test OK nhưng code không gửi → Vấn đề ở Public Key hoặc code

### 5. Kiểm tra Network Tab

1. Mở **Developer Tools** (F12)
2. Tab **Network**
3. Tạo đơn hàng mới
4. Tìm request đến EmailJS API
5. Xem Response để biết lỗi cụ thể

### 6. Checklist

- [ ] Public Key đã được set trong `.env`
- [ ] Dev server đã được restart sau khi thêm Public Key
- [ ] Service ID đúng: `service_2hn9ch6`
- [ ] Template ID đúng: `template_9lxzpgt`
- [ ] Email service đã được verify trong EmailJS
- [ ] Template settings có "To Email" = `lequelcm@gmail.com` hoặc `{{email}}`
- [ ] Console không có lỗi JavaScript
- [ ] Đã test template trực tiếp trong EmailJS và OK

### 7. Common Issues

#### Issue 1: Public Key không được load
**Triệu chứng**: Log hiển thị `HAS_PUBLIC_KEY: false`
**Giải pháp**: 
- Kiểm tra file `.env` có đúng tên biến: `VITE_EMAILJS_PUBLIC_KEY`
- Restart dev server
- Kiểm tra file `.env` có trong root folder không

#### Issue 2: EmailJS API trả về lỗi 400/401
**Triệu chứng**: `[EmailJS] ❌ Email send failed with status: 400`
**Giải pháp**:
- Kiểm tra Public Key có hợp lệ không
- Kiểm tra Service ID và Template ID đúng chưa
- Kiểm tra template parameters có đầy đủ không

#### Issue 3: Email gửi thành công nhưng không nhận được
**Triệu chứng**: Log hiển thị `status: 200` nhưng không có email
**Giải pháp**:
- Kiểm tra spam folder
- Kiểm tra email service có bị limit không (100 emails/tháng free)
- Kiểm tra "To Email" trong template settings

### 8. Debug Commands

Mở Console và chạy:
```javascript
// Kiểm tra biến môi trường
console.log('Public Key:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// Test gửi email thủ công
import { sendOrderNotificationEmail } from './src/services/emailService';
sendOrderNotificationEmail({
  orderId: 'test123',
  orderCode: 'TEST-001',
  customerName: 'Test User',
  customerEmail: 'test@example.com',
  customerPhone: '0901234567',
  items: [{ name: 'Test Product', price: 100000 }],
  subtotal: 100000,
  discount: 0,
  total: 100000,
  paymentStatus: 'cho_thanh_toan',
  orderStatus: 'tat_tam_thoi'
});
```

## Liên hệ hỗ trợ

Nếu vẫn không giải quyết được, cung cấp:
1. Console logs đầy đủ
2. Network tab response
3. File `.env` (ẩn Public Key)
4. Screenshot EmailJS Dashboard settings

