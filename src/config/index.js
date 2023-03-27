import dotenv from 'dotenv';

dotenv.config();

const config = {
    db: {
        url: process.env.MONGO_URL,
    },
    server: {
        port: process.env.PORT,
    },
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY,
    },
    session: {
        secret: process.env.SESSION_SECRET,
    },
    cloudinary: {
        url: process.env.CLOUDINARY_URL,
    },
};

export default config;
