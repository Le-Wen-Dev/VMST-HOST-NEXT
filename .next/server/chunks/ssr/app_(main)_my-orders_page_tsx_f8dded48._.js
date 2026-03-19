module.exports=[66419,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(77156),e=a.i(84505),f=a.i(41675),g=a.i(11156),h=a.i(83497),i=a.i(44494),j=a.i(46842),k=a.i(43108),l=a.i(13749);let m=(0,a.i(70106).default)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);var n=a.i(50944),o=a.i(62217),p=a.i(71788);function q(){let a=(0,n.useRouter)(),q=(0,n.useSearchParams)().get("highlight")||void 0,[r,s]=(0,c.useState)(!1),[t,u]=(0,c.useState)(null),[v,w]=(0,c.useState)([]),[x,y]=(0,c.useState)(1),[z,A]=(0,c.useState)(10),[B,C]=(0,c.useState)(0),[D,E]=(0,c.useState)(!1),[F,G]=(0,c.useState)(null),H=async()=>{E(!0),G(null);try{let a=await (0,p.listMyOrders)({page:x,perPage:z,expand:"san_pham"}),b=[...a.items].sort((a,b)=>{let c=new Date(a.ngay_dat_hang||a.updated||0).getTime();return new Date(b.ngay_dat_hang||b.updated||0).getTime()-c});w(b),C(a.totalPages)}catch(a){G(a?.message||"Không thể tải danh sách đơn hàng")}finally{E(!1)}};(0,c.useEffect)(()=>{H()},[x,z]);let I=(0,c.useMemo)(()=>v.map(a=>{let b="Dịch vụ",c=a.expand?.san_pham;Array.isArray(c)&&c.length>0?b=c.map(a=>a?.ten_san_pham||"").filter(Boolean).join(", "):c?.ten_san_pham?b=c.ten_san_pham:"string"==typeof a.san_pham&&(b=a.san_pham);let d=a.ngay_dat_hang||a.updated,e="string"==typeof d?d.replace(" ","T"):d,f=d?new Date(e).toLocaleDateString("vi-VN"):"",g=a.gia_tri||"-",h=a.gia_tri||"-",i=a.thanh_toan||"cho_thanh_toan",j=a.trang_thai_su_dung||"pending";return{id:a.ma_don_hang||a.id,productName:b,priceText:h,totalText:g,orderDate:f,status:j,paymentStatus:i,specs:"",host_url:a.host_url,host_username:a.host_username,host_password:a.host_password}}),[v]);(0,c.useEffect)(()=>{if(!q||0===v.length)return;let a=I.find(a=>a.id===q);a&&(u(a),s(!0))},[q,v]);let J=a=>({pending:"bg-yellow-100 text-yellow-800",confirmed:"bg-blue-100 text-blue-800",active:"bg-green-100 text-green-800",cancelled:"bg-red-100 text-red-800",cho_duyet:"bg-yellow-100 text-yellow-800",da_duyet:"bg-green-100 text-green-800",da_huy:"bg-red-100 text-red-800",tat_tam_thoi:"bg-gray-100 text-gray-800",dang_su_dung:"bg-green-100 text-green-800",het_han_su_dung:"bg-red-100 text-red-800"})[a.toLowerCase()]||"bg-gray-100 text-gray-800",K=a=>({pending:"Chờ xử lý",confirmed:"Đã xác nhận",active:"Đang hoạt động",cancelled:"Đã hủy",cho_duyet:"Chờ duyệt",da_duyet:"Đã duyệt",da_huy:"Đã hủy",tat_tam_thoi:"Tắt tạm thời",dang_su_dung:"Đang sử dụng",het_han_su_dung:"Hết hạn sử dụng"})[a.toLowerCase()]||a,L=a=>({unpaid:"Chưa thanh toán",paid:"Đã thanh toán",partial:"Thanh toán một phần",cho_thanh_toan:"Chưa thanh toán",da_thanh_toan:"Đã thanh toán",thanh_toan_mot_phan:"Thanh toán một phần"})[a.toLowerCase()]||a,M=a=>{let b=new Blob([`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>H\xf3a đơn ${a.id}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; }
    .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
    .company-info { margin-bottom: 30px; }
    .invoice-info { background: #f3f4f6; padding: 20px; margin-bottom: 30px; border-radius: 8px; }
    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    .items-table th { background: #2563eb; color: white; padding: 12px; text-align: left; }
    .items-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
    .total-section { text-align: right; margin-top: 30px; }
    .total-row { display: flex; justify-content: flex-end; padding: 8px 0; }
    .total-label { width: 150px; font-weight: bold; }
    .total-value { width: 200px; text-align: right; }
    .grand-total { font-size: 20px; color: #2563eb; font-weight: bold; padding-top: 10px; border-top: 2px solid #2563eb; }
    .footer { margin-top: 50px; text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="color: #2563eb; margin: 0;">VMST HOSTING</h1>
    <p style="margin: 5px 0;">Website: https://vmst.host | Email: support@vmst.host</p>
    <p style="margin: 5px 0;">Hotline: 0832575905</p>
  </div>

  <div class="company-info">
    <p><strong>Địa chỉ:</strong> Tầng 3, T\xf2a nh\xe0 ABC, Số 123 Đường XYZ, Quận 1, TP.HCM</p>
    <p><strong>MST:</strong> 0123456789</p>
  </div>

  <div class="invoice-info">
    <h2 style="margin-top: 0; color: #2563eb;">H\xd3A ĐƠN DỊCH VỤ</h2>
    <p><strong>M\xe3 đơn h\xe0ng:</strong> ${a.id}</p>
    <p><strong>Ng\xe0y đặt h\xe0ng:</strong> ${a.orderDate}</p>
    <p><strong>Trạng th\xe1i:</strong> ${K(a.status)}</p>
    <p><strong>Thanh to\xe1n:</strong> ${L(a.paymentStatus)}</p>
  </div>

  <table class="items-table">
    <thead>
      <tr>
        <th>Dịch vụ</th>
        <th>Th\xf4ng số</th>
        <th>Đơn gi\xe1</th>
        <th>Giảm gi\xe1</th>
        <th>Th\xe0nh tiền</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>${a.productName}</strong></td>
        <td>${a.specs||""}</td>
        <td>${a.priceText}</td>
        <td>${a.discountText||"0đ"}</td>
        <td><strong>${a.totalText}</strong></td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    <p><strong>Cảm ơn qu\xfd kh\xe1ch đ\xe3 sử dụng dịch vụ của VMST Hosting!</strong></p>
    <p>Mọi thắc mắc xin vui l\xf2ng li\xean hệ: support@vmst.host hoặc 0832575905</p>
  </div>
</body>
</html>
    `],{type:"text/html"}),c=URL.createObjectURL(b),d=document.createElement("a");d.href=c,d.download=`Invoice-${a.id}.html`,d.click(),URL.revokeObjectURL(c)};return(0,b.jsxs)("div",{className:"min-h-screen bg-gradient-to-br from-gray-50 to-blue-50",children:[(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-4 py-12",children:[(0,b.jsxs)("div",{className:"mb-8",children:[(0,b.jsx)("div",{className:"flex items-center justify-between mb-3",children:(0,b.jsxs)("button",{onClick:()=>{window.history.length>1?window.history.back():a.push("/portal")},className:"inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#034CC9]",children:[(0,b.jsx)(l.ChevronLeft,{className:"h-5 w-5"})," Quay lại"]})}),(0,b.jsx)("h1",{className:"text-4xl font-bold text-gray-900 mb-2",children:"Đơn hàng của tôi"}),(0,b.jsx)("p",{className:"text-gray-600",children:"Quản lý và theo dõi các đơn hàng đã đặt"})]}),(0,b.jsxs)("div",{className:"bg-white rounded-2xl shadow-xl overflow-hidden",children:[(0,b.jsx)("div",{className:"overflow-x-auto",children:D?(0,b.jsx)("div",{className:"p-8 text-center text-gray-600",children:"Đang tải..."}):F?(0,b.jsx)("div",{className:"p-8 text-center text-red-600",children:F}):0===I.length?(0,b.jsx)("div",{className:"p-8 text-center text-gray-600",children:"Chưa có đơn hàng nào"}):(0,b.jsxs)("table",{className:"w-full",children:[(0,b.jsx)("thead",{className:"bg-gradient-to-r from-blue-600 to-indigo-600 text-white",children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-bold uppercase",children:"Mã đơn"}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-bold uppercase",children:"Dịch vụ"}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-bold uppercase",children:"Ngày đặt"}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-bold uppercase",children:"Tổng tiền"}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-bold uppercase",children:"Trạng thái"}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-bold uppercase",children:"Thanh toán"}),(0,b.jsx)("th",{className:"px-6 py-4 text-left text-sm font-bold uppercase",children:"Hành động"})]})}),(0,b.jsx)("tbody",{className:"divide-y divide-gray-200",children:I.map(a=>(0,b.jsxs)("tr",{className:"hover:bg-blue-50 transition-colors",children:[(0,b.jsx)("td",{className:"px-6 py-4",children:(0,b.jsx)("p",{className:"font-bold text-gray-900",children:a.id})}),(0,b.jsx)("td",{className:"px-6 py-4",children:(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsx)(h.Package,{className:"h-5 w-5 text-blue-600"}),(0,b.jsx)("p",{className:"font-semibold text-gray-900",children:a.productName})]})}),(0,b.jsx)("td",{className:"px-6 py-4",children:(0,b.jsxs)("div",{className:"flex items-center gap-2 text-gray-600",children:[(0,b.jsx)(f.Calendar,{className:"h-4 w-4"}),a.orderDate]})}),(0,b.jsx)("td",{className:"px-6 py-4",children:(0,b.jsx)("p",{className:"font-bold text-lg text-blue-600",children:a.totalText})}),(0,b.jsx)("td",{className:"px-6 py-4",children:(0,b.jsx)("span",{className:`px-3 py-1 rounded-full text-xs font-bold ${J(a.status)}`,children:K(a.status)})}),(0,b.jsx)("td",{className:"px-6 py-4",children:(0,b.jsx)("span",{className:`px-3 py-1 rounded-full text-xs font-bold ${{unpaid:"bg-red-100 text-red-800",paid:"bg-green-100 text-green-800",partial:"bg-yellow-100 text-yellow-800",cho_thanh_toan:"bg-red-100 text-red-800",da_thanh_toan:"bg-green-100 text-green-800",thanh_toan_mot_phan:"bg-yellow-100 text-yellow-800"}[a.paymentStatus.toLowerCase()]||"bg-gray-100 text-gray-800"}`,children:L(a.paymentStatus)})}),(0,b.jsx)("td",{className:"px-6 py-4",children:(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)("button",{onClick:()=>{u(a),s(!0)},className:"p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors",title:"Xem chi tiết",children:(0,b.jsx)(d.Eye,{className:"h-5 w-5"})}),(0,b.jsx)("button",{onClick:()=>M(a),className:"p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors",title:"Xuất hóa đơn",children:(0,b.jsx)(e.Download,{className:"h-5 w-5"})})]})})]},a.id))})]})}),(0,b.jsxs)("div",{className:"flex items-center justify-between p-4 border-t bg-white",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)("button",{className:"px-3 py-2 rounded border hover:bg-gray-50 disabled:opacity-50",onClick:()=>y(a=>Math.max(1,a-1)),disabled:x<=1,children:(0,b.jsx)(l.ChevronLeft,{className:"w-4 h-4"})}),(0,b.jsxs)("span",{className:"text-sm text-gray-700",children:["Trang ",x," / ",Math.max(1,B)]}),(0,b.jsx)("button",{className:"px-3 py-2 rounded border hover:bg-gray-50 disabled:opacity-50",onClick:()=>y(a=>Math.min(B||a+1,a+1)),disabled:B>0&&x>=B,children:(0,b.jsx)(m,{className:"w-4 h-4"})})]}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)("span",{className:"text-sm text-gray-700",children:"Hiển thị"}),(0,b.jsx)("select",{value:z,onChange:a=>{A(Number(a.target.value)),y(1)},className:"border rounded px-2 py-1 text-sm",children:[10,20,50].map(a=>(0,b.jsxs)("option",{value:a,children:[a,"/trang"]},a))})]})]})]})]}),(0,b.jsx)(o.default,{isOpen:r,onClose:()=>s(!1),title:"Chi tiết đơn hàng",size:"lg",children:t&&(0,b.jsxs)("div",{className:"space-y-6",children:[(0,b.jsxs)("div",{className:"bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6",children:[(0,b.jsx)("h3",{className:"text-2xl font-bold text-gray-900 mb-2",children:t.productName}),(0,b.jsxs)("p",{className:"text-gray-600",children:["Mã đơn hàng: ",(0,b.jsx)("strong",{children:t.id})]})]}),(0,b.jsxs)("div",{className:"grid md:grid-cols-2 gap-6",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("label",{className:"block text-sm font-bold text-gray-600 mb-2",children:"Ngày đặt hàng"}),(0,b.jsx)("p",{className:"text-lg text-gray-900",children:t.orderDate})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("label",{className:"block text-sm font-bold text-gray-600 mb-2",children:"Trạng thái"}),(0,b.jsx)("span",{className:`inline-block px-4 py-2 rounded-lg text-sm font-bold ${J(t.status)}`,children:K(t.status)})]})]}),(t.host_url||t.host_username||t.host_password)&&(0,b.jsxs)("div",{className:"bg-gray-50 rounded-lg p-4",children:[(0,b.jsx)("label",{className:"block text-sm font-bold text-gray-600 mb-2",children:"Thông tin truy cập dịch vụ"}),(0,b.jsxs)("div",{className:"space-y-2",children:[t.host_url&&(0,b.jsxs)("div",{className:"flex items-center gap-2 text-gray-900",children:[(0,b.jsx)(i.Globe,{className:"w-4 h-4 text-blue-600"}),(0,b.jsx)("span",{className:"font-semibold",children:"URL:"}),(0,b.jsx)("a",{href:t.host_url,target:"_blank",rel:"noreferrer",className:"text-blue-600 hover:underline",children:t.host_url})]}),t.host_username&&(0,b.jsxs)("div",{className:"flex items-center gap-2 text-gray-900",children:[(0,b.jsx)(j.User,{className:"w-4 h-4 text-blue-600"}),(0,b.jsx)("span",{className:"font-semibold",children:"Username:"}),(0,b.jsx)("span",{children:t.host_username})]}),t.host_password&&(0,b.jsxs)("div",{className:"flex items-center gap-2 text-gray-900",children:[(0,b.jsx)(k.Lock,{className:"w-4 h-4 text-blue-600"}),(0,b.jsx)("span",{className:"font-semibold",children:"Password:"}),(0,b.jsx)("span",{children:t.host_password})]})]})]}),(0,b.jsx)("div",{className:"border-t pt-6",children:(0,b.jsx)("div",{className:"space-y-3",children:(0,b.jsxs)("div",{className:"flex justify-between text-lg",children:[(0,b.jsx)("span",{className:"text-gray-600",children:"Tổng tiền:"}),(0,b.jsx)("span",{className:"font-semibold text-blue-600",children:t.totalText})]})})}),(0,b.jsxs)("div",{className:"flex gap-4 pt-4 border-t",children:[(0,b.jsxs)("button",{onClick:()=>M(t),className:"flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold flex items-center justify-center gap-2",children:[(0,b.jsx)(e.Download,{className:"h-5 w-5"}),"Xuất hóa đơn"]}),"cho_thanh_toan"===t.paymentStatus&&(0,b.jsxs)("button",{className:"flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center justify-center gap-2",children:[(0,b.jsx)(g.CreditCard,{className:"h-5 w-5"}),"Thanh toán ngay"]})]})]})})]})}function r(){return(0,b.jsx)(c.Suspense,{fallback:(0,b.jsx)("div",{className:"min-h-screen bg-gray-50 flex items-center justify-center",children:(0,b.jsx)("p",{className:"text-gray-600",children:"Đang tải..."})}),children:(0,b.jsx)(q,{})})}a.s(["default",()=>r],66419)}];

//# sourceMappingURL=app_%28main%29_my-orders_page_tsx_f8dded48._.js.map