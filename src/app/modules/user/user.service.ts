import config from "../../config";
import ApiError from "../../errors/ApiError";
import { generateOtp, sendEmail } from "../../utils/sendEmail";
import { storeOtp } from "../../utils/store.otp";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import httpStatus from "http-status";

const getAllUsersFromDB = async () => {
  const result = await User.find({ isDeleted: false });
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const deletedOrBlockedUser = await User.findOne({
    _id: id,
    isDeleted: false,
    status: { $ne: "blocked" },
  });
  if (!deletedOrBlockedUser)
    throw new ApiError(httpStatus.FORBIDDEN, "Failed to Fetch user");

  const result = await User.findById(id);
  return result;
};

// const createAUserIntoDB = async (payload: TUser) => {
//   const existingUser = await User.findOne({
//     email: payload.email,
//   });
//   if (existingUser) {
//     throw new ApiError(
//       httpStatus.CONFLICT,
//       "User with this email already exists"
//     );
//   }
//   const newHashedPassword = await bcrypt.hash(
//     payload?.password,
//     Number(config.bcrypt_salt_rounds)
//   );
//   payload.password = newHashedPassword;

//   const result = await User.create(payload);
//   return result;
// };


const createAUserIntoDB = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'User with this email already exists');
  }

  const newHashedPassword = await bcrypt.hash(
    payload?.password,
    Number(config.bcrypt_salt_rounds)
  );
  payload.password = newHashedPassword;

  const result = await User.create(payload);

  // ✅ Generate 6-digit OTP
  const otp = generateOtp();

  // ✅ Store OTP (you can also store it in DB or Redis with expiry)
  await storeOtp(payload.email, otp); // implement this logic

  // ✅ Send email
  const html = `<p>Your verification code is: <b>${otp}</b></p>`;
  await sendEmail(payload.email, html);

  return {
    message: 'User created. Verification OTP sent to email.',
    user: result,
  };
};

export const UserServices = {
  getSingleUserFromDB,
  getAllUsersFromDB,
  createAUserIntoDB,
};
