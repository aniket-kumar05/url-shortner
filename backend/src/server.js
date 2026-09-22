import app from "./app/app.js";
import { connectDb } from "./config/db.js";
import ENV from "./config/ENV.local.js";



const startServer = async() => {
    await connectDb();

app.listen(ENV.PORT, () => {
    console.log(`server is running on port ${ENV.PORT}`);
});
}

startServer();