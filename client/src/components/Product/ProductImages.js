import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import ReactImageZoom from 'react-image-zoom'
import { useLocation, useNavigate } from "react-router-dom"
import './ProductImages.css'
import { IoCloseSharp } from "react-icons/io5";

function ProductImages({ images }) {
    const thumbnailRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()
    const [image, setImage] = useState(images[0])
    const [showAllImages, setShowAllImages] = useState(false)

    const props = { offset: { vertical: 0, horizontal: 15 }, scale: 1.5 }
    
    const showImages = () => {
        document.querySelector('.nav_top').style.display = "none"
        setShowAllImages(true)
    }
    
    const hideImages = () => {
        document.querySelector('.nav_top').style.display = "block"
        setShowAllImages(false)
        navigate(-1)
    }

    const showImage = e => {
        e.target.parentElement.parentElement.querySelectorAll('div')
            .forEach(el => el.classList.remove('border_biege'))
        e.target.parentElement.classList.add('border_biege')
        setImage(e.target.src)
    }

    useEffect(() => {
        if (location.hash !== "#show-all-images") {
            document.querySelector('.nav_top').style.display = "block"
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
                <span className='d-none close_icon' onClick={hideImages}><IoCloseSharp color='#fff' size={24} /></span>
            </div>
        </>
    )
}

export default ProductImages