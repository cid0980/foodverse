const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/authService');

const register = asyncHandler(async (req, res) => {
  const data = await authService.register(req.body);
  res.status(201).json(data);
});

const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  res.json(data);
});

const me = asyncHandler(async (req, res) => {
  const data = await authService.me(req.user.id);
  res.json(data);
});

module.exports = {
  register,
  login,
  me
};
