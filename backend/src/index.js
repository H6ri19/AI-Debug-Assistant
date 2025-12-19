// // src/index.js
// import passport from './config/passport.js';
// import dotenv from 'dotenv'; // ✅ Load env first
// dotenv.config();
// import connectDB from './db.js';
// connectDB(); // ✅ Connect to MongoDB
// import express from 'express';
// app.use(passport.initialize());
// import http from 'http';
// import cors from 'cors';
// import { Server as IOServer } from 'socket.io';

// // Routes (after dotenv is loaded)
// import authRoutes from './routes/auth.js';
// import fileRoutes from './routes/files.js';
// import agentRoutes from './routes/agent.js';
// import initSockets from './sockets.js';

// if (!process.env.OPENAI_API_KEY) {
//   console.warn('⚠️  OPENAI_API_KEY is missing. AI routes will fail.');
// }

// const app = express();
// const server = http.createServer(app);

// const io = new IOServer(server, {
//   cors: {
//     origin: '*', // 🔒 later restrict to your frontend URL
//     methods: ['GET', 'POST'],
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/files', fileRoutes);
// app.use('/api/agent', agentRoutes);

// // WebSocket setup
// initSockets(io);

// // Start server
// const PORT = process.env.PORT || 8000;
// server.listen(PORT, () => {
//   console.log(`✅ Backend running on http://localhost:${PORT}`);
// });

// src/index.js
// ✅ MUST be first
// src/index.js
import './env.js';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as IOServer } from 'socket.io';

import connectDB from './db.js';
import passport from './config/passport.js';

import authRoutes from './routes/auth.js';
import fileRoutes from './routes/files.js';
import agentRoutes from './routes/agent.js';
import initSockets from './sockets.js';

// DB
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.io
const io = new IOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Passport (ONLY ONCE)
app.set('passport', passport);
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/agent', agentRoutes);

// WebSockets
initSockets(io);

// Start
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
