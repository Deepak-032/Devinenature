import React from 'react'
import BSP from '../layouts/Product/BSP'
import Reviews from '../layouts/Reviews/Reviews'
import Products from './Products'

function ProductsListing() {
    const product = {
        name: 'Product Name',
        img: '/assets/product1.png',
        category: 'Category',
        priceSpec: {
            size: [600, 800],
            mrp: 999,
            offerPrice: 678,
            stock: 10
        },
        ratings: 3.6,
        link: '',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dob eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
    const products = Array(15).fill(product)
    const review = {
        img: <i className='bi bi-person'></i>,
        clientName: 'Client Name',
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
    }
    const reviews = Array(10).fill(review)

    return (
        <>
            <div className='position-relative carousel'>
                <img
                    className='d-block w-100'
                    src={window.innerWidth <= 991 ? "/assets/banner1m.png" : "/assets/banner1.png"}
                    alt=''
                />
                <div className='carousel_caption'>
                    <div className='container'>
                        <p>A Big Headline<br />According to Product</p>
                    </div>
                </div>
            </div>
            <div className='container mt-4'>
                <div className='text_biege font14'>Home {'>'} Product Category Page</div>
                <div className='row mt-5 d-none d-lg-flex'>
                    <h2 className='col-3 fw-bold'>Category<br />Name</h2>
                    <p className='col-8 font20'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>
            <Products products={products} />
            <BSP products={products} />
            <Reviews reviews={reviews} />
            <h1 className='text-center mt-5'>Video</h1>
            <h1 className='text-center mt-5'>Footer</h1>
        </>
    )
}

export default ProductsListing