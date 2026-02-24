const express = require('express');
const orderController = require('../controllers/orderController');
const { auth, requireRole } = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, requireRole(['customer', 'admin']), orderController.placeOrder);
router.get('/my', auth, orderController.listMyOrders);
router.get('/vendor', auth, requireRole(['vendor', 'admin']), orderController.listVendorOrders);
router.get('/available', auth, requireRole(['delivery_partner', 'admin']), orderController.listAvailableOrders);
router.post('/:id/accept', auth, requireRole(['delivery_partner', 'admin']), orderController.acceptOrder);
router.patch('/:id/status', auth, requireRole(['vendor', 'delivery_partner', 'admin']), orderController.updateStatus);

module.exports = router;
