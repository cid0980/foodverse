const HttpError = require('../utils/httpError');
const { signToken } = require('../utils/jwt');
const userRepo = require('../repositories/userRepository');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const allowedRoles = ['customer', 'vendor', 'delivery_partner', 'admin'];

const register = async ({ name, email: rawEmail, password, role }) => {
  const email = typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : rawEmail;
  if (!name || !email || !password) {
    throw new HttpError(400, 'Name, email, and password are required');
  }
  if (!emailRegex.test(email)) {
    throw new HttpError(400, 'Invalid email address');
  }
  if (role && !allowedRoles.includes(role)) {
    throw new HttpError(400, 'Invalid role');
  }

  const exists = await userRepo.findByEmail(email);
  if (exists) {
    throw new HttpError(409, 'Email already in use');
  }

  const user = await userRepo.createUser({ name, email, password, role });
  const token = signToken(user);
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

const login = async ({ email: rawEmail, password }) => {
  const email = typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : rawEmail;
  if (!email || !password) {
    throw new HttpError(400, 'Email and password are required');
  }

  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw new HttpError(401, 'Invalid credentials');
  }

  const ok = await user.comparePassword(password);
  if (!ok) {
    throw new HttpError(401, 'Invalid credentials');
  }

  const token = signToken(user);
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

const me = async (userId) => {
  const user = await userRepo.findByIdSafe(userId);
  return { user };
};

module.exports = {
  register,
  login,
  me
};
