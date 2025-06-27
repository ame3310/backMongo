const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../users/user.model');

const registerUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error('Todos los campos son obligatorios');
  }

  const existing = await User.findOne({ email });
  if (existing) throw new Error('El correo ya está registrado');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  return {
    message: 'Usuario registrado correctamente',
    userId: user._id,
  };
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email y contraseña obligatorios');
  }

  const user = await User.findOne({ email });
  if (!user) throw new Error('Credenciales inválidas');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Credenciales inválidas');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return {
    message: 'Login exitoso',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  };
};

module.exports = { registerUser, loginUser };
