import { Otp } from "./otp.model";


  

export const storeOtp = async (email: string, otp: string) => {
  await Otp.findOneAndUpdate(
    { email },
    { otp, createdAt: new Date() },
    { upsert: true, new: true }
  );
};


