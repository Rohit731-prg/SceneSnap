import express from 'express';
import { createActor, deleteActor, getAllActor, updateActor } from '../controller/actor.controller';

const router = express.Router();

router.get('/getAllActors', getAllActor);
router.post('/createActor', createActor);
router.delete('/deleteActor/:id', deleteActor);
router.put('/updateActor/:id', updateActor);

export default router;