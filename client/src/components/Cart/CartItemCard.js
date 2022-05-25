import React, { useState } from 'react'
import './CartItemCard.css'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import CounterInput from "react-counter-input"
import { MdDeleteOutline } from "react-icons/md"

const product = {
    priceSpecs: [{
        size: 600,
        mrp: 999,
        offerPrice: 678,
        stock: 10
    },
    {
        size: 800,
        mrp: 1209,
        offerPrice: 928,
        stock: 0
    }],
}

function CartItemCard() {
    const [priceSpec, setPriceSpec] = useState(product.priceSpecs[0])
    const [pSize, setPSize] = useState(product.priceSpecs[0].size)
    const [pQuantity, setPQuantity] = useState(1)

    const { mrp, offerPrice, stock } = priceSpec
    const discount = Math.round(100 - offerPrice / mrp * 100)

    const pSizeHandler = (event, selectedSize) => {
        if (selectedSize !== null) {
            setPSize(selectedSize)
            let selected = product.priceSpecs.find(pS => pS.size === selectedSize)
            setPriceSpec(selected)
        }
    }

    return (
        <div className='cart_item_card d-flex mb-3'>
            <div className='square_image'>
                <img src='/assets/product1.png' alt='' />
            </div>
            <div className='cart_item_details'>
                <h6 className='fw600'>Product Name Lorem Ipsum Dolor Amet</h6>
                <div className='product_sizes'>
                    <span className='me-5 font14'>Size:</span>
                    <ToggleButtonGroup
                        value={pSize}
                        exclusive
                        onChange={pSizeHandler}
                        aria-label="product size"
                    >
                        {
                            product.priceSpecs.map(e => (
                                <ToggleButton value={e.size} aria-label={e.size}>
                                    {e.size}ml
                                </ToggleButton>
                            ))
                        }
                    </ToggleButtonGroup>
                </div>
                <div className='product_quantity'>
                    <span className='font14'>Quantity:</span>
                    <CounterInput
                        count={pQuantity}
                        min={1}
                        // max={stock}
                        onCountChange={count => setPQuantity(count)}
                    />
                </div>
                {
                    offerPrice ?
                        <div className='product_card_price_spec'>
                            <span className='offer_price'>{offerPrice}</span>
                            <del className='mrp'>{mrp}</del>
                            <span className='discount'>{discount}% off</span>
                        </div> :
                        <div className='product_card_price_spec'>
                            <span className='offer_price'>{mrp}</span>
                        </div>
                }
            </div>
            <MdDeleteOutline className='ms-auto' color='#9F752A' size={24} />
        </div>
    )
}

export default CartItemCard