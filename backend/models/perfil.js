const mongoose = require('mongoose');

const PerfilSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  seniority: { type: String, required: true },
  avatar: { type: String, default: 'https://i.pravatar.cc/150' }
}, { timestamps: true });

module.exports = mongoose.model('Perfil', PerfilSchema);