import React from 'react'
import './About.css'

function About() {
    return (
        <div className='about_portion pt_max pb_max text_center_mobile'>
            <div className='container'>
                <div className='row about_row'>
                    <h2 className='col-lg-6 fw-bold mb-5'>What makes us<br /><span className='text_biege'>Different</span></h2>
                    <p className='col-lg-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className='row about_row text-center justify-content-evenly'>
                    <div className='col-4 col-lg about_image_container'>
                        <img src='/assets/ab1.png' alt='' />
                        <div className='font22'>All Skin<br/>Type</div>
                    </div>
                    <div className='col-4 col-lg about_image_container'>
                        <img src='/assets/ab2.png' alt='' />
                        <div className='font22'>Naturally<br/>Organic</div>
                    </div>
                    <div className='col-4 col-lg about_image_container'>
                        <img src='/assets/ab3.png' alt='' />
                        <div className='font22'>Paraben<br/>Free</div>
                    </div>
                    <div className='col col-lg about_image_container flex0'>
                        <img src='/assets/ab4.png' alt='' />
                        <div className='font22'>Cruelty<br/>Free</div>
                    </div>
                    <div className='col col-lg about_image_container flex0'>
                        <img src='/assets/ab5.png' alt='' />
                        <div className='font22'>Sulphate<br/>Free</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About