import type {
  SePayConfig,
  SePayCreatePaymentRequest,
  SePayCreatePaymentResponse,
  SePayWebhookPayload
} from '../types/payment';

const SEPAY_API_URL = import.meta.env.VITE_SEPAY_API_URL || 'https://api.sepay.vn/v1';

export class SePayService {
  private config: SePayConfig;

  constructor(config: SePayConfig) {
    this.config = config;
  }

  async createPayment(request: SePayCreatePaymentRequest): Promise<SePayCreatePaymentResponse> {
    try {
      const expiresIn = request.expiresIn || 15 * 60;
      const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

      const payload = {
        merchant_id: this.config.merchantId,
        client_id: this.config.clientId,
        order_id: request.orderId,
        amount: request.amount,
        description: request.description,
        return_url: request.returnUrl,
        callback_url: request.callbackUrl,
        expires_in: expiresIn
      };

      const signature = this.generateSignature(payload);

      const response = await fetch(`${SEPAY_API_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.config.apiKey,
          'X-Signature': signature
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`SePay API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (this.config.isSandbox) {
        return this.generateMockQR(request, expiresAt);
      }

      return {
        success: true,
        transactionRef: data.transaction_ref,
        qrUrl: data.qr_url,
        qrImage: data.qr_image,
        deepLink: data.deep_link,
        expiresAt
      };
    } catch (error) {
      console.error('SePay createPayment error:', error);

      if (this.config.isSandbox) {
        return this.generateMockQR(request, new Date(Date.now() + 15 * 60 * 1000).toISOString());
      }

      throw error;
    }
  }

  verifyWebhookSignature(payload: SePayWebhookPayload): boolean {
    const { signature, ...data } = payload;
    const expectedSignature = this.generateSignature(data);
    return signature === expectedSignature;
  }

  private generateSignature(data: any): string {
    const sortedKeys = Object.keys(data).sort();
    const signatureString = sortedKeys
      .map(key => `${key}=${data[key]}`)
      .join('&');

    return this.hmacSHA256(signatureString, this.config.secretKey);
  }

  private hmacSHA256(message: string, secret: string): string {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(message);

    return btoa(String.fromCharCode(...new Uint8Array(messageData)));
  }

  private generateMockQR(request: SePayCreatePaymentRequest, expiresAt: string): SePayCreatePaymentResponse {
    const transactionRef = `MOCK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const qrContent = `ORDER:${request.orderId}|AMOUNT:${request.amount}|REF:${transactionRef}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrContent)}`;

    return {
      success: true,
      transactionRef,
      qrUrl,
      qrImage: qrUrl,
      deepLink: `banking://transfer?content=${encodeURIComponent(qrContent)}`,
      expiresAt
    };
  }

  async simulateWebhook(orderId: string, amount: number, status: 'SUCCESS' | 'FAILED'): Promise<void> {
    if (!this.config.isSandbox) {
      throw new Error('Webhook simulation only available in sandbox mode');
    }

    const payload: SePayWebhookPayload = {
      transactionRef: `MOCK_${Date.now()}`,
      orderId,
      amount,
      status,
      bankCode: 'MOCK_BANK',
      transactionTime: new Date().toISOString(),
      signature: 'mock_signature',
      rawData: {
        test: true,
        simulatedAt: new Date().toISOString()
      }
    };

    await fetch(this.config.callbackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }
}

export const sePayConfig: SePayConfig = {
  merchantId: import.meta.env.VITE_SEPAY_MERCHANT_ID || 'MOCK_MERCHANT',
  clientId: import.meta.env.VITE_SEPAY_CLIENT_ID || 'MOCK_CLIENT',
  apiKey: import.meta.env.VITE_SEPAY_API_KEY || 'mock_api_key',
  secretKey: import.meta.env.VITE_SEPAY_SECRET_KEY || 'mock_secret_key',
  callbackUrl: import.meta.env.VITE_SEPAY_CALLBACK_URL || 'http://localhost:5173/api/payments/webhook',
  returnUrl: import.meta.env.VITE_SEPAY_RETURN_URL || 'http://localhost:5173/order-confirmation',
  isSandbox: import.meta.env.VITE_SEPAY_SANDBOX === 'true' || true
};

export const sePayService = new SePayService(sePayConfig);
