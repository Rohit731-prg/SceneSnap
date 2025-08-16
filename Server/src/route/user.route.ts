import express from 'express';
import { createUser, getALLUser, Login, verifyOTPAndJWT } from '../controller/user.controller';

const router = express.Router();

router.post('/login', Login);
router.get('/getAllUsers', getALLUser);
router.post('/createUser', createUser);
router.post('/otp',  verifyOTPAndJWT)

export default router;