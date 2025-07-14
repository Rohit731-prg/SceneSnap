import express from 'express';
import cors from 'cors';
import { connectDB } from './config/connectDB';
import 'dotenv/config';
import UserRoute from '../src/route/user.route';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoute);

connectDB()

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});