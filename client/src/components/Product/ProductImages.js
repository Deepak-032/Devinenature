import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import ReactImageZoom from 'react-image-zoom'
import { useLocation } from "react-router-dom"
import './ProductImages.css'

function ProductImages({ images }) {
    const thumbnailRef = useRef(null)
    const location = useLocation()
    const [image, setImage] = useState(images[0])
    const [showAllImages, setShowAllImages] = useState(true)

    const showImages = () => setShowAllImages(true)
    const props = { offset: { vertical: 0, horizontal: 15 }, scale: 1.5 }

    const showImage = e => {
        e.target.parentElement.parentElement.querySelectorAll('div')
            .forEach(el => el.classList.remove('border_biege'))
        e.target.parentElement.classList.add('border_biege')
        setImage(e.target.src)
    }

    useEffect(() => {
        if (location.hash !== "#show-all-images") {
            setShowAllImages(false)
        }
    }, [location])
    
    useEffect(() => {
        thumbnailRef.current.querySelector('div').classList.add('border_biege')
    }, [])

    return (
        <>
            <div className='product_image'>
                {window.innerWidth > 991 ?
                    <ReactImageZoom {...props} img={image} /> :
                    <div onClick={showImages}><Link to={'#show-all-images'}><img src={image} alt='' /></Link></div>
                }
            </div>
            <div ref={thumbnailRef} className={`thumbnails mt-1 hide_scrollbar ${showAllImages ? 'show_all_images' : ''}`}>
                {images.map(img => <div><img onClick={showImage} src={img} alt='' /></div>)}
            </div>
        </>
    )
}

export default ProductImages