const formatUserCart = (cart) => {
    return cart.map(product => {
        let p = product.product
        const priceSpec = p.priceSpecs.find(s => product.size === s.size)
        
        return {
            product: p._id,
            name: p.name,
            stock: p.stock,
            image: p.images[0],
            quantity: product.quantity,
            priceSpec
        }
    })
}

module.exports = formatUserCart