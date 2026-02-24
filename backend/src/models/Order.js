const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: { type: [orderItemSchema], default: [] },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: [
        'pending',
        'preparing',
        'ready_for_pickup',
        'out_for_delivery',
        'delivered',
        'cancelled'
      ],
      default: 'pending'
    },
    assignedDeliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    deliveryAddress: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
