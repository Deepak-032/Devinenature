import React from 'react'
import { Link } from 'react-router-dom'
import './ProductCategory.css'

function ProductCategory({ bgColor, lineColor, direction, name, img, description, link }) {
    return (
        <div className='mt_max position-relative' style={{ backgroundColor: bgColor }}>
            <div className='container mobile_max_width_to_100'>
                <div className='row product_category_home' style={{ flexDirection: direction }}>
                    <div className='col-12 col-lg-6'>
                        <img src={img} alt='' className='product_category_home_img mobile_img_to_full_vw' />
                    </div>
                    <div className='col-12 col-lg-6 text-white product_category_home_text' style={{ backgroundColor: bgColor }}>
                        <div>
                            <h2 className='fw-bold'>{name}</h2>
                            <div className='h_line' style={{ borderTop: `2px solid ${lineColor}`, width: '221px' }}></div>
                            <p className='font20 mt-4 mb-4'>{description}</p>
                            <Link to={link} className='view_more position-relative font20 dec_none text-white'>View More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCategory