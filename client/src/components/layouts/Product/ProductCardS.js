import React from 'react'
import './ProductCardS.css'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoMdStar } from "react-icons/io";
import { Link } from 'react-router-dom';

function ProductCardS({ name, img, category, link, priceSpec, ratings }) {
    const { mrp, offerPrice } = priceSpec
    const discount = Math.round(100 - offerPrice / mrp * 100)

    const addToWishlist = () => {

    }

    return (

        <div className='product_card'>
            <Link to={link} className='dec_none'>
                <div className='product_card_img position-relative' style={{ backgroundImage: `url(${img})` }}>
                    <span className='ratings'>{ratings}&nbsp;<IoMdStar color='#9F752A' /></span>
                </div>
            </Link>
            <div className='product_card_data'>
                <Link to={link} className='dec_none'>
                    <span className='text_biege category'>{category}</span>
                    <h5>{name}</h5>
                </Link>
                <div className='d-flex justify-content-between align-items-center'>
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
                    <div className='add_to_wishlist' onClick={addToWishlist}>
                        <AiOutlineHeart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCardS