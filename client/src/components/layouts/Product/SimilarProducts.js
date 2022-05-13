import React, { useContext } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import ProductCardS from './ProductCardS'
import './SimilarProducts.css'

function SimilarProducts({ products }) {
    return (
        <div className='container mt_max position-relative similar_products'>
            <h5 className='text_biege text-center'>Made For You with Love</h5>
            <h2 className='fw-bold mb-4 text-center'>More Similar Products</h2>
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} wrapperClassName={window.innerWidth < 992 ? 'downward' : ''}>
                {
                    products?.map((product, i) => (
                        <ProductCardS
                            itemId={i}
                            name={product.name}
                            img={product.img}
                            category={product.category}
                            priceSpec={product.priceSpec}
                            ratings={product.ratings}
                            link={product.link}
                        />
                    ))
                }
            </ScrollMenu>
        </div>
    )
}

export default SimilarProducts

function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext)
    return (
        <button className='scroller_arrow scroller_arrow_left' disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
            <span>{'<'}</span>
        </button>
    )
}

function RightArrow() {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext)
    return (
        <button className='scroller_arrow scroller_arrow_right' disabled={isLastItemVisible} onClick={() => scrollNext()}>
            <span>{'>'}</span>
        </button>
    )
}
