const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, changeUserPassword, updateUserProfile, getAllUsers, getUserDetailsAdmin, updateUserRole, deleteUser, registerVerifiedUser, getUserWishlist, getUserCart, addToCart, addToWishlist, removeFromWishlist, removeFromCart } = require('../controllers/user')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

const router = require('express').Router()

router.route('/register').post(registerUser)
router.route('/register/verify/:token').post(registerVerifiedUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/user').get(isAuthenticatedUser, getUserDetails)
router.route('/password/update').put(isAuthenticatedUser, changeUserPassword)
router.route('/user/update').put(isAuthenticatedUser, updateUserProfile)
router.route('/user/wishlist')
    .get(isAuthenticatedUser, getUserWishlist)
    .put(isAuthenticatedUser, addToWishlist)
    .delete(isAuthenticatedUser, removeFromWishlist)
router.route('/user/cart')
    .get(isAuthenticatedUser, getUserCart)
    .put(isAuthenticatedUser, addToCart)
    .delete(isAuthenticatedUser, removeFromCart)

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetailsAdmin)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)


module.exports = router
