const Restaurant = require('../models/Restaurant');

const findAll = () => Restaurant.find().populate('owner', 'name email');
const createRestaurant = (data) => Restaurant.create(data);
const findById = (id) => Restaurant.findById(id);
const findByIdPopulateOwner = (id) => Restaurant.findById(id).populate('owner', 'name email');
const findByOwner = (ownerId) => Restaurant.find({ owner: ownerId }).select('_id');

module.exports = {
  findAll,
  createRestaurant,
  findById,
  findByIdPopulateOwner,
  findByOwner
};
