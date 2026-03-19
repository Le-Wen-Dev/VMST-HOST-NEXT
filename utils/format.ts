// Common formatting helpers
export function formatMoneyVN(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return '';
  const num = typeof value === 'string' ? Number(value) : value;
  if (!isFinite(num as number)) return String(value);
  try {
    return new Intl.NumberFormat('vi-VN').format(num as number);
  } catch {
    // Fallback: simple grouping
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}