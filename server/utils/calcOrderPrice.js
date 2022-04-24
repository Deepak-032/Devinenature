const calcOrderPrice = (cart, tax = 0, shipping = 0) => {
    let priceDetails = {
        sum: 0,
        offerPrice: 0,
        tax,
        shipping,
        total: 0
    }
    cart.forEach(p => {
        priceDetails.sum += (p.priceSpec.mrp * p.quantity)
        priceDetails.offerPrice += (p.priceSpec.offerPrice * p.quantity)
    })
    
    priceDetails.total = priceDetails.offerPrice + priceDetails.tax + priceDetails.shipping
    return priceDetails
}

module.exports = calcOrderPrice