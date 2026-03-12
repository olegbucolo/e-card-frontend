import './HeaderComp.css'
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from 'react';
import { BsFilterLeft } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";

import { FiShoppingCart } from "react-icons/fi";

// OLEG TI HO MESSO IL LOGO PER L'HEADER NELLA CARTELLA IMMAGINI, NON TI VOGLIO TOCCARE IL CODICE, FAI PURE TU

export default function HeaderComp({ indexProducts }) {

    // Search bar query used for internal filtering and as value for navigate in /shop?search=${query}
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [isTyping, setIsTyping] = useState(false)
    const [filterShow, setFilterShow] = useState(false)

    // function that handles change when searching a product
    const handleChange = (e) => {
        setIsTyping(true)
        setQuery(e.target.value.toLowerCase())
    }

    // function that handles submit when searching a product
    const handleSubmit = (e) => {
        e.preventDefault();
        // at the press of the search button, we navigate to shop?search=${query}
        navigate(`/shop?search=${query}`)
        setIsTyping(false)
        setFilterShow(false);
    }

    return (
        <header className="z-2 w-100 top-0 position-fixed">
            <nav className="position-relative navbar navbar-expand-md bg-body-tertiary">
                <div className="position-relative container-xxl d-flex align-items-center">
                    {/* LEFT */}
                    <div className="flex-grow-1">
                        <NavLink to="/" className="navbar-brand logo-style" ></NavLink>
                    </div>

                    {/* CENTER */}
                    <form onSubmit={handleSubmit} className="d-flex position-relative ms-5" role="search">
                        {/* Controlled input for searching product */}
                        <input
                            className=" form-control me-2"
                            value={query}
                            onChange={handleChange}
                            onFocus={() => { setIsTyping(true); }}
                            onBlur={() => setIsTyping(false)}
                            type="search"
                            placeholder="Search"
                            aria-label="Search" />
                        <button
                            className="btn btn-outline-success "
                            type="submit">Search</button>
                        <button className="ms-2 header-button-style w-4-rem rounded-2" type="button" onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setFilterShow(prev => !prev)}>
                            <BsFilterLeft className="p-1 fs-2"></BsFilterLeft>
                        </button>
                        <div className="position-absolute start-0 end-0 search-dropdown-wrapper">
                            {filterShow && (<div className="filters-header-styles d-flex justify-content-between align-items-center px-2">
                                <div className="dropdown ">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Price
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark" >
                                        <li><a className="dropdown-item active" href="#">Low to High</a></li>
                                        <li><a className="dropdown-item" href="#">High to Low</a></li>
                                    </ul>
                                </div>
                                <div className="dropdown ">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Name
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li><a className="dropdown-item active" href="#">Alphabetical</a></li>
                                    </ul>
                                </div>
                                <div className="dropdown ">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Recent
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li><a className="dropdown-item active" href="#">1 year</a></li>
                                        <li><a className="dropdown-item" href="#">2 years</a></li>
                                    </ul>
                                </div>
                                <button type="button" onClick={() => setFilterShow(false)}>
                                    <IoClose className="p-1 fs-2 hover-bg-red"></IoClose>
                                </button>

                            </div>)}
                            <div className="search-dropdown">
                                {isTyping && indexProducts?.filter(p => p.title.toLowerCase().includes(query.toLowerCase())).map(p => (
                                    <div
                                        key={p.id}
                                        className="p-2 d-block hover-card hover-dark"
                                        onMouseDown={(e) => {
                                            setQuery(p.title)
                                            navigate(`/shop?search=${p.title}`)
                                            setIsTyping(false)
                                            setFilterShow(false)
                                        }}
                                    >
                                        {p.title}
                                    </div>
                                ))}
                            </div>

                        </div>

                    </form>

                    {/* RIGHT */}
                    <div className="none-at-768 flex-grow-1 d-flex justify-content-end">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    {/* RIGHT */}
                    <div className="collapse navbar-collapse justify-content-end flex-grow-1" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active" aria-current="page" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/shop" className="nav-link" >Shop</NavLink>
                            </li>

                        </ul>
                    </div>
                    <NavLink to='cartpage' className='position-relative header-button-style ms-2 d-flex'>
                        <div className='position-absolute start-50 rounded-4 bg-danger top-50 text-light bottom-0 w-50 h-1 d-flex justify-content-center align-items-center'>
                            <p>5</p>
                        </div>
                        <FiShoppingCart className='text-dark fs-5' />
                    </NavLink>
                    <NavLink to='wishlist_page' className='position-relative header-button-style ms-1 d-flex'>
                        <div className='position-absolute start-50 rounded-4 bg-danger top-50 text-light bottom-0 w-50 h-1 d-flex justify-content-center align-items-center'>
                            <p>5</p>
                        </div>
                        <LuHeart className='text-dark fs-5' />
                    </NavLink>

                </div>
            </nav>
        </header>
    )
}

