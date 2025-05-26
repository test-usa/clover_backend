import express from "express";
import { ProfileController } from "./profile.controller";
import upload from "../../middleWear/uploads";
import auth from "../../middleWear/auth";


const router = express.Router();



router.post("/"
 ,upload.single("file"), auth("client"), ProfileController.createProfile);
router.patch("/:userId", upload.single("file"), ProfileController.updateProfile);
router.get("/", ProfileController.getAllProfiles);
router.get("/:userId", ProfileController.getSingleProfile);
router.delete("/:userId", ProfileController.deleteProfile);

export const ProfileRoutes = router;
