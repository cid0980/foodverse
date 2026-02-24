const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const { auth, requireRole } = require('../middlewares/auth');

const router = express.Router();

router.get('/', restaurantController.listRestaurants);
router.post('/', auth, requireRole(['vendor', 'admin']), restaurantController.createRestaurant);
router.get('/:id', restaurantController.getRestaurant);
router.post('/:id/menu', auth, requireRole(['vendor', 'admin']), restaurantController.addMenuItem);

module.exports = router;
