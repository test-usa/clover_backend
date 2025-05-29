import { Request, Response } from "express";
import { ProfileService } from "./profile.service";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProfile = catchAsync(async (req: Request , res: Response) => {
  const filePath = req.file?.path;
  const payload = req.body
  payload.skills = payload.skills || "[]";
  payload.wantedSkills = payload.wantedSkills || "[]";
  payload.location = JSON.parse(payload.location) || "{}";
  payload.userId = req.user.userId;

  const result = await ProfileService.createProfile(payload, filePath as string, req.file?.originalname as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Profile created successfully",
    data: result,
  });
});

const getAllProfiles = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getAllProfiles(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profiles retrieved successfully",
    data: result,
  });
});

const getSingleProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await ProfileService.getSingleProfile(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const filePath = req.file?.path;
  const updatedData = req.body;

  if (updatedData.skills) updatedData.skills = JSON.parse(updatedData.skills);
  if (updatedData.wantedSkills) updatedData.wantedSkills = JSON.parse(updatedData.wantedSkills);
  if (updatedData.location) updatedData.location = JSON.parse(updatedData.location);

  const result = await ProfileService.updateProfile(userId, updatedData, filePath);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const deleteProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await ProfileService.deleteProfile(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile deleted successfully",
    data: result,
  });
});

export const ProfileController = {
  createProfile,
  getAllProfiles,
  getSingleProfile,
  updateProfile,
  deleteProfile,
};
