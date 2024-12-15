import dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import connectDB from './db/index.js';
import { app } from './app.js';

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Get the number of available CPU cores
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`⚙️ Master process ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`⚙️ Worker ${worker.process.pid} exited. Forking a new worker...`);
        cluster.fork();
    });
} else {
    connectDB()
        .then(() => {
            app.listen(process.env.PORT || 8000, () => {
                console.log(`⚙️ Worker ${process.pid} is running at port: ${process.env.PORT}`);
            });
        })
        .catch((err) => {
            console.error('MONGO DB connection failed:', err);
            process.exit(1);
        });

    // Add error handling for uncaught exceptions and unhandled rejections
    process.on('uncaughtException', (err) => {
        console.error('Uncaught Exception:', err);
        process.exit(1);
    });

    process.on('unhandledRejection', (err) => {
        console.error('Unhandled Rejection:', err);
        process.exit(1);
    });
}
