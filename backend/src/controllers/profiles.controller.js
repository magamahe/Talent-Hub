import Profile from '../models/profiles.js';
import Category from '../models/category.js';
import Level from '../models/level.js';

// Crear un nuevo perfil
export const createProfile = async (req, res) => {
  try {
    const { name, title, category, level, avatar } = req.body;

    // Validar category y level
    const cat = await Category.findById(category);
    const lev = await Level.findById(level);
    if (!cat || !lev) return res.status(400).json({ message: 'Categoría o nivel inválido' });

    const newProfile = await Profile.create({ name, title, category, level, avatar });
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear perfil', error: err.message });
  }
};

// Listar todos los perfiles
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('category', 'name')
      .populate('level', 'name');
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener perfiles', error: err.message });
  }
};

// Actualizar perfil
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, category, level, avatar } = req.body;

    const cat = await Category.findById(category);
    const lev = await Level.findById(level);
    if (!cat || !lev) return res.status(400).json({ message: 'Categoría o nivel inválido' });

    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { name, title, category, level, avatar },
      { new: true }
    );

    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar perfil', error: err.message });
  }
};

// Eliminar perfil
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    await Profile.findByIdAndDelete(id);
    res.json({ message: 'Perfil eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar perfil', error: err.message });
  }
};
