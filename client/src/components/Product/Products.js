import React from 'react'
import ProductCardS from '../layouts/Product/ProductCardS'

function Products({ products }) {

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-lg-3 mt-3'>filters</div>
                <div className='col-12 col-lg-9 border-bottom'>
                    <div className='row justify-content-center'>
                        {products.map(product => (
                            <div className='col-6 col-md-4 col-lg-4'>
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
                    <div className='mt-5 mb-5'>Paginator</div>
                </div>
            </div>
        </div>
    )
}

export default Products