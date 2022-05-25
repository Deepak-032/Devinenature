import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'
import './CustomerReviewsAll.css'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Reviews from '../layouts/Reviews/Reviews'

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
const reviews = Array(9).fill(review)

function Previous() {
    return <div>&lt; PREVIOUS</div>
}

function Next() {
    return <div>NEXT &gt;</div>
}

function CustomerReviewsAll() {
    return (
        <>
            <div className='container mt-4'>
                <div className='text_biege font14'>{product.name} {'>'} Customer Reviews</div>
                <div className='row mt-4'>
                    <div className='col-12 col-lg-4'>
                        <div className='square_image'>
                            <img src={product.images[0]} alt='' />
                        </div>
                        <h3 className='fw-bold mt-4'>{product.name}</h3>
                        <div className='product_reviews_count mt-3'>
                            <h3 className='text_biege'>
                                {product.ratings}
                                <StyledRating
                                    name="read-only"
                                    value={product.ratings}
                                    readOnly
                                    className='ms-2'
                                    precision={0.1}
                                />
                            </h3>
                            <div className='font14'>
                                Based on
                                <u className='text_biege ms-2'>{product.reviews} Reviews</u>
                            </div>
                        </div>
                        <Link to={'/product/new/review'} className='mt-4 btn_submit ps-3 pe-3 font14 write_review'>WRITE A REVIEW</Link>
                    </div>
                    <div className='col-12 col-lg-8 product_review_listing'>
                        <h2 className='fw-bold mb-4'>Customer Reviews</h2>
                        {custReviews?.map(review => (
                            <div className='row mb-4 product_review'>
                                <div className='col-12 col-lg-3'>
                                    <div>{review.name}</div>
                                    <StyledRating
                                        name="read-only"
                                        className='font20'
                                        value={review.rating}
                                        readOnly
                                        precision={0.1}
                                    />
                                </div>
                                <div className='col-12 col-lg-9'>
                                    <div className='d-flex flex-wrap justify-content-between'>
                                        <span className='fw600'>{review.comment}</span>&nbsp;&nbsp;
                                        <span>Date: {review.createdAt.split('T')[0]}</span>
                                    </div>
                                    <p>{review.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-3'>
                    <Pagination
                        // defaultPage={1}
                        // siblingCount={2}
                        // boundaryCount={2}
                        count={10}
                        renderItem={item => (
                            <PaginationItem
                                components={{ previous: Previous, next: Next }}
                                {...item}
                            />
                        )}
                    />
                </div>
            </div>
            <Reviews reviews={reviews} />
            <h1 className='text-center mt-5'>Video</h1>
            <h1 className='text-center mt-5'>Footer</h1>
        </>
    )
}

export default CustomerReviewsAll