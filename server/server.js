import app from './src/app.js';
import envConfig from './src/configs/environment.js';
import logger from './src/utils/logger.js';
import { connectDB } from "./src/configs/database.js";


async function startServer() {
    try {
        await connectDB();
        logger.info("MongoDB connected successfully");

        app.listen(envConfig.PORT, () => {
            logger.info(`Server running on port ${envConfig.PORT} & host ${envConfig.SERVER_HOST}`)
        })
    } catch (error) {
        logger.error("Server failed to start:", error);
        process.exit(1);
    }
}

startServer();