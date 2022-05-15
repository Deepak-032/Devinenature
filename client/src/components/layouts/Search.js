import React from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Products from '../Product/Products';
import BSP from './Product/BSP';
import Reviews from './Reviews/Reviews';

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

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <>
            <div className='bg_biege_light pt-2 pb-2'>
                <div className='container'>
                    <h5 className='col-12 col-lg-8 text-white m-0'>Showing results for "{searchParams.get('search')}"</h5>
                </div>
            </div>
            <div className='container mt-4 mb-3'>
                <div className='text_biege font14'>Home {'>'} Search</div>
            </div>
            <Products products={products} />
            <BSP products={products} />
            <Reviews reviews={reviews} />
            <h1 className='text-center mt-5'>Video</h1>
            <h1 className='text-center mt-5'>Footer</h1>
        </>
    )
}

export default Search