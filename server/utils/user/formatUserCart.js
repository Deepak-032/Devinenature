const formatUserCart = (cart) => {
    return cart.map(product => {
        let p = {
            ...product.product,
            size: product.size,
            quantity: product.quantity
        }
        const priceSpec = p.priceSpecs.find(s => p.size === s.size)
        return {
            product: p._id,
            name: p.name,
            stock: p.stock,
            image: {
                public_id: p.images[0].public_id,
                url: p.images[0].url
            },
            quantity: p.quantity,
            priceSpec
        }
    })
}

module.exports = formatUserCart