const calcOrderPrice = (cart, tax = 0, shipping = 0) => {
    let priceDetails = {
        sum: 0,
        discount: 0,    // in Rs not %
        tax,
        shipping,
        total: 0
    }
    cart.forEach(p => {
        priceDetails.sum += (p.priceSpec.price * p.quantity)
        priceDetails.discount += (p.priceSpec.discount * p.quantity)
    })
    
    priceDetails.total = priceDetails.sum - priceDetails.discount + priceDetails.tax + priceDetails.shipping
    return priceDetails
}

module.exports = calcOrderPrice