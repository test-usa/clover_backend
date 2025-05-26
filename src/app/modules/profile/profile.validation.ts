import { z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z.string().refine(val => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

export const locationSchema = z.object({
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const profileSchema = z.object({
  userId: objectIdSchema,
  fullName: z.string().trim().min(1, "Full name is required"),
  phone: z.string().trim().optional(),
  location: locationSchema.optional(),
  shortBio: z.string().trim().max(300).optional(),
  skills: z.array(z.string()).default([]),
  wantedSkills: z.array(z.string()).default([]),
  imageUrl: z.string().url().optional(),
  websiteLink: z.string().trim().url().optional(),
});
