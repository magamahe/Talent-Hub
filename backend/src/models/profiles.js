import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    level: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true },
    avatar: { type: String } // URL opcional
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
