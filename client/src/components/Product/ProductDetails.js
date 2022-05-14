import React, { useEffect, useState } from 'react'
import ProductImages from './ProductImages'
import BSP from '../layouts/Product/BSP'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'
import './ProductDetails.css'
import { Link } from 'react-router-dom'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CounterInput from "react-counter-input";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import SimilarProducts from '../layouts/Product/SimilarProducts'
import Reviews from '../layouts/Reviews/Reviews'
import CustomerReviews from '../Reviews/CustomerReviews'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#9F752A',
    },
    '& .MuiRating-iconHover': {
        color: '#9F752A',
    },
})

const product = {
    name: 'Product Name Lorem Ipsum Dolor Amet',
    images: ["/assets/product1.png", "/assets/pc1.png", "/assets/pc2.png", "/assets/bsp3.png", "/assets/contact.png", "/assets/product1.png"],
    category: 'Category',
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
    ratings: 3.6,
    reviews: 113,
    link: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dob eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    about: "About ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    instructions: "Instructions ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
}
const products = Array(15).fill({ ...product, priceSpec: { mrp: 1209, offerPrice: 698 }, img: "/assets/product1.png" })
const review = {
    img: <i className='bi bi-person'></i>,
    clientName: 'Client Name',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
}
const custReview = {
    name: "Testimonial Name",
    comment: "Great product ever used, Must Buy!",
    description: product.about,
    rating: 4.8,
    createdAt: "2022-04-11T22:19:26.494Z"
}
const custReviews = Array(6).fill(custReview)
const reviews = [review, review, review, review, review, review, review, review]

function ProductDetails() {
    const [priceSpec, setPriceSpec] = useState(product.priceSpecs[0])
    const [pSize, setPSize] = useState(product.priceSpecs[0].size)
    const [pQuantity, setPQuantity] = useState(1)
    const [dataTab, setDataTab] = useState('about')

    const { mrp, offerPrice, stock } = priceSpec
    const discount = Math.round(100 - offerPrice / mrp * 100)

    const pSizeHandler = (event, selectedSize) => {
        if (selectedSize !== null) {
            setPSize(selectedSize)
            let selected = product.priceSpecs.find(pS => pS.size === selectedSize)
            setPriceSpec(selected)
        }
    }

    const addToWishlist = () => {

    }

    const addToCart = () => {

    }

    return (
        <>
            <div className='container mt-4'>
                <div className='text_biege font14'>Home {'>'} Product Category {'>'} Product Detail</div>
                <div className='row mt-4'>
                    <div className='col-12 col-lg-5 product_images_container'>
                        <ProductImages images={product.images} />
                    </div>
                    <div className='col-12 col-lg-7 product_details'>
                        <div className='product_data'>
                            <h2 className='fw-bold'>{product.name}</h2>
                            <div className='product_reviews'>
                                <StyledRating
                                    name="read-only"
                                    value={product.ratings}
                                    readOnly
                                    precision={0.1}
                                />
                                <Link to={''} className='text_biege ms-2'>{product.reviews} Reviews</Link>
                            </div>
                            <p className='border_bottom_biege font12 pt-3 pb-3 mb-4'>{product.description}</p>
                            {
                                offerPrice ?
                                    <div className='product_card_price_spec'>
                                        <span className='offer_price font24'>{offerPrice}</span>
                                        <del className='mrp'>₹{mrp}</del>
                                        <span className='discount'>{discount}% off</span>
                                    </div> :
                                    <div className='product_card_price_spec'>
                                        <span className='offer_price'>{mrp}</span>
                                    </div>
                            }
                            <div className='product_stock fw-bold'>
                                {stock >= 1 ? <span className='text-success font14'>In stock.</span> : <span className='text-danger font14'>Out of stock.</span>}
                            </div>
                            <div className='product_sizes mt-3'>
                                <div className='mb-1 font14'>Size:</div>
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
                            <div className='product_quantity mt-2'>
                                <span className='font14'>Quantity:</span>
                                <CounterInput
                                    count={pQuantity}
                                    min={1}
                                    max={stock}
                                    onCountChange={count => setPQuantity(count)}
                                />
                            </div>
                            <div className='product_action_buttons d-flex align-items-center mt-3'>
                                <button className='action_btn1' onClick={addToCart}>BUY NOW</button>
                                <button className='action_btn2' onClick={addToCart}>ADD TO CART</button>
                                <div className='add_to_wishlist' onClick={addToWishlist}>
                                    <AiOutlineHeart />
                                </div>
                            </div>
                        </div>
                        <div className='product_about mt-5'>
                            <div className='tab border_bottom_biege pb-1 mb-4'>
                                <span className={`me-4 ${dataTab === 'about' ? 'text_biege' : ''}`} onClick={() => setDataTab('about')}>About</span>
                                <span className={dataTab === 'instructions' ? 'text_biege' : ''} onClick={() => setDataTab('instructions')}>Instructions</span>
                            </div>
                            {dataTab === "about" ? <p>{product.about}</p> : <p>{product.instructions}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <SimilarProducts products={products} />
            <BSP products={products} />
            <CustomerReviews custReviews={custReviews} product={product} />
            <Reviews reviews={reviews} />
            <h1 className='text-center mt-5'>Video</h1>
            <h1 className='text-center mt-5'>Footer</h1>
        </>
    )
}

export default ProductDetails