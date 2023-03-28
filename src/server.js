import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config/index.js";
import cookieParser from "cookie-parser";

import loginRouter from "./routes/loginRoutes.js";
import registerRouter from "./routes/registerRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import postRouter from "./routes/postRoutes.js";



const server = express();

/*---------- MIDDLEWARES ----------*/
server.use(cors({
    origin: 'http://localhost:3002',
    credentials: true
}));

server.use(express.json());
server.use(cookieParser());

/*---------- ENDPOINTS ----------*/
server.use("/register", registerRouter);
server.use("/login", loginRouter);
server.use("/profile", profileRouter)
server.use("/post", postRouter);

/*---------- ERRORHANDLERS ----------*/

mongoose.connect(config.db.url);

mongoose.connection.on("connected", () => {
    console.log("connected to mongoDB");
    server.listen(config.server.port, () => {
        console.table(listEndpoints(server));
        console.log(`server is running on ${config.server.port}`);;
    });
});