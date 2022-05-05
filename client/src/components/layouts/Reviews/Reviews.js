import React, { useContext } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { BsArrowRight, BsArrowLeft } from "react-icons/bs"
import './Reviews.css'

function Reviews({ reviews }) {
    return (
        <div className='container mt_max review_container'>
            <h5 className='text_biege text-center'>Love from Our Family</h5>
            <h2 className='fw-bold mb-5 text-center'>What People Say About US</h2>
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} wrapperClassName={'downward'}>
                {
                    reviews?.map(({ img, clientName, review }, i) => (
                        <div className='text-center review' key={i} itemId={i}>
                            {/* <img src={img} alt='' /> */}
                            {img}
                            <h5 className='text_biege'>{clientName}</h5>
                            <p>{review}</p>
                        </div>
                    ))
                }
            </ScrollMenu>
        </div>
    )
}

export default Reviews

function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext)
    return (
        <button className={`reviews_arrow ${isFirstItemVisible ? '' : 'reviews_arrow_visible'}`} disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
            <BsArrowLeft />
        </button>
    )
}

function RightArrow() {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext)
    return (
        <button className={`reviews_arrow ${isLastItemVisible ? '' : 'reviews_arrow_visible'}`} disabled={isLastItemVisible} onClick={() => scrollNext()}>
            <BsArrowRight />
        </button>
    )
}
