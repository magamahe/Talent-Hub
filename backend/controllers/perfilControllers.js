const Perfil = require('../models/perfil');

exports.obtenerPerfiles = async (req, res) => {
  const perfiles = await Perfil.find().sort({ createdAt: -1 });
  res.json(perfiles);
};

exports.crearPerfil = async (req, res) => {
  const nuevo = new Perfil(req.body);
  await nuevo.save();
  res.json(nuevo);
};

exports.actualizarPerfil = async (req, res) => {
  const actualizado = await Perfil.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
};

exports.eliminarPerfil = async (req, res) => {
  await Perfil.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Perfil eliminado' });
};