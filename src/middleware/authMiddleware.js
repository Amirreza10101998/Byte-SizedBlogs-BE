import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, config.jwt.secretKey, (err, user) => {
            if (err) {
                console.error('Error during token verification:', err);
                return res.sendStatus(403);
            }

            console.log('User data from JWT:', user);
            req.user = user;
            next();
        });
    } else {
        console.log('Authorization header not found');
        res.sendStatus(401);
    }
};