import express from 'express';
import { getALLUser, Login } from '../controller/user.controller';

const router = express.Router();

router.post('/login', Login);
router.get('/getAllUsers', getALLUser);

export default router;