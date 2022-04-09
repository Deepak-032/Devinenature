const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReview } = require('../controllers/product')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

const router = require('express').Router()


router.route('/products').get(getAllProducts)
router.route('/products/:id').get(getProductDetails)

router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)
router.route('/admin/products/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

router.route('/review').put(isAuthenticatedUser, createProductReview)

router.route('/admin/review/delete/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview)

module.exports = router
