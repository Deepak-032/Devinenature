const formatUserWishlist = (wishlist) => {
    return wishlist.map(product => {
        let p = product.product

        return {
            product: p._id,
            name: p.name,
            image: p.images[0],
            priceSpecs: p.priceSpecs
        }
    })
}

module.exports = formatUserWishlist