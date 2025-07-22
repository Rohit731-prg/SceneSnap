import express from 'express';
import cors from 'cors';
import { connectDB } from './config/connectDB';
import 'dotenv/config';
import UserRoute from './route/project.route';
import ProjectRoute from './route/project.route';
import PropsRoute from './route/props.route';
import ActorRoute from './route/actor.route';
import SceneRoute from './route/scene.route';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/users', UserRoute);
app.use('/api/projects', ProjectRoute);
app.use('/api/props', PropsRoute);
app.use('/api/actors', ActorRoute);
app.use('/api/scenes', SceneRoute);

connectDB()

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});