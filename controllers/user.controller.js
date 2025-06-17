const db = require('../models');
const User = db.User;

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json(users);
};

exports.findOne = async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
  if (!user) return res.status(404).json({ message: 'No encontrado' });
  res.json(user);
};

exports.update = async (req, res) => {
  await User.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Usuario actualizado' });
};

exports.delete = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Usuario eliminado' });
};
