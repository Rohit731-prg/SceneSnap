import express from "express";
import { createScene, deleteScene, getAllScene, updateStatus } from "../controller/scene.controller";

const router = express.Router();

router.post('/createScene', createScene);
router.get('/getAllScenes', getAllScene);
router.delete('/deleteScene/:id', deleteScene);
router.put('/updateStatus/:id', updateStatus);

export default router;