import dotenv from "dotenv";
dotenv.config();


const ENV = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT
}

export default ENV