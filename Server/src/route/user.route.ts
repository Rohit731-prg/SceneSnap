import express from 'express';
import { Login } from '../controller/user.controller';

const router = express.Router();

router.post('/login', Login);

export default router;