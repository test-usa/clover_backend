import { Schema, model } from 'mongoose';

export interface TOtp {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema = new Schema<TOtp>({
  email: {
    type: String,
    required: true,
    unique: true, // one OTP per email
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // ⏳ expires after 10 minutes (600 seconds)
  },
});

export const Otp = model<TOtp>('Otp', otpSchema);
