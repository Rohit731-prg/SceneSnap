import express from 'express';
import { allProject, createProject, getProjectsByOwner } from '../controller/project.controller';

const router = express.Router();

router.post('/createProject', createProject);
router.get('/getALLProjects', allProject);
router.post('/getProjectByOwner/:id', getProjectsByOwner);

export default router;