import express from "express";
import { ProfileController } from "./profile.controller";
import upload from "../../middleWear/uploads";
import auth from "../../middleWear/auth";
import USER_ROLE from "../../constants/userRole";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 * 
 *       properties:
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *
 *     Profile:
 *       type: object
 *       required:
 *         - userId
 *         - fullName
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         fullName:
 *           type: string
 *         phone:
 *           type: string
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         shortBio:
 *           type: string
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *         wantedSkills:
 *           type: array
 *           items:
 *             type: string
 *         imageUrl:
 *           type: string
 *         websiteLink:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               shortBio:
 *                 type: string
 *               websiteLink:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               wantedSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *               location.city:
 *                 type: string
 *               location.state:
 *                 type: string
 *               location.country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profile created successfully
 */
router.post("/", upload.single("file"), auth(USER_ROLE.client, USER_ROLE.admin), ProfileController.createProfile);

/**
 * @swagger
 * /profiles/{userId}:
 *   patch:
 *     summary: Update a profile by userId
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               shortBio:
 *                 type: string
 *               websiteLink:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               wantedSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *               location.city:
 *                 type: string
 *               location.state:
 *                 type: string
 *               location.country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.patch("/:userId", upload.single("file"), ProfileController.updateProfile);

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Get all profiles
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: List of all profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 */
router.get("/", ProfileController.getAllProfiles);

/**
 * @swagger
 * /profiles/{userId}:
 *   get:
 *     summary: Get a single profile
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */
router.get("/:userId", ProfileController.getSingleProfile);

/**
 * @swagger
 * /profiles/{userId}:
 *   delete:
 *     summary: Delete a profile
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Profile deleted successfully
 */
router.delete("/:userId", ProfileController.deleteProfile);

export const ProfileRoutes = router;
