import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'
import './CustomerReviewsAll.css'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#9F752A',
    },
    '& .MuiRating-iconHover': {
        color: '#9F752A',
    },
})

function CustomerReviews({ custReviews, product }) {
    return (
        <div className='container mt_max'>
            <h5 className='text_biege text-center'>Made For You with Love</h5>
            <h2 className='fw-bold mb-5 text-center'>Reviews By Our Customers</h2>
            <div className='row'>
                <div className='col-12 col-lg-4'>
                    <div className='product_reviews_count'>
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
                            <Link to={''} className='text_biege ms-2'>{product.reviews} Reviews</Link>
                        </div>
                    </div>
                    <Link to={'/reviews'} className='mt-4 btn_submit ps-3 pe-3 font14 write_review'>WRITE A REVIEW</Link>
                </div>
                <div className='col-12 col-lg-8 product_review_listing'>
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
                                    <span className='fw600'>{review.comment}</span>
                                    <span>Date: {review.createdAt.split('T')[0]}</span>
                                </div>
                                <p>{review.description}</p>
                            </div>
                        </div>
                    ))}
                    <Link to={'reviews'} className='btn_submit font14 write_review'>SEE ALL REVIEWS</Link>
                </div>
            </div>
        </div>
    )
}

export default CustomerReviews