import { pb } from './pocketbase';

export type VoucherRecord = {
  id: string;
  code_giam_gia: string;
  dieu_kien?: string;
  ten_chien_dich?: string;
  gia_tri: string; // Có thể là số phần trăm hoặc số tiền
  don_toi_thieu?: string; // Đơn tối thiểu
  so_luong?: string; // Số lượng voucher
  da_dung?: string; // Đã dùng
  created?: string;
  updated?: string;
};

export interface VoucherCreateInput {
  code_giam_gia: string;
  dieu_kien?: string;
  ten_chien_dich?: string;
  gia_tri: string;
  don_toi_thieu?: string;
  so_luong?: string;
  da_dung?: string;
}

export interface VoucherUpdateInput {
  code_giam_gia?: string;
  dieu_kien?: string;
  ten_chien_dich?: string;
  gia_tri?: string;
  don_toi_thieu?: string;
  so_luong?: string;
  da_dung?: string;
}

export interface ListVouchersParams {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
}

export async function listVouchers(params?: ListVouchersParams): Promise<{
  items: VoucherRecord[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}> {
  try {
    const page = params?.page || 1;
    const perPage = params?.perPage || 50;
    const sort = params?.sort || '-created';
    const filter = params?.filter || '';

    const result = await pb.collection('vochers').getList(page, perPage, {
      sort,
      filter,
    });

    return {
      items: result.items as VoucherRecord[],
      page: result.page,
      perPage: result.perPage,
      totalPages: result.totalPages,
      totalItems: result.totalItems,
    };
  } catch (error: any) {
    console.error('Error listing vouchers:', error);
    throw new Error(error?.message || 'Không thể tải danh sách voucher');
  }
}

export async function getVoucherById(id: string): Promise<VoucherRecord> {
  try {
    const record = await pb.collection('vochers').getOne(id);
    return record as VoucherRecord;
  } catch (error: any) {
    console.error('Error getting voucher:', error);
    throw new Error(error?.message || 'Không thể lấy thông tin voucher');
  }
}

export async function getVoucherByCode(code: string): Promise<VoucherRecord | null> {
  try {
    const records = await listVouchers({
      filter: `code_giam_gia = "${code.toUpperCase()}"`,
      perPage: 1,
    });
    return records.items.length > 0 ? records.items[0] : null;
  } catch (error: any) {
    console.error('Error getting voucher by code:', error);
    return null;
  }
}

export async function createVoucher(input: VoucherCreateInput): Promise<VoucherRecord> {
  try {
    const data = {
      code_giam_gia: input.code_giam_gia.toUpperCase(),
      dieu_kien: input.dieu_kien || '',
      ten_chien_dich: input.ten_chien_dich || '',
      gia_tri: input.gia_tri,
      don_toi_thieu: input.don_toi_thieu || '0',
      so_luong: input.so_luong || '0',
      da_dung: input.da_dung || '0',
    };

    const record = await pb.collection('vochers').create(data);
    return record as VoucherRecord;
  } catch (error: any) {
    console.error('Error creating voucher:', error);
    const data = error?.data?.data || error?.data;
    if (data && typeof data === 'object') {
      const messages: string[] = [];
      for (const key of Object.keys(data)) {
        const field = (data as any)[key];
        const msg = field?.message || field;
        if (msg) messages.push(`${key}: ${msg}`);
      }
      if (messages.length) {
        throw new Error(messages.join(', '));
      }
    }
    throw new Error(error?.message || 'Không thể tạo voucher');
  }
}

export async function updateVoucher(id: string, input: VoucherUpdateInput): Promise<VoucherRecord> {
  try {
    const updateData: any = {};
    if (input.code_giam_gia !== undefined) updateData.code_giam_gia = input.code_giam_gia.toUpperCase();
    if (input.dieu_kien !== undefined) updateData.dieu_kien = input.dieu_kien;
    if (input.ten_chien_dich !== undefined) updateData.ten_chien_dich = input.ten_chien_dich;
    if (input.gia_tri !== undefined) updateData.gia_tri = input.gia_tri;
    if (input.don_toi_thieu !== undefined) updateData.don_toi_thieu = input.don_toi_thieu;
    if (input.so_luong !== undefined) updateData.so_luong = input.so_luong;
    if (input.da_dung !== undefined) updateData.da_dung = input.da_dung;

    const record = await pb.collection('vochers').update(id, updateData);
    return record as VoucherRecord;
  } catch (error: any) {
    console.error('Error updating voucher:', error);
    const data = error?.data?.data || error?.data;
    if (data && typeof data === 'object') {
      const messages: string[] = [];
      for (const key of Object.keys(data)) {
        const field = (data as any)[key];
        const msg = field?.message || field;
        if (msg) messages.push(`${key}: ${msg}`);
      }
      if (messages.length) {
        throw new Error(messages.join(', '));
      }
    }
    throw new Error(error?.message || 'Không thể cập nhật voucher');
  }
}

export async function deleteVoucher(id: string): Promise<void> {
  try {
    await pb.collection('vochers').delete(id);
  } catch (error: any) {
    console.error('Error deleting voucher:', error);
    throw new Error(error?.message || 'Không thể xóa voucher');
  }
}

// Validate và tính toán giảm giá
export function calculateVoucherDiscount(voucher: VoucherRecord, subtotal: number): {
  isValid: boolean;
  discount: number;
  error?: string;
} {
  // Kiểm tra đơn tối thiểu
  const minOrder = parseFloat(voucher.don_toi_thieu || '0');
  if (subtotal < minOrder) {
    return {
      isValid: false,
      discount: 0,
      error: `Đơn hàng tối thiểu ${minOrder.toLocaleString('vi-VN')}₫`,
    };
  }

  // Kiểm tra số lượng còn lại
  const totalQty = parseInt(voucher.so_luong || '0');
  const usedQty = parseInt(voucher.da_dung || '0');
  if (usedQty >= totalQty && totalQty > 0) {
    return {
      isValid: false,
      discount: 0,
      error: 'Mã voucher đã hết lượt sử dụng',
    };
  }

  // Tính toán giảm giá
  let discount = 0;
  const giaTri = voucher.gia_tri || '0';
  
  // Kiểm tra nếu là phần trăm (có dấu %)
  if (giaTri.includes('%')) {
    const percentage = parseFloat(giaTri.replace('%', ''));
    discount = (subtotal * percentage) / 100;
  } else {
    // Giảm giá cố định
    discount = parseFloat(giaTri);
  }

  // Đảm bảo discount không vượt quá subtotal
  discount = Math.min(discount, subtotal);

  return {
    isValid: true,
    discount,
  };
}

