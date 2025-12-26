import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import perfilRoutes from './routes/profiles.routes.js';
import authRoutes from './routes/auth.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors()); // Permite cualquier origen (probar rápido)
app.use(express.json());

// Rutas API
app.use('/api/perfiles', perfilRoutes);
app.use('/api/auth', authRoutes);

// Servir frontend
app.use(express.static(path.join(__dirname, '../../frontend')));

// Para cualquier ruta, devolver index.html (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/profilesdb';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log('Error MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
