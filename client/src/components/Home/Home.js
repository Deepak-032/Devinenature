import React from 'react'
import About from './About'
import Banner from './Banner'
import './Home.css'
import ProductsCollage from '../layouts/Product/ProductsCollage'
import ProductCategory from './ProductCategory'
import BSP from '../layouts/Product/BSP'
import Reviews from '../layouts/Reviews/Reviews'
import ContactUs from './ContactUs'

function Home() {
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
    const products = [product, product, product, product, product, product]
    const review = {
        img: <i className='bi bi-person'></i>,
        clientName: 'Client Name',
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
    }
    const reviews = [review, review, review, review, review, review, review, review]

    return (
        <>
            <Banner />
            <About />
            <ProductsCollage />
            <ProductCategory
                bgColor={'#DEA175'}
                lineColor={'#B17246'}
                name={'Product Details Lorem ipsum dolor amet'}
                img={'/assets/pc1.png'}
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident'}
                link={''}
            />
            <BSP products={products} pageLink={''} />
            <h1 className='text-center mt-5'>Video</h1>
            <Reviews reviews={reviews} />
            <ContactUs />
            <h1 className='text-center mt-5'>Footer</h1>

        </>
    )
}

export default Home