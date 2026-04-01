import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import meetingRoutes from './routes/meetingRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = createServer(app);

// Socket.io initialization for Real-Time features
const io = new Server(server, {
  cors: {
    origin: '*', // To be restricted in production
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Core Routes (Phase 1-2)
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);

// Socket Listeners
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  
  // Future Room Logic
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Root Health Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'IntellMeet Backend' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
