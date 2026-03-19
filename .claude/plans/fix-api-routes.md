# Fix PocketBase API Routes — Plan

## Vấn đề
So sánh API docs (`src/documentapi/*.api`) với code thực tế, phát hiện nhiều route gọi sai field name, sort field không tồn tại, và thiếu data khi update.

## Các fix cần làm

### 1. Fix sort fields cho collections KHÔNG có `created`
Theo API docs, 3 collections không có field `created`:
- `orders` → có `ngay_dat_hang`, `updated`
- `doi_soat_aff` → có `ngay_tao_don`, `updated`
- `yeu_cau_thanh_toan_aff` → có `ngay_yeu_cau`, `updated`

**Files cần sửa:**
- `app/api/admin/orders/route.ts` — đổi sort candidates thành `-ngay_dat_hang` trực tiếp
- `app/api/admin/doi-soat-aff/route.ts` — đổi `-created` → `-ngay_tao_don`
- `app/api/admin/yeu-cau-thanh-toan-aff/route.ts` — đổi `-created` → `-ngay_yeu_cau`

### 2. Fix SePay webhook
- `app/api/sepay/route.ts` — lưu sepay JSON data vào field `sepay` khi update order

### 3. Fix OrderRecord type
- `services/orders.ts` — thêm `ngay_dat_hang` field, bỏ `created`

### 4. Fix order status polling
- `app/api/orders/status/route.ts` — đã có logging, giữ nguyên

### 5. Fix blogs sort (optional improvement)
- `services/blogs.ts` — blogs có cả `created` và `ngay_viet`, giữ `-created` vẫn OK

## Không cần sửa (đã đúng)
- Collection names: tất cả đều đúng (`orders`, `vochers`, `blogs`, `category_blogs`, etc.)
- Field names trong POST/PATCH: đều match API docs
- `affiliate`, `servers`, `contacts`, `notifications`, `tickets`, `users`, `vouchers`, `warning_outdate`, `setting_system` — sort `-created` OK vì các collection này có `created`
