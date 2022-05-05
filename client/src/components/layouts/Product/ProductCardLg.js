import React from 'react'
import './ProductCardLg.css'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#9F752A',
    },
    '& .MuiRating-iconHover': {
        color: '#9F752A',
    },
});

function ProductCardLg({ name, img, category, description, link, priceSpec, ratings }) {
    const { mrp, offerPrice } = priceSpec
    const discount = Math.round(100 - offerPrice / mrp * 100)

    const addToWishlist = () => {

    }

    const addToCart = () => {

    }

    return (
        <div className='product_card_lg'>
            <Link to={link} className='dec_none'>
                <div className='product_card_img_lg position-relative' style={{ backgroundImage: `url(${img})` }} />
            </Link>
            <div className='product_card_data_lg'>
                <Link to={link} className='dec_none'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className='text_biege category'>{category}</span>
                        <StyledRating
                            name="read-only"
                            value={ratings}
                            readOnly
                            precision={0.2}
                        />
                    </div>
                    <h5>{name}</h5>
                    <p>{description}</p>
                </Link>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <button onClick={addToCart}>ADD TO CART</button>
                        <div className='add_to_wishlist' onClick={addToWishlist}>
                            <AiOutlineHeart />
                        </div>
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
            </div>
        </div>
    )
}

export default ProductCardLg