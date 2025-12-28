import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Rutas
import perfilRoutes from './routes/profiles.routes.js';
import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/category.routes.js'; // ✅ FIX
import levelRoutes from './routes/level.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// =====================
// MIDDLEWARES
// =====================
app.use(cors({
  origin: 'https://talent-hub-m4t8.onrender.com', // ✅ sin slash
  credentials: true
}));

app.use(express.json());

// Debug
app.use('/api', (req, res, next) => {
  console.log('Request API:', req.method, req.originalUrl);
  next();
});

// =====================
// RUTAS API
// =====================
app.use('/api/perfiles', perfilRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/levels', levelRoutes);

// =====================
// FRONTEND
// =====================
const frontendPath = path.join(__dirname, '../../frontend');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// =====================
// MONGO
// =====================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
