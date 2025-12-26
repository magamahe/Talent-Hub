import mongoose from 'mongoose';

/**
 * Esquema de usuarios
 */
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  { timestamps: true }
);

// Exportamos como default para que la importación funcione
export default mongoose.model('User', userSchema);
