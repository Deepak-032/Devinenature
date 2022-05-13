import React, { useState } from 'react'
import ProductCardS from '../layouts/Product/ProductCardS'
import Dropdown from '../partials/Dropdown'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import { IoMdStar, IoMdStarOutline } from "react-icons/io"
import './Products.css'
import Backdrop from '@mui/material/Backdrop'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem';

const PrettoSlider = styled(Slider)({
    color: '#896229',
    height: 4,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 14,
        width: 14,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        backgroundColor: '#9F9F9F',
    },
})

function Previous() {
    return <div>&lt; PREVIOUS</div>
}

function Next() {
    return <div>NEXT &gt;</div>
}

function Products({ products }) {
    const [ratings, setRatings] = useState(0)
    const [price, setPrice] = useState([0, 2000])
    const [showFilters, setShowFilters] = useState(false)

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: 1 }}
                open={showFilters}
                onClick={() => setShowFilters(false)}
            />
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-lg-3 mt-3 filters_container'>
                        <h5 className='text_biege border_bottom_biege pb-3' onClick={() => setShowFilters(!showFilters)}>
                            {window.innerWidth > 991 ? "Filter By" : <span className='font14 fw-bold'>Filter Products according to your need &gt;</span>}
                        </h5>
                        <div className={`filters ${showFilters ? 'show_filters' : ''}`}>
                            <div className='d-lg-none text-center mb-3 text_biege' onClick={() => setShowFilters(!showFilters)}>
                                Close
                            </div>
                            <Dropdown heading={'Category'}>
                                <div>Category 1</div>
                                <div>Category 2</div>
                                <div>Category 3</div>
                                <div>Category 4</div>
                                <div>Category 5</div>
                            </Dropdown>
                            <Dropdown heading={'Price'}>
                                <Box pl={0.7} pr={0.7} mt={3.7}>
                                    <PrettoSlider
                                        value={price}
                                        onChange={(e, p) => setPrice(p)}
                                        onChangeCommitted={(e, p) => console.log(p)}
                                        valueLabelDisplay="auto"
                                        step={100}
                                        marks
                                        min={0}
                                        max={2000}
                                    />
                                </Box>
                                <p>
                                    <span className='price_symbol'>₹</span>{price[0]} - <span className='price_symbol'>₹</span>{price[1]}
                                </p>
                            </Dropdown>
                            <Dropdown heading={'Ratings'}>
                                <Box pl={0.7} pr={0.7} mt={3.7}>
                                    <PrettoSlider
                                        valueLabelDisplay="auto"
                                        defaultValue={0}
                                        step={1}
                                        marks
                                        min={0}
                                        max={4}
                                        onChangeCommitted={(e, r) => setRatings(r)}
                                    />
                                </Box>
                                <p className='d-flex align-items-center'>
                                    {!ratings ? <IoMdStarOutline color='#9F9F9F' /> :
                                        Array(ratings).fill().map(_ => <IoMdStar color='#9F752A' />)
                                    }&nbsp;&amp; above
                                </p>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='col-12 col-lg-9 border_bottom_biege'>
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
                        <div className='mt-5 mb-5'>
                            <Pagination
                                // defaultPage={1}
                                // siblingCount={2}
                                // boundaryCount={2}
                                count={10}
                                renderItem={item => (
                                    <PaginationItem
                                        components={{ previous: Previous, next: Next }}
                                        {...item}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products