const HttpError = require('../utils/httpError');
const restaurantRepo = require('../repositories/restaurantRepository');
const menuRepo = require('../repositories/menuItemRepository');

const listRestaurants = async () => {
  const restaurants = await restaurantRepo.findAll();
  return { restaurants };
};

const createRestaurant = async ({ name, description, address, ownerId }) => {
  if (!name) {
    throw new HttpError(400, 'Name is required');
  }
  const restaurant = await restaurantRepo.createRestaurant({
    name,
    description,
    address,
    owner: ownerId
  });
  return { restaurant };
};

const getRestaurantWithMenu = async (id) => {
  const restaurant = await restaurantRepo.findByIdPopulateOwner(id);
  if (!restaurant) {
    throw new HttpError(404, 'Restaurant not found');
  }
  const menu = await menuRepo.findByRestaurant(restaurant._id);
  return { restaurant, menu };
};

const addMenuItem = async ({ restaurantId, userId, role, payload }) => {
  const { name, price, description, imageUrl } = payload;
  if (!name || price == null) {
    throw new HttpError(400, 'Name and price are required');
  }

  const restaurant = await restaurantRepo.findById(restaurantId);
  if (!restaurant) {
    throw new HttpError(404, 'Restaurant not found');
  }
  if (restaurant.owner.toString() !== userId && role !== 'admin') {
    throw new HttpError(403, 'Forbidden');
  }

  const item = await menuRepo.createMenuItem({
    name,
    price,
    description,
    imageUrl,
    restaurant: restaurant._id
  });

  return { item };
};

module.exports = {
  listRestaurants,
  createRestaurant,
  getRestaurantWithMenu,
  addMenuItem
};
