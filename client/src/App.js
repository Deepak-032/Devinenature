import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Navbar from './components/layouts/Header/Navbar'
import Search from './components/layouts/Search'
import ProductDetails from './components/Product/ProductDetails'
import ProductsListing from './components/Product/ProductsListing'
import './App.css'
import CustomerReviewsAll from './components/Reviews/CustomerReviewsAll'
import WriteReview from './components/Reviews/WriteReview'
import Cart from './components/Cart/Cart'

function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Navbar />} >
          <Route index element={<Home />} />
          <Route path='search' element={<Search />} />
          <Route path='products' element={<ProductsListing />} />
          <Route path='product' element={<ProductDetails />} />
          <Route path='product/reviews' element={<CustomerReviewsAll />} />
          <Route path='product/new/review' element={<WriteReview />} />
          <Route path='cart' element={<Cart />} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App
