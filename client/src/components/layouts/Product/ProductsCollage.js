import React from 'react'
import './ProductsCollage.css'
import { Link } from 'react-router-dom'

function ProductsCollage() {
    return (
        <div className='container mt_max'>
            <h5 className='text_biege text-center'>Made For You with Love</h5>
            <h2 className='fw-bold mb-4 text-center'>Best Selling Products</h2>
            <div className='row'>
                <div className='col-6 col-lg-3 mt-4'>
                    <Link to={''} className='products_collage_img_container'>
                        <img src='/assets/bsp1.png' className='w-100' alt='' />
                        <div>
                            <h5 className='fw-bold mb-0'>Product Name</h5>
                            <p className='font20 mb-0'>Lorem Ipsum Doler Amet</p>
                        </div>
                    </Link>
                </div>
                <div className='col-6 col-lg-3 mt-4'>
                    <Link to={''} className='products_collage_img_container'>
                        <img src='/assets/bsp2.png' className='w-100' alt='' />
                        <div>
                            <h5 className='fw-bold mb-0'>Product Name</h5>
                            <p className='font20 mb-0'>Lorem Ipsum Doler Amet</p>
                        </div>
                    </Link>
                </div>
                <div className='col-12 col-lg-6 mt-4'>
                    <Link to={''} className='products_collage_img_container'>
                        <img src='/assets/bsp3.png' className='w-100' alt='' />
                        <div>
                            <h5 className='fw-bold mb-0'>Product Name</h5>
                            <p className='font20 mb-0'>Lorem Ipsum Doler Amet</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='row d-none d-lg-flex'>
                <div className='col-lg-3 mt-4'>
                    <Link to={''} className='products_collage_img_container'>
                        <img src='/assets/bsp4.png' className='w-100' alt='' />
                        <div>
                            <h5 className='fw-bold mb-0'>Product Name</h5>
                            <p className='font20 mb-0'>Lorem Ipsum Doler Amet</p>
                        </div>
                    </Link>
                </div>
                <div className='col-12 col-lg-9 mt-4'>
                    <Link to={''} className='products_collage_img_container'>
                        <img src='/assets/bsp5.png' className='w-100' alt='' />
                        <div>
                            <h5 className='fw-bold mb-0'>Product Name</h5>
                            <p className='font20 mb-0'>Lorem Ipsum Doler Amet</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='row'>
                <div className='col-6 col-lg-3 mt-4'>
                    <Link to={''} className='products_collage_img_container'>
                        <img src='/assets/bsp1.png' className='w-100' alt='' />
                        <div>
                            <h5 className='fw-bold mb-0'>Product Name</h5>
                            <p className='font20 mb-0'>Lorem Ipsum Doler Amet</p>
                        </div>
                    </Link>
                </div>
                <div className='col-6 col-lg-3 mt-4'>
                    <Link to={''} className='products_collage_img_container'>
                        <img src='/assets/bsp2.png' className='w-100' alt='' />
                        <div>
                            <h5 className='fw-bold mb-0'>Product Name</h5>
                            <p className='font20 mb-0'>Lorem Ipsum Doler Amet</p>
                        </div>
                    </Link>
                </div>
                <div className='col-6 col-lg-3 mt-4 d-none d-lg-block'>
                    <Link to={''} className='products_collage_img_container'>
                        <img src='/assets/bsp1.png' className='w-100' alt='' />
                        <div>
                            <h5 className='fw-bold mb-0'>Product Name</h5>
                            <p className='font20 mb-0'>Lorem Ipsum Doler Amet</p>
                        </div>
                    </Link>
                </div>
                <div className='col-6 col-lg-3 mt-4 d-none d-lg-block'>
                    <Link to={''} className='products_collage_img_container'>
                        <img src='/assets/bsp2.png' className='w-100' alt='' />
                        <div>
                            <h5 className='fw-bold mb-0'>Product Name</h5>
                            <p className='font20 mb-0'>Lorem Ipsum Doler Amet</p>
                        </div>
                    </Link>
                </div>
                <div className='col-12 mt-4 d-lg-none'>
                    <Link to={''} className='products_collage_img_container'>
                        <img src='/assets/bsp6.png' className='w-100' alt='' />
                        <div>
                            <h5 className='fw-bold mb-0'>Product Name</h5>
                            <p className='font20 mb-0'>Lorem Ipsum Doler Amet</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductsCollage