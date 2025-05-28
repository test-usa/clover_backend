// enums/paymentStatus.enum.ts

export enum PaymentStatus {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  REFUNDED = "REFUNDED"
}

export function serializeMetadata(obj: Record<string, any>): Record<string, string | number | null> {
  const metadata: Record<string, string | number | null> = {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string' || typeof value === 'number' || value === null) {
      metadata[key] = value;
    } else if (typeof value === 'boolean') {
      metadata[key] = value ? 'true' : 'false';
    } else if (value instanceof Date) {
      metadata[key] = value.toISOString();
    } else if (typeof value === 'object' && value?.toString) {
      metadata[key] = value.toString();
    }
  }

  return metadata;
}
