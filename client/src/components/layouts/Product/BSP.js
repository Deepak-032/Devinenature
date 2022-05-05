import React from 'react'
import { Link } from 'react-router-dom'
import ProductCardLg from './ProductCardLg'
import ProductCardS from './ProductCardS'

function BSP({ products, pageLink }) {
    return (
        <div className='container mt_max'>
            <h5 className='text_biege text-center'>Made For You with Love</h5>
            <h2 className='fw-bold mb-4 text-center'>Best Selling Products</h2>
            <div className='row' style={{ overflow: 'hidden' }}>
                <div className='d-none d-lg-block col-lg-6'>
                    <ProductCardLg
                        name={products[0].name}
                        img={products[0].img}
                        category={products[0].category}
                        priceSpec={products[0].priceSpec}
                        ratings={products[0].ratings}
                        link={products[0].link}
                        description={products[0].description}
                    />
                </div>
                <div className='col-12 col-lg-6'>
                    <div className='row justify-content-center'>
                        {(window.innerWidth <= 991 ? products : products.slice(1, 5)).map(product => (
                            <div className='col-6 col-md-3 col-lg-6'>
                                <ProductCardS
                                    name={product.name}
                                    img={product.img}
                                    category={product.category}
                                    priceSpec={product.priceSpec}
                                    ratings={product.ratings}
                                    link={product.link}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Link to={pageLink} className='btn_bg_transparent d-block ms-auto me-auto mt-5'>VIEW ALL PRODUCTS {'>'}</Link>
        </div>
    )
}

export default BSP