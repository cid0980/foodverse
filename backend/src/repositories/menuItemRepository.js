const MenuItem = require('../models/MenuItem');

const findByRestaurant = (restaurantId) => MenuItem.find({ restaurant: restaurantId });
const findByIds = (ids) => MenuItem.find({ _id: { $in: ids } });
const createMenuItem = (data) => MenuItem.create(data);

module.exports = {
  findByRestaurant,
  findByIds,
  createMenuItem
};
