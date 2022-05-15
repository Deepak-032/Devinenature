import React, { useState } from 'react'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'
import SimilarProducts from '../layouts/Product/SimilarProducts'
import BSP from '../layouts/Product/BSP'
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
    ratings: 3.6,
    reviews: 113,
    link: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dob eiusmod tempor incididunt ut labore et dolore magna aliqua.',

}
const review = {
    img: <i className='bi bi-person'></i>,
    clientName: 'Client Name',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
}
const products = Array(15).fill({ ...product, priceSpec: { mrp: 1209, offerPrice: 698 }, img: "/assets/product1.png" })
const reviews = [review, review, review, review, review, review, review, review]

function WriteReview() {
    const [rating, setRating] = useState(0)

    return (
        <>
            <div className='bg_biege_light pt-2 pb-2'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <h5 className='col-12 col-lg-8 text-white m-0'>Name of the Person</h5>
                    </div>
                </div>
            </div>
            <div className='container mt-4'>
                <div className='row justify-content-center border_bottom_biege'>
                    <div className='col-12 col-lg-2 mb-3'>
                        <div className='square_image'><img src={product.images[0]} alt='' /></div>
                    </div>
                    <div className='col-12 col-lg-6'>
                        <h4 className='fw-bold border_bottom_biege pb-3'>{product.name}</h4>
                        <form className='pt-2 mb-5'>
                            <div className='mt-4 pb-3' style={{ lineHeight: 0 }}>
                                <h5 className='fw600'>Overall Rating</h5>
                                <StyledRating
                                    name="rating"
                                    value={rating}
                                    onChange={(e, r) => setRating(r)}
                                />
                            </div>
                            <div className='mt-4 pb-3'>
                                <h5 className='fw600'>Add a Headline</h5>
                                <input
                                    className='input_field border_bottom_biege w-100 mt-1'
                                    placeholder='Please write a short message'
                                />
                            </div>
                            <div className='mt-4 pb-3'>
                                <h5 className='fw600'>Tell us More</h5>
                                <textarea
                                    className='w-100 mt-1'
                                    style={{ height: '150px', padding: '0.25rem 0.5rem', border: '2px solid #896229' }}
                                    placeholder='Let us know about your experience'
                                />
                            </div>
                            <button className='btn_submit mt-4 mb-3'>SUBMIT REVIEW</button>
                        </form>
                    </div>
                </div>
            </div>
            <SimilarProducts products={products} />
            <BSP products={products} />
            <Reviews reviews={reviews} />
            <h1 className='text-center mt-5'>Video</h1>
            <h1 className='text-center mt-5'>Footer</h1>
        </>
    )
}

export default WriteReview