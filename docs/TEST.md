# 🔍 TROUBLESHOOTING - Trang client không load

## Các bước kiểm tra:

### 1. Kiểm tra Console (F12)
Mở Console và xem có lỗi đỏ không:
- Lỗi về import/module?
- Lỗi về component?
- Lỗi về API call?

### 2. Kiểm tra Network Tab
- File index.html có load không?
- File JavaScript (.js) có load không?
- Status code là gì? (200, 404, 500?)

### 3. Hard Refresh
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### 4. Clear Cache
- Chrome: Settings → Privacy → Clear browsing data
- Clear "Cached images and files"

### 5. Kiểm tra URL
- Đảm bảo đang ở `http://localhost:5173`
- Không phải `http://localhost:3000` hay port khác

### 6. Restart Dev Server
Nếu đang chạy local:
```bash
# Dừng server (Ctrl+C)
# Khởi động lại
npm run dev
```

## Lỗi thường gặp:

### Lỗi 1: Blank White Screen
**Nguyên nhân:**
- Component render error
- Import sai path
- Missing dependencies

**Giải pháp:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Lỗi 2: Module not found
**Nguyên nhân:**
- Missing package
- Typo trong import

**Giải pháp:**
```bash
npm install @supabase/supabase-js lucide-react
```

### Lỗi 3: Tailwind styles không load
**Nguyên nhân:**
- Tailwind config sai
- index.css chưa import directives

**Giải pháp:**
Check `src/index.css` có 3 dòng này:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Lỗi 4: Dev server không start
**Giải pháp:**
```bash
# Check port đang dùng
lsof -i :5173

# Kill process nếu cần
kill -9 <PID>

# Start lại
npm run dev
```

## Quick Test

Thử tạo file test đơn giản:

**File: `src/Test.tsx`**
```tsx
export default function Test() {
  return <div className="p-8 bg-blue-500 text-white">
    <h1 className="text-4xl">Test Page Works!</h1>
  </div>
}
```

**Sửa `src/App.tsx`** - Thêm ở đầu:
```tsx
import Test from './Test';
```

**Trong function App()** - Return test:
```tsx
return <Test />
```

Nếu Test page hiển thị → React + Tailwind hoạt động
Nếu không → Có vấn đề về setup cơ bản

## Diagnostic Checklist

✅ Kiểm tra build thành công: `npm run build`
✅ Kiểm tra TypeScript: `npm run typecheck`
✅ Xem console có lỗi không
✅ Xem network tab có file nào fail
✅ Clear cache browser
✅ Hard refresh (Ctrl+Shift+R)
✅ Restart dev server

## Nếu vẫn không được

Cung cấp cho tôi:
1. Screenshot màn hình
2. Console errors (text)
3. Network tab (failed requests)
4. URL hiện tại
5. Browser đang dùng (Chrome, Firefox, etc)
