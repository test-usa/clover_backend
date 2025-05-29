import { Profile } from "./profile.model";
import { IProfile } from "./profile.interface";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import cloudinary from "../../utils/cloudinary";
import fs from "fs";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { Request } from "express";
import Review from "../review/review.model";

const createProfile = async (payload: IProfile, filePath: string, filename: string) => {
  if (filePath) {
    const fileName = filename.split(".");
    const { secure_url } = await sendImageToCloudinary(fileName[0], filePath);
    payload.imageUrl = secure_url;
  }

  const existingProfile = await Profile.findOne({ userId: payload.userId });

  if (existingProfile) {
    throw new ApiError(httpStatus.CONFLICT, "Profile already exists for this user.");
  }

  const result = await Profile.create(payload);
  return result;
};

const getAllProfiles = async (req: Request) => {
  const { name, wantedSkill, skill, location, status } = req.query;

  const profileQuery: any = {};
  const orLocation: any[] = [];

  if (name) {
    profileQuery.fullName = { $regex: name as string, $options: "i" };
  }

  if (wantedSkill) {
    profileQuery.wantedSkills = {
      $in: [new RegExp(wantedSkill as string, "i")],
    };
  }

  if (skill) {
    profileQuery.skills = {
      $in: [new RegExp(skill as string, "i")],
    };
  }

  if (location) {
    orLocation.push(
      { "location.city": { $regex: location as string, $options: "i" } },
      { "location.state": { $regex: location as string, $options: "i" } },
      { "location.country": { $regex: location as string, $options: "i" } }
    );
  }

  if (orLocation.length > 0) {
    profileQuery.$or = orLocation;
  }

  const rawProfiles = await Profile.find(profileQuery).populate({
    path: "userId",
    select: "name email role status isDeleted",
  });

  const profiles = rawProfiles.filter((p) => {
    const user = p.userId as any;
    if (!user || user.isDeleted || user.status === "blocked") return false;
    if (status && user.status !== status) return false;
    return true;
  });

  const enhancedProfiles = await Promise.all(
    profiles.map(async (profile) => {
      const userId = profile.userId._id;

      const reviewsGiven = await Review.find({ reviewer: userId })
        .populate("reviewedUser", "name email");

      const reviewsReceived = await Review.find({ reviewedUser: userId })
        .populate("reviewer", "name email");

      return {
        profile,
        user: profile.userId,
        reviewsGiven,
        reviewsReceived,
      };
    })
  );

  return enhancedProfiles;
};

const getSingleProfile = async (userId: string) => {
  const profile = await Profile.findOne({ userId }).populate({
    path: "userId",
    select: "name email role status",
  });

  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Profile not found");
  }

  const reviewsGiven = await Review.find({ reviewer: userId }).populate(
    "reviewedUser",
    "name email"
  );

  const reviewsReceived = await Review.find({ reviewedUser: userId }).populate(
    "reviewer",
    "name email"
  );

  return {
    profile,
    user: profile.userId,
    reviewsGiven,
    reviewsReceived,
  };
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
