import Level from '../models/level.js';

export const createLevel = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Nombre obligatorio' });

    const existing = await Level.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Nivel ya existe' });

    const newLevel = await Level.create({ name });
    res.status(201).json(newLevel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLevels = async (req, res) => {
  try {
    const levels = await Level.find();
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
