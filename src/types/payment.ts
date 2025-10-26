export type PaymentMethod = 'sepay' | 'vnpay' | 'zalopay' | 'bank_transfer' | 'cash';

export type PaymentStatus =
  | 'PENDING'
  | 'PAID'
  | 'CONFIRMED'
  | 'EXPIRED'
  | 'FAILED'
  | 'REVIEW'
  | 'REFUNDED';

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'provisioned'
  | 'cancelled';

export interface PaymentIntent {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionRef: string | null;
  qrUrl: string | null;
  qrImage: string | null;
  deepLink: string | null;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SePayConfig {
  merchantId: string;
  clientId: string;
  apiKey: string;
  secretKey: string;
  callbackUrl: string;
  returnUrl: string;
  isSandbox: boolean;
}

export interface SePayCreatePaymentRequest {
  orderId: string;
  amount: number;
  description: string;
  returnUrl: string;
  callbackUrl: string;
  expiresIn?: number;
}

export interface SePayCreatePaymentResponse {
  success: boolean;
  transactionRef: string;
  qrUrl: string;
  qrImage: string;
  deepLink?: string;
  expiresAt: string;
}

export interface SePayWebhookPayload {
  transactionRef: string;
  orderId: string;
  amount: number;
  status: 'SUCCESS' | 'FAILED';
  bankCode: string;
  transactionTime: string;
  signature: string;
  rawData: any;
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  paymentIntentId: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  transactionRef: string | null;
  webhookPayload: any;
  signatureValid: boolean;
  errorMessage: string | null;
  processedAt: string | null;
  createdAt: string;
  statusHistory: PaymentStatusChange[];
}

export interface PaymentStatusChange {
  from: PaymentStatus;
  to: PaymentStatus;
  reason: string;
  timestamp: string;
  actor: string;
}

export interface Order {
  id: string;
  userId: string;
  productName: string;
  amount: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}
