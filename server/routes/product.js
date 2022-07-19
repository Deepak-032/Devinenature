const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReview, getAllReviews, getReviews } = require('../controllers/product')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const { uploadFiles } = require('../middleware/uploadFiles')

const router = require('express').Router()


router.route('/products').get(getAllProducts)
router.route('/product/:id').get(getProductDetails)
router.route('/product/:id/reviews').get(getAllReviews)
router.route('/product/:id/review').put(isAuthenticatedUser, createProductReview)

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), uploadFiles, createProduct)
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), uploadFiles, updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

router.route('/admin/reviews').get(isAuthenticatedUser, authorizeRoles("admin"), getReviews)
router.route('/admin/review/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview)

module.exports = router
