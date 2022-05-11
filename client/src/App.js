import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Navbar from './components/layouts/Header/Navbar'
import Search from './components/layouts/Search'
import ProductDetails from './components/Product/ProductDetails'
import ProductsListing from './components/Product/ProductsListing'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/search' element={<Search />} />
        <Route path='/products' element={<ProductsListing />} />
        <Route path='/product' element={<ProductDetails />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
