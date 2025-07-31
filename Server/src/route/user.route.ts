import express from 'express';
import { createUser, getALLUser, Login } from '../controller/user.controller';

const router = express.Router();

router.post('/login', Login);
router.get('/getAllUsers', getALLUser);
router.post('/createUser', createUser);

export default router;