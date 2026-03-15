import './HeaderComp.css'
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useState } from 'react';
import { BsFilterLeft } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { LuHeart, LuMenu } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";

import { addFilterToLocalStorage } from '../../utils/localStorage';

// OLEG TI HO MESSO IL LOGO PER L'HEADER NELLA CARTELLA IMMAGINI, NON TI VOGLIO TOCCARE IL CODICE, FAI PURE TU

export default function HeaderComp({ indexProducts, wishlistProducts, cartProducts }) {

    // Search bar query used for internal filtering and as value for navigate in /shop?search=${query}
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [isTyping, setIsTyping] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [priceFilterButton, setPriceFilterButton] = useState('');
    const [nameFilterButton, setNameFilterButton] = useState('');
    const [popFilterButton, setPopFilterButton] = useState('');

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
        addFilterToLocalStorage(newFilter)
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
        <>
            <header className="z-5 w-100 top-0 position-fixed">
                <div className='position-relative'>
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
                                    className="box-shadow-cool form-control me-2  shadow-none border-0"
                                    value={query}
                                    onChange={handleChange}
                                    onFocus={() => { setIsTyping(true); }}
                                    onBlur={() => setIsTyping(false)}
                                    type="search"
                                    placeholder="Cerca..."
                                    aria-label="Search" />
                                <button
                                    className="btn btn-outline-dark "
                                    onClick={() => setIsMobileMenuOpen(false)}

                                    type="submit">Cerca</button>
                                {isTyping && (

                                    <div className=" position-fixed top-filter container-lg h-100 mx-2 search-dropdown-wrapper">
                                        <div
                                            className={
                                                location.pathname === '/shop'
                                                    ? `p-2 search-dropdown  bg-scroll bg-light mt-5 box-shadow-light border-0`
                                                    : `p-2 search-dropdown bg-scroll bg-light box-shadow-light border-0`}
                                        >
                                            {indexProducts?.filter(p => p.title.toLowerCase().includes(query.toLowerCase())).map(p => (
                                                <div
                                                    key={p.id}
                                                    className="p-2 hover-card bg-light d-flex border-bottom"
                                                    onMouseDown={(e) => {
                                                        setQuery(p.title)
                                                        navigate(`/shop?search=${p.title}`)
                                                        setIsTyping(false)
                                                    }}>
                                                    <div className="search-result-left">
                                                        <img className='h-4-rem scale-120' src={p.image} alt="" />
                                                    </div>
                                                    <div className="search-result-right d-flex align-items-center ms-3">
                                                        <h6>{p.title}</h6>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </form>
                            {/* RIGHT */}
                            <div className="order-3 order-md-2 none-at-768 flex-grow-md-1 d-flex justify-content-end">
                                <button
                                    className="navbar-toggler p-0 border-0 "
                                    type="button"
                                    onClick={() => setIsMobileMenuOpen(prev => !prev)}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                    {isMobileMenuOpen
                                        ? <IoClose className='fs-2 text-dark mt-1' />
                                        : <LuMenu className='fs-2 text-dark mt-1' />}
                                </button>
                            </div>
                            {/* RIGHT */}

                            <div className={`z-2 bg-light order-5  order-md-3 collapse navbar-collapse justify-content-end flex-grow-1 ${isMobileMenuOpen && "show border-bottom"}`} id="navbarSupportedContent">
                                <ul className="navbar-nav mb-2 mb-md-0  ms-2">
                                    <li className="nav-item">
                                        <NavLink
                                            to="/"
                                            className="nav-link active"
                                            onClick={() => setIsMobileMenuOpen(false)}

                                        >Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/shop"
                                            className="nav-link"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >Negozio</NavLink>
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

                </div>
            </header>

            {location.pathname === "/shop" &&
                <div className="z-3 overflow-x-auto scrollbar-hidden h-50 pe-none position-fixed bg-danger top-filter w-100  mb-1 bg-transparent">
                    <div className=' position-relative pe-auto container-lg d-flex flex-nowrap align-items-start px-3 bg-light py-3 fit-content'>
                        <div className="dropdown me-2">
                            <button
                                className=" border-0 btn btn-dark dropdown-toggle "
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Prezzo{priceFilterButton}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark" >
                                <li>
                                    <button
                                        name='price-order'
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => {
                                            applyFilter({ price: "low-to-high" })
                                            setPriceFilterButton(': Basso → Alto')
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
                                            setPriceFilterButton(': Alto → Basso')
                                        }}
                                    >
                                        Alto → Basso
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="dropdown me-2">
                            <button
                                className=" border-0 btn btn-dark dropdown-toggle "
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Nome{nameFilterButton}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            applyFilter({ name: "a-to-z" })
                                            setNameFilterButton(': A → Z')
                                        }}
                                        type="button">A → Z
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item "
                                        onClick={() => {
                                            applyFilter({ name: "z-to-a" })
                                            setNameFilterButton(': Z → A')
                                        }}
                                        type="button">Z → A
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="dropdown me-2 ">
                            <button
                                className=" border-0 btn btn-dark dropdown-toggle "
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Popolari{popFilterButton}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark ">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => {
                                            applyFilter({ pop: "more-pop" })
                                            setPopFilterButton(`: Piu' venduti`)
                                        }}
                                    >
                                        Piu' venduti
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => {
                                            applyFilter({ pop: "less-pop" })
                                            setPopFilterButton(`: Meno venduti`)
                                        }}
                                    >
                                        Meno venduti
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <button
                            type="button"
                            className="flex-shrink-0 ms-auto btn btn-danger rounded-2  overflow-hidden"
                        >
                            Reset
                        </button>
                    </div>
                </div>}
        </>
    )
}

