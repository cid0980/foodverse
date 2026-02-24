const asyncHandler = require('../utils/asyncHandler');
const restaurantService = require('../services/restaurantService');

const listRestaurants = asyncHandler(async (req, res) => {
  const data = await restaurantService.listRestaurants();
  res.json(data);
});

const createRestaurant = asyncHandler(async (req, res) => {
  const data = await restaurantService.createRestaurant({
    ...req.body,
    ownerId: req.user.id
  });
  res.status(201).json(data);
});

const getRestaurant = asyncHandler(async (req, res) => {
  const data = await restaurantService.getRestaurantWithMenu(req.params.id);
  res.json(data);
});

const addMenuItem = asyncHandler(async (req, res) => {
  const data = await restaurantService.addMenuItem({
    restaurantId: req.params.id,
    userId: req.user.id,
    role: req.user.role,
    payload: req.body
  });
  res.status(201).json(data);
});

module.exports = {
  listRestaurants,
  createRestaurant,
  getRestaurant,
  addMenuItem
};
