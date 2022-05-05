import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import './Banner.css'

function Banner() {
    let carousel = [
        {
            image: ["/assets/banner1m.png", "/assets/banner1.png"],
            heading: <>A Big Headline<br />According to Product</>,
            link: ""
        },
        // {
        //     image: ["/assets/banner1m.png", "/assets/banner1.png"],
        //     heading: <>A Big Headline<br />According to Product</>,
        //     link: ""
        // },
        // {
        //     image: ["/assets/banner1m.png", "/assets/banner1.png"],
        //     heading: <>A Big Headline<br />According to Product</>,
        //     link: ""
        // },
    ]
    return (
        <Carousel>
            {carousel.map(slide => (
                <Carousel.Item key={slide.heading}>
                    <img
                        className='d-block w-100'
                        src={window.innerWidth <= 991 ? slide.image[0] : slide.image[1]}
                        alt=''
                    />
                    <div className='carousel_caption'>
                        <div className='container'>
                            <p>{slide.heading}</p>
                            <Link to={slide.link} className='btn_bg_white'>Know More</Link>
                        </div>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default Banner
