const asyncHandler = require('../utils/asyncHandler');
const orderService = require('../services/orderService');

const placeOrder = asyncHandler(async (req, res) => {
  const data = await orderService.placeOrder({
    customerId: req.user.id,
    restaurantId: req.body.restaurantId,
    items: req.body.items,
    deliveryAddress: req.body.deliveryAddress
  });
  res.status(201).json(data);
});

const listMyOrders = asyncHandler(async (req, res) => {
  const data = await orderService.listMyOrders({ userId: req.user.id, role: req.user.role });
  res.json(data);
});

const listVendorOrders = asyncHandler(async (req, res) => {
  const data = await orderService.listVendorOrders(req.user.id);
  res.json(data);
});

const listAvailableOrders = asyncHandler(async (req, res) => {
  const data = await orderService.listAvailableOrders();
  res.json(data);
});

const acceptOrder = asyncHandler(async (req, res) => {
  const data = await orderService.acceptOrder({
    orderId: req.params.id,
    deliveryPartnerId: req.user.id
  });
  res.json(data);
});

const updateStatus = asyncHandler(async (req, res) => {
  const data = await orderService.updateStatus({
    orderId: req.params.id,
    userId: req.user.id,
    role: req.user.role,
    status: req.body.status
  });
  res.json(data);
});

module.exports = {
  placeOrder,
  listMyOrders,
  listVendorOrders,
  listAvailableOrders,
  acceptOrder,
  updateStatus
};
