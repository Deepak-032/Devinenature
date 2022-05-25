import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import './Style.css'

function Dropdown({ heading, children, bgColor, containerClassName, headingClassName }) {
    const [state, setState] = useState(false)

    return (
        <div className={containerClassName} style={{ backgroundColor: bgColor }}>
            <h6
                className={`dropdown_heading d-flex justify-content-between align-items-center ${headingClassName}`}
                onClick={() => setState(!state)}
            >
                {heading}
                {state ?
                    <FiChevronUp size={24} color='#9F752A' /> :
                    <FiChevronDown size={24} color='#9F752A' />
                }
            </h6>
            <div className={`dropdown font14 ${state ? 'show_dropdown' : 'hide_dropdown'}`}>{children}</div>
        </div>
    )
}

export default Dropdown