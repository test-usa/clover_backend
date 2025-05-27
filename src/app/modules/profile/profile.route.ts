import express from "express";
import { ProfileController } from "./profile.controller";
import upload from "../../middleWear/uploads";
import auth from "../../middleWear/auth";
import USER_ROLE from "../../constants/userRole";


const router = express.Router();



router.post("/", upload.single("file"), auth(USER_ROLE.client, USER_ROLE.admin), ProfileController.createProfile);
router.patch("/:userId", upload.single("file"), ProfileController.updateProfile);
router.get("/", ProfileController.getAllProfiles);
router.get("/:userId", ProfileController.getSingleProfile);
router.delete("/:userId", ProfileController.deleteProfile);

export const ProfileRoutes = router;
