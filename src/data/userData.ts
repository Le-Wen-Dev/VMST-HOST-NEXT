export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'admin' | 'staff' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  createdDate: string;
  lastLogin?: string;
  totalOrders?: number;
  totalSpent?: number;
  notes?: string;
}

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Admin System',
    email: 'admin@vmst.host',
    phone: '0832575905',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'admin',
    status: 'active',
    createdDate: '2024-01-01',
    lastLogin: '2025-10-10 08:30',
    notes: 'Super admin account'
  },
  {
    id: 'u2',
    name: 'Nguyễn Văn A',
    email: 'staff1@vmst.host',
    phone: '0901234567',
    avatar: 'https://i.pravatar.cc/150?img=33',
    role: 'staff',
    status: 'active',
    createdDate: '2024-03-15',
    lastLogin: '2025-10-10 09:15',
    notes: 'Technical support staff'
  },
  {
    id: 'u3',
    name: 'Trần Thị B',
    email: 'staff2@vmst.host',
    phone: '0912345678',
    avatar: 'https://i.pravatar.cc/150?img=45',
    role: 'staff',
    status: 'active',
    createdDate: '2024-03-20',
    lastLogin: '2025-10-09 17:30',
    notes: 'Sales staff'
  },
  {
    id: 'u4',
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@example.com',
    phone: '0901234567',
    avatar: 'https://i.pravatar.cc/150?img=15',
    role: 'customer',
    status: 'active',
    createdDate: '2025-01-15',
    lastLogin: '2025-10-09 14:20',
    totalOrders: 3,
    totalSpent: 5200000,
    notes: 'VIP customer'
  },
  {
    id: 'u5',
    name: 'Trần Thị Bình',
    email: 'tranthib@company.com',
    phone: '0912345678',
    avatar: 'https://i.pravatar.cc/150?img=26',
    role: 'customer',
    status: 'active',
    createdDate: '2025-02-20',
    lastLogin: '2025-10-08 11:45',
    totalOrders: 2,
    totalSpent: 10480000
  },
  {
    id: 'u6',
    name: 'Lê Văn Cường',
    email: 'levanc@shop.vn',
    phone: '0923456789',
    avatar: 'https://i.pravatar.cc/150?img=60',
    role: 'customer',
    status: 'active',
    createdDate: '2025-03-10',
    lastLogin: '2025-10-07 16:20',
    totalOrders: 1,
    totalSpent: 888000
  },
  {
    id: 'u7',
    name: 'Phạm Thị Dung',
    email: 'phamthid@startup.io',
    phone: '0934567890',
    avatar: 'https://i.pravatar.cc/150?img=47',
    role: 'customer',
    status: 'active',
    createdDate: '2025-04-05',
    lastLogin: '2025-10-06 10:30',
    totalOrders: 2,
    totalSpent: 2154000
  },
  {
    id: 'u8',
    name: 'Hoàng Văn Em',
    email: 'hoangvane@tech.vn',
    phone: '0945678901',
    avatar: 'https://i.pravatar.cc/150?img=68',
    role: 'customer',
    status: 'inactive',
    createdDate: '2025-05-12',
    lastLogin: '2025-09-20 13:15',
    totalOrders: 1,
    totalSpent: 2370000,
    notes: 'Cancelled service'
  },
  {
    id: 'u9',
    name: 'Vũ Thị Phương',
    email: 'vuthiphuong@edu.vn',
    phone: '0956789012',
    avatar: 'https://i.pravatar.cc/150?img=32',
    role: 'customer',
    status: 'active',
    createdDate: '2025-03-20',
    lastLogin: '2025-10-05 09:50',
    totalOrders: 1,
    totalSpent: 758000
  },
  {
    id: 'u10',
    name: 'Đặng Văn Giang',
    email: 'dangvang@media.vn',
    phone: '0967890123',
    avatar: 'https://i.pravatar.cc/150?img=51',
    role: 'customer',
    status: 'active',
    createdDate: '2025-05-12',
    lastLogin: '2025-10-04 15:40',
    totalOrders: 2,
    totalSpent: 11658000,
    notes: 'Enterprise customer'
  },
  {
    id: 'u11',
    name: 'Ngô Thị Hà',
    email: 'ngothiha@blog.vn',
    phone: '0978901234',
    avatar: 'https://i.pravatar.cc/150?img=24',
    role: 'customer',
    status: 'suspended',
    createdDate: '2025-08-10',
    lastLogin: '2025-09-15 12:00',
    totalOrders: 0,
    totalSpent: 0,
    notes: 'Payment issues - suspended'
  },
  {
    id: 'u12',
    name: 'Bùi Văn Khoa',
    email: 'buivank@ecommerce.vn',
    phone: '0989012345',
    avatar: 'https://i.pravatar.cc/150?img=11',
    role: 'customer',
    status: 'active',
    createdDate: '2025-07-01',
    lastLogin: '2025-10-03 08:25',
    totalOrders: 1,
    totalSpent: 5270000
  }
];
