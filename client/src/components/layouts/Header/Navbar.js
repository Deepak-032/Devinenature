import React, { useState, useEffect, useRef } from 'react'
import './Navbar.css'
import { GoSearch } from "react-icons/go";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import ContactUs from '../../Home/ContactUs';

function Navbar() {
    const searchRef = useRef(null)
    const contactRef = useRef(null)
    const navbarRef = useRef(null)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [click, setClick] = useState(false)
    const [showContactForm, setShowContactForm] = useState(false)
    const [showSearchInput, setShowSearchInput] = useState(false)
    const [y, setY] = useState(0)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const toogleNav = () => setClick(!click)
    const toogleContactForm = () => setShowContactForm(true)

    const showSearch = () => {
        setShowSearchInput(!showSearchInput)
        searchRef.current[0].focus()
    }

    const searchHandler = e => {
        e.preventDefault()
        if (!search) return false

        setSearchResults([])
        navigate(`/search?search=${search}`)
    }

    useEffect(() => {
        if (click) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        if (searchParams.get('search')) {
            setSearch(searchParams.get('search'))
        } else if (!search) {
            setSearch('')
        }

        function handleScroll() {
            if (window.scrollY > 40) {
                navbarRef.current.style.boxShadow = "0 0 10px rgb(0 0 0 / 10%)"
            } else {
                navbarRef.current.style.boxShadow = "none"
            }
            if (!click) {
                if (y > window.scrollY)
                    navbarRef.current.classList.add("nav_style_changer_mobile")
                else if (y < window.scrollY)
                    navbarRef.current.classList.remove("nav_style_changer_mobile")
                setY(window.scrollY)
            }
        }

        function handleClickOutside(e) {
            if (contactRef.current && !contactRef.current.contains(e.target)) {
                setShowContactForm(false)
            }
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSearchInput(false)
                setSearchResults([])
            }
            if (searchRef.current && searchRef.current[1].contains(e.target)) {
                setTimeout(() => {
                    setSearchResults([])
                }, 400)
            }
        }

        document.addEventListener("scroll", handleScroll)
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("scroll", handleScroll)
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [click, y, searchRef, searchParams])

    useEffect(() => {
        // Api request for search results
        (async () => {
            if (search) {
                setSearchResults(s => [...s, search])
            }
        })()
    }, [search])

    return (
        <>
            <nav ref={navbarRef} className='nav_top'>
                <div className='container d-flex align-items-center justify-content-between'>
                    <img className='logo' src='/assets/logo.png' alt='Devinenature' />
                    <div className='nav_top_right d-flex align-items-center'>
                        <form onSubmit={searchHandler} className='search position-relative' ref={searchRef}>
                            <GoSearch onClick={showSearch} className={showSearchInput ? 'search_icon' : ''} />
                            <input
                                type={'search'}
                                className={`search_input ${showSearchInput ? 'active' : ''}`}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder='Search your favourites...'
                            />
                            {searchResults &&
                                <output className='search_suggestions'>
                                    {searchResults.slice(0, 8).map(r => <Link to={`/${r}`}>{r}</Link>)}
                                </output>
                            }
                        </form>
                        <FiShoppingBag className={showSearchInput ? 'hide_icon_mobile' : ''} />
                        <FaRegUser className={showSearchInput ? 'hide_icon_mobile' : ''} />
                        <Link to={''} className='font14 dec_none d-none d-lg-block'>ABOUT</Link>
                        <button onClick={toogleContactForm} className='font14 dec_none d-none d-lg-block'>CONTACT</button>
                    </div>
                    <span onClick={toogleNav} className='hamburgerMenu d-none' >{!click ? <GiHamburgerMenu /> : <IoCloseSharp />}</span>
                </div>
            </nav>
            <div className='nav_bottom_container'>
                <div className={`container nav_bottom ${click ? 'active' : ''}`}>
                    <Link to={'/h'} onClick={toogleNav}><span>Skincare</span></Link>
                    <Link to={''} onClick={toogleNav}><span>Haircare</span></Link>
                    <Link to={''} onClick={toogleNav}><span>bath & body</span></Link>
                    <Link to={''} onClick={toogleNav}><span>mens</span></Link>
                    <Link to={''} onClick={toogleNav}><span>gifting</span></Link>
                    <Link to={''} onClick={toogleNav}><span>wellness</span></Link>
                    <Link to={''} onClick={toogleNav}><span>best sellers</span></Link>
                    <Link to={''} onClick={toogleNav}><span>all products</span></Link>
                    <Link to={''} className='d-lg-none'><span>ABOUT</span></Link>
                    <Link to={''} className='d-lg-none'><span>CONTACT</span></Link>
                </div>
            </div>
            {
                showContactForm &&
                <div className='contact_form_pop_up'>
                    <ContactUs reference={contactRef} />
                </div>
            }
        </>
    )
}

export default Navbar