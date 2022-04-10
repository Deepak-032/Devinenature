const { newOrder, myOrders, myOrder, getAllOrders, getOrderDetails, updateOrder, deleteOrder } = require('../controllers/order')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

const router = require('express').Router()

router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/user/orders').get(isAuthenticatedUser, myOrders)
router.route('/user/order/:id').get(isAuthenticatedUser, myOrder)

router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)
router.route('/admin/order/:id')
    .get(isAuthenticatedUser, authorizeRoles("admin"), getOrderDetails)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)

module.exports = router