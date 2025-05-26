import { Profile } from "./profile.model";
import { IProfile } from "./profile.interface";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import cloudinary from "../../utils/cloudinary";
import fs from "fs";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { Request } from "express";

const createProfile = async (payload: IProfile, filePath: string,filename:string) => {

  if (filePath) {
    const fileName = filename.split('.');
    const {secure_url}=  await sendImageToCloudinary(fileName[0], filePath);
    payload.imageUrl = secure_url;
  }

  const existingProfile = await Profile.findOne({ userId: payload.userId });
  
  if (existingProfile) {
    throw new ApiError(httpStatus.CONFLICT, "Profile already exists for this user.");
  }
  const result = await Profile.create(payload);
  return result;
};

export const getAllProfiles = async (req: Request) => {
  const { name, wantedSkill, skill, location, status } = req.query;

  if (Object.keys(req.query).length === 0) {
    return Profile.find();
  }

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

  if (status) {
    const statusRegex = new RegExp(status as string, "i");

    const matchStage: any = {
      "user.status": statusRegex,
      "user.isDeleted": false,
    };

    if (Object.keys(profileQuery).length > 0 || orLocation.length > 0) {
      matchStage["$expr"] = {
        $and: [],
      };

      if (profileQuery.fullName) {
        matchStage["$expr"].$and.push({
          $regexMatch: {
            input: "$fullName",
            regex: new RegExp(name as string, "i"),
          },
        });
      }

      if (profileQuery.skills) {
        matchStage["skills"] = profileQuery.skills;
      }

      if (profileQuery.wantedSkills) {
        matchStage["wantedSkills"] = profileQuery.wantedSkills;
      }

      if (orLocation.length > 0) {
        matchStage["$or"] = orLocation;
      }
    }

    const profiles = await Profile.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $match: matchStage,
      },
    ]);

    return profiles;
  }

  if (orLocation.length > 0) {
    profileQuery.$or = orLocation;
  }

  return Profile.find(profileQuery);
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
