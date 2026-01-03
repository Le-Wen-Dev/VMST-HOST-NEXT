# Hướng dẫn cấu hình EmailJS - Gửi về lequelcm@gmail.com

## Giải thích các trường trong EmailJS Template Settings:

### 1. **To Email** (Email người nhận)
- **Là gì**: Email sẽ nhận được thông báo đơn hàng
- **Cách dùng**: Đặt biến `{{email}}` hoặc `{{to_email}}`
- **Trong trường hợp của bạn**: Fix cứng là `lequelcm@gmail.com`

### 2. **From Email** (Email người gửi)
- **Là gì**: Email hiển thị là người gửi (thường là email bạn đã kết nối trong Email Service)
- **Cách dùng**: Có thể dùng "Use Default Email Address" (email đã kết nối trong Service)
- **Ví dụ**: Nếu bạn kết nối Gmail `tech.vmst@gmail.com` trong Service, thì email sẽ gửi từ địa chỉ này

### 3. **Reply To** (Email để reply)
- **Là gì**: Khi người nhận click "Reply", email sẽ được gửi đến địa chỉ này
- **Cách dùng**: Đặt email bạn muốn nhận reply (ví dụ: `tech.vmst@gmail.com`)
- **Lưu ý**: Không bắt buộc, nhưng nên set để dễ quản lý

### 4. **Bcc / Cc**
- **Bcc**: Gửi bản sao ẩn (người nhận không thấy)
- **Cc**: Gửi bản sao công khai (người nhận thấy)
- **Trong trường hợp của bạn**: Không cần thiết vì chỉ gửi cho 1 người

## Cấu hình Template để gửi về lequelcm@gmail.com:

### Bước 1: Mở Template Settings
1. Vào EmailJS Dashboard
2. Mở template `template_9lxzpgt` (Auto-Reply)
3. Click tab **Settings** (bên phải)

### Bước 2: Cấu hình các trường

#### **To Email** (Quan trọng nhất):
```
lequelcm@gmail.com
```
**HOẶC** nếu muốn dùng biến (nhưng code đã fix cứng):
```
{{email}}
```

#### **From Name**:
```
VMST Host
```
hoặc để trống

#### **From Email**:
- ✅ Check "Use Default Email Address"
- Email này sẽ là email bạn đã kết nối trong Service (ví dụ: `tech.vmst@gmail.com`)

#### **Reply To**:
```
tech.vmst@gmail.com
```
hoặc email bạn muốn nhận reply

#### **Bcc / Cc**:
- Để trống (không cần)

### Bước 3: Lưu Settings
- Click nút **Save** (màu xanh, góc trên bên phải)

## Cách hoạt động:

1. **Khi có đơn hàng mới**:
   - Code tự động gọi `sendOrderNotificationEmail()`
   - Gửi request đến EmailJS với `email: 'lequelcm@gmail.com'`

2. **EmailJS xử lý**:
   - Lấy giá trị `{{email}}` từ template params = `lequelcm@gmail.com`
   - Gửi email đến `lequelcm@gmail.com`
   - Email được gửi từ email đã kết nối trong Service (From Email)
   - Nếu có Reply To, reply sẽ gửi về email đó

3. **Kết quả**:
   - Bạn nhận email tại `lequelcm@gmail.com`
   - Email có đầy đủ thông tin đơn hàng
   - Nếu reply, email sẽ gửi về `tech.vmst@gmail.com` (nếu đã set Reply To)

## Lưu ý quan trọng:

✅ **To Email**: Phải là `lequelcm@gmail.com` (fix cứng trong code)
✅ **From Email**: Dùng email đã kết nối trong Service (tự động)
✅ **Reply To**: Nên set để dễ quản lý reply
✅ **Template Content**: Copy từ file `EMAILJS_TEMPLATE_HTML.html`

## Test:

1. Tạo đơn hàng test
2. Kiểm tra email `lequelcm@gmail.com`
3. Nếu không nhận được:
   - Kiểm tra Service đã được verify chưa
   - Kiểm tra Public Key đã set trong `.env`
   - Xem console log để debug

