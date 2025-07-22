import express from 'express';
import { allProps, createprops, UpdateProps } from '../controller/props.controller';

const router = express.Router();

router.post('/createprops', createprops);
router.get('/getAllprops', allProps);
router.put('/updateProps', UpdateProps);

export default router;