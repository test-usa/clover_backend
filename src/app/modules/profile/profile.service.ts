import { Profile } from "./profile.model";
import { IProfile } from "./profile.interface";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import cloudinary from "../../utils/cloudinary";
import fs from "fs";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createProfile = async (payload: IProfile, filePath: string,filename:string) => {
    
  console.log(filePath)
  if (filePath) {
    
    console.log(filePath,filename)
    const {secure_url}=  await sendImageToCloudinary("sk",filePath)
    payload.imageUrl = secure_url;

   
  }

  const existingProfile = await Profile.findOne({ userId: payload.userId });
  if (existingProfile) {
    throw new ApiError(httpStatus.CONFLICT, "Profile already exists for this user.");
  }
  console.log(payload)
  const result = await Profile.create(payload);
  return result;
};

const getAllProfiles = async () => {
  return Profile.find({});
};

const getSingleProfile = async (userId: string) => {
  const profile = await Profile.findOne({ userId });
  if (!profile) throw new ApiError(httpStatus.NOT_FOUND, "Profile not found");
  return profile;
};

const updateProfile = async (
  userId: string,
  updatedData: Partial<IProfile>,
  filePath?: string
) => {
  const profile = await Profile.findOne({ userId });
  if (!profile) throw new ApiError(httpStatus.NOT_FOUND, "Profile not found");

  if (filePath) {
    const cloudinaryRes = await cloudinary.uploader.upload(filePath, {
      folder: "profile-images",
      resource_type: "image",
    });
    updatedData.imageUrl = cloudinaryRes.secure_url;
    fs.unlinkSync(filePath);
  }

  const updatedProfile = await Profile.findOneAndUpdate({ userId }, updatedData, {
    new: true,
  });
  return updatedProfile;
};

const deleteProfile = async (userId: string) => {
  const profile = await Profile.findOneAndDelete({ userId });
  if (!profile) throw new ApiError(httpStatus.NOT_FOUND, "Profile not found");
  return profile;
};

export const ProfileService = {
  createProfile,
  getAllProfiles,
  getSingleProfile,
  updateProfile,
  deleteProfile,
};
