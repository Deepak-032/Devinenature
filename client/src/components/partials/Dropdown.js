import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import './Style.css'

function Dropdown({ heading, children }) {
    const [state, setState] = useState(false)

    return (
        <div className='border_bottom_biege mt-2'>
            <h6
                className='dropdown_heading fw600 d-flex justify-content-between'
                onClick={() => setState(!state)}
            >
                {heading}
                {state ?
                    <FiChevronUp size={24} color='#9F752A' /> :
                    <FiChevronDown size={24} color='#9F752A' />
                }
            </h6>
            <div className={`dropdown ${state ? 'show_dropdown' : 'hide_dropdown'}`}>{children}</div>
        </div>
    )
}

export default Dropdown