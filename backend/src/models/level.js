import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

export default mongoose.model('Level', levelSchema);
