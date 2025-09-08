import express from "express";
import { upload, uploadImage } from "../Middleware/Multer.js";
import { login, registerUser, verifyUser } from "../Controller/UserController.js";

const router = express.Router();

router.post("/register", upload.single("profile"), uploadImage,  registerUser);
router.post("/verify", verifyUser);
router.post("/login", login);

export default router;