import React from 'react'
import Dropdown from '../partials/Dropdown'
import CartItemCard from './CartItemCard'
import './Cart.css'
import { Link } from 'react-router-dom'

function Cart() {
    return (
        <div className='container mt-4'>
            <h2 className='fw-bold'>My Cart</h2>
            <div className='row mt-4'>
                <div className='col-12 col-lg-8'>
                    <CartItemCard />
                    <CartItemCard />
                    <CartItemCard />
                </div>
                <div className='col-12 col-lg-4'>
                    <Dropdown
                        bgColor={'#F8F2EB'}
                        headingClassName='cart_apply_discount fw600 border_bottom_biege'
                        heading={'Apply Discount'}
                    >
                        <form className='cart_apply_discount'>
                            <label htmlFor='coupon'>Apply Coupon Code to avail exciting offers</label>
                            <input id='coupon' className='w-100 mt-3 mb-3 p-1 cart_apply_discount_input' />
                            <button type='submit' className='action_btn2 w-100 pt-1 pb-1'>APPLY COUPON CODE</button>
                        </form>
                    </Dropdown>
                    <div className='mt-3 cart_summary'>
                        <h6 className='fw600 border_bottom_biege cart_apply_discount'>Cart Summary</h6>
                        <div className='cart_apply_discount w-100'>
                            <table className='w-100'>
                                <tr className='border-bottom'>
                                    <td>Sub Total</td>
                                    <td className='text-end price_symbol'>{Number(899990).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr className='border-bottom'>
                                    <td>Discount</td>
                                    <td className='text-end'>-<span className='price_symbol'>{Number(990).toLocaleString('en-IN')}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className='font14 text-muted'>Free Shipping on orders above <span className='price_symbol'>{Number(999).toLocaleString('en-IN')}</span></td>
                                </tr>
                                <tr>
                                    <td>Shipping Charges</td>
                                    <td className='text-end price_symbol'>{Number(899).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr className='text-danger'>
                                    <td>Less Shipping Charges</td>
                                    <td className='text-end'>-<span className='price_symbol'>{Number(899).toLocaleString('en-IN')}</span></td>
                                </tr>
                                <tr className='border-bottom'>
                                    <td>Net Shipping Charges</td>
                                    <td className='text-end price_symbol'>{Number(0).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr className='border-botto fw600'>
                                    <td className='pt-5'>Grand Total</td>
                                    <td className='pt-5 text-end price_symbol'>{Number(899000).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><button className='action_btn1 w-100 m-0 p-2'>CHECKOUT</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className='text-center mt-3'>
                        <Link to={''} className='text_biege'>Continue Shopping</Link>
                    </div>
                </div>
            </div>
            <h1 className='text-center mt-5'>Footer</h1>
        </div>
    )
}

export default Cart