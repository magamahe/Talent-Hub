// src/models/Category.js
import mongoose from 'mongoose';

/**
 * Categorías de perfiles (Frontend, Backend, Data, UI/UX, etc.)
 * Permite agregar nuevas sin tocar código
 */
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
