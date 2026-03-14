import './HeaderComp.css'
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useState } from 'react';
import { BsFilterLeft } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { LuHeart, LuMenu } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";

import { addFilterToStorage } from '../../utils/localStorage';

// OLEG TI HO MESSO IL LOGO PER L'HEADER NELLA CARTELLA IMMAGINI, NON TI VOGLIO TOCCARE IL CODICE, FAI PURE TU

export default function HeaderComp({ indexProducts, wishlistProducts, cartProducts }) {

    // Search bar query used for internal filtering and as value for navigate in /shop?search=${query}
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [isTyping, setIsTyping] = useState(false)
    const [filterShow, setFilterShow] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [priceFilterName, setPriceFilterName] = useState('');

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

    const totalCartProducts = () => {
        let count = 0
        if (cartProducts) {
            cartProducts.forEach(p => count += p.quantity)
            return count;
        } else return count
    }

    const location = useLocation();

    const applyFilter = (newFilter) => {

        // doing localStorage thing
        addFilterToStorage(newFilter)
        // Read current query params
        const params = new URLSearchParams(location.search);

        // Merge/update new filter
        Object.keys(newFilter).forEach(key => {
            params.set(key, newFilter[key]);
        });

        // Navigate to updated URL
        navigate(`/shop?${params.toString()}`);
    };

    return (
        <header className="z-2 w-100 top-0 position-fixed">
            <nav className="position-relative navbar navbar-expand-md bg-body-tertiary">
                <div className="position-relative container-xxl d-flex align-items-center">
                    {/* LEFT */}
                    <div className="order-0 order-md-0 flex-grow-1 me-2">
                        <NavLink to="/" className="navbar-brand logo-style me-0" ></NavLink>
                    </div>

                    {/* CENTER */}
                    <form onSubmit={handleSubmit} className="order-4 order-md-1 w-100 mt-2 mt-md-0 d-flex position-relative" role="search">
                        {/* Controlled input for searching product */}
                        <input
                            className="box-shadow-cool form-control me-2 shadow-none border-0"
                            value={query}
                            onChange={handleChange}
                            onFocus={() => { setIsTyping(true); }}
                            // onBlur={() => setIsTyping(false)}
                            type="search"
                            placeholder="Cerca..."
                            aria-label="Search" />
                        <button
                            className="btn btn-outline-dark "
                            type="submit">Cerca</button>

                        <div className="position-absolute mx--2 start-0 end-0 search-dropdown-wrapper">

                            {isTyping && (
                                <div
                                    className="p-2 search-dropdown bg-scroll-black box-shadow-light"
                                >
                                    <div
                                        className="border-bottom bg-light rounded-3 mb-1 filters-header-styles d-flex justify-content-start align-items-center px-2"
                                    >
                                        <div className="dropdown me-2">
                                            <button
                                                className=" border-0 btn btn-secondary dropdown-toggle dropdown-hover-green"
                                                type="button"

                                                data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Prezzo: {priceFilterName}
                                            </button>
                                            <ul className="dropdown-menu" >
                                                <li>
                                                    <button
                                                        name='price-order'
                                                        className="dropdown-item"
                                                        type="button"
                                                        onClick={() => {
                                                            applyFilter({ price: "low-to-high" })
                                                            setPriceFilterName(': Basso → Alto')
                                                        }}
                                                    >
                                                        Basso → Alto
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        type="button"
                                                        name='price-order'
                                                        onClick={() => {
                                                            applyFilter({ price: "high-to-low" });
                                                            setPriceFilterName(': Alto → Basso')
                                                        }}
                                                    >
                                                        Alto → Basso
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="dropdown me-2">
                                            <button
                                                className=" border-0 btn btn-secondary dropdown-toggle dropdown-hover-green"
                                                type="button"
                                                onMouseDown={(e) => e.preventDefault()}
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Nome
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu">
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => applyFilter({ name: "a-to-z" })}
                                                        type="button">A → Z
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item "
                                                        onClick={() => applyFilter({ name: "z-to-a" })}
                                                        type="button">Z → A
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="dropdown me-2">
                                            <button
                                                className=" border-0 btn btn-secondary dropdown-toggle dropdown-hover-green"
                                                type="button"
                                                onMouseDown={(e) => e.preventDefault()}
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Popolari
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu">
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        type="button"
                                                        onClick={() => applyFilter({ pop: "more-popular" })}
                                                    >
                                                        Piu' venduti
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        type="button"
                                                        onClick={() => applyFilter({ pop: "less-pop" })}
                                                    >
                                                        Meno venduti
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <button type="button" className="ms-auto rounded-2 overflow-hidden" onClick={() => setFilterShow(false)} >
                                            <IoClose className="p-1 fs-2 hover-bg-red"></IoClose>
                                        </button>

                                    </div>
                                    {indexProducts?.filter(p => p.title.toLowerCase().includes(query.toLowerCase())).map(p => (
                                        <div
                                            key={p.id}
                                            className="p-2 hover-card hover-dark d-flex border-bottom"
                                            onMouseDown={(e) => {
                                                setQuery(p.title)
                                                navigate(`/shop?search=${p.title}`)
                                                setIsTyping(false)
                                                setFilterShow(false)
                                            }}>
                                            <div className="search-result-left">
                                                <img className='h-4-rem scale-120' src={p.image} alt="" />
                                            </div>
                                            <div className="search-result-right d-flex align-items-center ms-3">
                                                <h6>{p.title}</h6>
                                            </div>
                                        </div>
                                    ))}
                                </div>)}
                        </div>
                    </form>

                    {/* RIGHT */}


                    <div className="order-3 order-md-2 none-at-768 flex-grow-md-1 d-flex justify-content-end">
                        <button
                            className="navbar-toggler p-0 border-0 "
                            type="button"
                            data-bs-toggle="collapse"
                            onClick={() => setIsMobileMenuOpen(prev => !prev)}
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            {isMobileMenuOpen
                                ? <LuMenu className='fs-2 text-dark mt-1' />
                                : <IoClose className='fs-2 text-dark mt-1' />}
                        </button>
                    </div>
                    {/* RIGHT */}
                    <div className="order-5 order-md-3 collapse navbar-collapse justify-content-end flex-grow-1" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-md-0  ms-2">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active" aria-current="page" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/shop" className="nav-link" >Negozio</NavLink>
                            </li>

                        </ul>
                    </div>
                    <div className='order-1 order-md-4 me-2 me-md-0 d-flex '>
                        <NavLink to='cartpage' className=' position-relative rounded-5 header-button-style call-to-action ms-2 d-flex'>
                            <div className=' position-absolute w-1-rem h-1-rem start-60 top-60 rounded-5 bg-danger text-light bottom-0  d-flex justify-content-center align-items-center'>
                                <p className='fs-dot-7' >{totalCartProducts()}</p>
                            </div>
                            <FiShoppingCart className='text-dark fs-5' />
                        </NavLink>
                        <NavLink to='wishlist_page' className=' position-relative rounded-5 header-button-style call-to-action d-flex'>
                            <div className='position-absolute start-60 top-60 w-1-rem h-1-rem rounded-5 bg-danger text-light bottom-0 d-flex justify-content-center align-items-center'>
                                <p className='fs-dot-7'>{wishlistProducts.length}</p>
                            </div>
                            <LuHeart className='text-dark fs-5' />
                        </NavLink>
                    </div>

                </div>
            </nav>
        </header>
    )
}

