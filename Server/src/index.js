import express from "express";
import { connectDb } from "./Config/ConntectDB.js";
import "dotenv/config";
import cors from "cors";
import cookiePerser from "cookie-parser";
import UserRouter from "./Router/UserRouter.js";
import ActorRouter from "./Router/ActorRoute.js";

const app = express();
app.use(express.json({
    limit: "5mb"
}));
app.use(cors({
    origin: "*",
}));
app.use(cookiePerser());

app.use("/api/user", UserRouter);
app.use("/api/actor", ActorRouter);

await connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log("Database connection failed", err);
});