import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js"
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import couponRoute from "./routes/couponRoute.js"
import paymentRoute from "./routes/paymentRoute.js"
import orderRoute from "./routes/orderRoute.js"
import cookieParser from "cookie-parser";

import { isSpoofedBot } from "@arcjet/inspect"; //for rate limiting later

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //for destructoring req.body
app.use(cookieParser());

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [process.env.CLIENT_URL, 'http://10.0.0.135:5173'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));    //for not blocking request from different origin, need to research more to understand
app.use(helmet()); //basically provide extra security that helps you protect your app by setting various HTTP headers
app.use(morgan("dev"));

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/order", orderRoute);

app.listen(PORT, () => {
    console.log(`Server is currently running on ${PORT}`)
})
