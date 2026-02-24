const HttpError = require('../utils/httpError');
const orderRepo = require('../repositories/orderRepository');
const restaurantRepo = require('../repositories/restaurantRepository');
const menuRepo = require('../repositories/menuItemRepository');

const placeOrder = async ({ customerId, restaurantId, items, deliveryAddress }) => {
  if (!restaurantId || !Array.isArray(items) || items.length === 0) {
    throw new HttpError(400, 'restaurantId and items are required');
  }

  const restaurant = await restaurantRepo.findById(restaurantId);
  if (!restaurant) {
    throw new HttpError(404, 'Restaurant not found');
  }

  const menuIds = items.map((i) => i.menuItemId);
  const menuItems = await menuRepo.findByIds(menuIds);
  if (menuItems.length !== menuIds.length) {
    throw new HttpError(400, 'One or more menu items are invalid');
  }
  const allMatchRestaurant = menuItems.every(
    (item) => item.restaurant.toString() === restaurant._id.toString()
  );
  if (!allMatchRestaurant) {
    throw new HttpError(400, 'Menu items do not match restaurant');
  }

  let total = 0;
  const orderItems = items.map((i) => {
    const menuItem = menuItems.find((m) => m._id.toString() === i.menuItemId);
    const qty = Number(i.quantity) || 1;
    total += menuItem.price * qty;
    return { menuItem: menuItem._id, quantity: qty };
  });

  const order = await orderRepo.createOrder({
    customer: customerId,
    restaurant: restaurant._id,
    items: orderItems,
    total,
    deliveryAddress: deliveryAddress || ''
  });

  return { order };
};

const listMyOrders = async ({ userId, role }) => {
  let filter = { customer: userId };
  if (role === 'vendor') {
    const restaurants = await restaurantRepo.findByOwner(userId);
    const ids = restaurants.map((r) => r._id);
    filter = { restaurant: { $in: ids } };
  }
  if (role === 'delivery_partner') {
    filter = { assignedDeliveryPartner: userId };
  }

  const orders = await orderRepo.findByFilter(filter);
  return { orders };
};

const listVendorOrders = async (ownerId) => {
  const restaurants = await restaurantRepo.findByOwner(ownerId);
  const ids = restaurants.map((r) => r._id);
  const orders = await orderRepo.findByFilter({ restaurant: { $in: ids } });
  return { orders };
};

const listAvailableOrders = async () => {
  const orders = await orderRepo.findAvailable();
  return { orders };
};

const acceptOrder = async ({ orderId, deliveryPartnerId }) => {
  const order = await orderRepo.findById(orderId);
  if (!order) {
    throw new HttpError(404, 'Order not found');
  }
  if (order.status !== 'ready_for_pickup' || order.assignedDeliveryPartner) {
    throw new HttpError(400, 'Order not available for pickup');
  }

  order.assignedDeliveryPartner = deliveryPartnerId;
  order.status = 'out_for_delivery';
  await order.save();

  return { order };
};

const updateStatus = async ({ orderId, userId, role, status }) => {
  if (!status) {
    throw new HttpError(400, 'Status is required');
  }
  const order = await orderRepo.findById(orderId);
  if (!order) {
    throw new HttpError(404, 'Order not found');
  }

  if (role === 'vendor') {
    const restaurant = await restaurantRepo.findById(order.restaurant._id);
    if (!restaurant || restaurant.owner.toString() !== userId) {
      throw new HttpError(403, 'Forbidden');
    }
    const allowedTransitions = {
      pending: ['preparing', 'cancelled'],
      preparing: ['ready_for_pickup', 'cancelled']
    };
    const allowed = allowedTransitions[order.status] || [];
    if (!allowed.includes(status)) {
      throw new HttpError(400, 'Invalid status transition for vendor');
    }
  }

  if (role === 'delivery_partner') {
    if (order.assignedDeliveryPartner?.toString() !== userId) {
      throw new HttpError(403, 'Forbidden');
    }
    const allowedTransitions = {
      out_for_delivery: ['delivered']
    };
    const allowed = allowedTransitions[order.status] || [];
    if (!allowed.includes(status)) {
      throw new HttpError(400, 'Invalid status transition for delivery partner');
    }
  }

  order.status = status;
  await order.save();

  return { order };
};

module.exports = {
  placeOrder,
  listMyOrders,
  listVendorOrders,
  listAvailableOrders,
  acceptOrder,
  updateStatus
};
