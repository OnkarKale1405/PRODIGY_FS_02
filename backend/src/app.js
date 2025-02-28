import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// console.log(process.env.CORS_ORIGIN);
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));
app.use(express.static("public"));
app.use(cookieParser())

// routes import 
import userRouter from "./routes/user.routes.js"
import adminRouter from "./routes/admin.routes.js"
import employeeRouter from "./routes/employee.routes.js"

// routes declaration
app.use("/api/auth", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/employee", employeeRouter);

export { app };