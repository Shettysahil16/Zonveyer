import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './SocketIO/server.js';

// ✅ Load environment variables first
dotenv.config();

//const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
}));
const PORT = 5002;

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use('/api', router);

// ✅ Connect to DB and then start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log('✅ MongoDB connected');
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
  });
