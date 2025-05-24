import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken, verifyToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    "+password"
  );
  console.log(user, payload);

  // Check if user exists
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // Check if user is deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, "User is deleted!");
  }

  // Check if user is blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new ApiError(httpStatus.FORBIDDEN, "User is blocked!");
  }

  // Check if password is correct
  if (!(await bcrypt.compare(payload?.password, user?.password))) {
    throw new ApiError(httpStatus.FORBIDDEN, "Password did not match!");
  }

  //----------------Create jsonwebtoken and send to the client-----------------
  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };

  //++++++++++++++++   ACCESS TOKEN   ++++++++++++++++
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    parseInt(config.jwt_access_expires_in as string)
  );
  //++++++++++++++++   Refresh TOKEN   ++++++++++++++++
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    parseInt(config.jwt_refresh_expires_in as string)
  );
  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.findById(userData.userId).select("+password");

  // Check if user exists
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // Check if user is deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, "User is deleted!");
  }

  // Check if user is blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new ApiError(httpStatus.FORBIDDEN, "User is blocked!");
  }

  // Check if password is correct
  if (!(await bcrypt.compare(payload?.oldPassword, user?.password))) {
    throw new ApiError(httpStatus.FORBIDDEN, "Password did not match!");
  }

  // Hash new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      _id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
    }
  );
  return null; // No need to send password as response. That's why we did not assign update operation in result variable too
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId, iat } = decoded;

  // checking if the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    parseInt(config.jwt_access_expires_in as string)
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (email: string) => {
  // checking if the user exists
  console.log(email);
  console.log(await User.find());
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    1000 * 60 * 10 // 10 minutes
  );
  const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`;
  console.log(resetUILink);
  sendEmail(user?.email, resetUILink);
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};
