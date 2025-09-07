import express from "express";
import { upload } from "../Middleware/Multer.js";
import { getAllActors, registerActor } from "../Controller/ActorController.js";
import { verifyToken } from "../Middleware/JwtMiddleware.js";

const router = express.Router();

router.post("/register", upload.single("profile"), verifyToken, registerActor);
router.get("/all", verifyToken, getAllActors);

export default router;