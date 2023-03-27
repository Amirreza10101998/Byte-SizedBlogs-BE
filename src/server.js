import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const server = express();
const port = process.env.PORT

/*---------- MIDDLEWARES ----------*/
server.use(cors({
    origin: 'http://localhost:3003',
    credentials: true
}));

server.use(express.json());
server.use(cookieParser());

/*---------- ENDPOINTS ----------*/

/*---------- ERRORHANDLERS ----------*/

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
    console.log("connected to mongoDB");
    server.listen(port, () => {
        console.table(listEndpoints(server));
        console.log(`server is running on ${port}`);;
    });
});