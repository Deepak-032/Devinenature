const formatUserWishlist = (wishlist) => {
    return wishlist.map(product => {
        let p = product.product

        return {
            product: p._id,
            name: p.name,
            image: {
                public_id: p.images[0].public_id,
                url: p.images[0].url
            },
            priceSpecs: p.priceSpecs
        }
    })
}

module.exports = formatUserWishlist