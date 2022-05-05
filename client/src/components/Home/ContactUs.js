import React from 'react'

function ContactUs({ reference }) {

    return (
        <div ref={reference} className='container mt_max contact_us_container mobile_max_width_to_100'>
            <div className='row'>
                <div className='col-12 col-lg-6 p_0_mobile_auto'>
                    <img className='w-100 mobile_img_to_full_vw' src='/assets/contact.png' alt='' />
                </div>
                <div className='col-12 col-lg-6'>
                    <form className='input contact_form'>
                        <h1 className='text_biege mb-4'>Get in touch with us!</h1>
                        <div className='row'>
                            <label className='col-12 col-md-6 mt-4'>Name<input /></label>
                            <label className='col-12 col-md-6 mt-4'>Email<input type={'email'} /></label>
                        </div>
                        <label>Suject<input />
                        </label>
                        <label>Contact Number<input />
                        </label>
                        <label>Your Message<textarea /></label>
                        <button className='btn_submit' type={'submit'}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactUs