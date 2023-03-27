import dotenv from 'dotenv';

dotenv.config();

const config = {
    db: {
        url: process.env.MONGO_URL
    },

    server: {
        port: process.env.PORT
    }

}

export default config;
