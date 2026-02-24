const Order = require('../models/Order');

const createOrder = (data) => Order.create(data);
const findById = (id) => Order.findById(id).populate('restaurant');
const findByFilter = (filter) =>
  Order.find(filter)
    .populate('restaurant', 'name')
    .populate('items.menuItem', 'name price');
const findAvailable = () =>
  Order.find({ status: 'ready_for_pickup', assignedDeliveryPartner: null })
    .populate('restaurant', 'name')
    .populate('items.menuItem', 'name price');

module.exports = {
  createOrder,
  findById,
  findByFilter,
  findAvailable
};
