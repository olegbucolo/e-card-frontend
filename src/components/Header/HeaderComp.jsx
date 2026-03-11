import {useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { products } from '../../data/products'
import './HeaderComp.css'

export default function HeaderComp() {

    // Search bar query used for internal filtering and as value for navigate in /shop?search=${query}
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [isTyping, setIsTyping] = useState(false)

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

    return (
        <header className="z-2 w-100 top-0 position-fixed">
            <nav className="navbar navbar-expand-md bg-body-tertiary">

                <div className="container-xxl d-flex align-items-center">
                    {/* LEFT */}
                    <div className="flex-grow-1">
                        <NavLink to="/" className="navbar-brand" ><span className="text-warning">e</span>-card</NavLink>
                    </div>

                    {/* CENTER */}
                    <form onSubmit={handleSubmit} className="d-flex position-relative mx-auto" role="search">
                        {/* Controlled input for searching product */}
                        <input
                            className=" form-control me-2"
                            value={query}
                            onChange={handleChange}
                            onFocus={() => setIsTyping(true)}
                            onBlur={() => setIsTyping(false)}

                            type="search"
                            placeholder="Search"
                            aria-label="Search" />
                        <button
                            className="btn btn-outline-success "
                            type="submit">Search</button>
                        <div className="position-absolute bg-light top-100 start-0 end-0 search-dropdown">
                            {isTyping && products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).map(p => (
                                <div
                                    key={p.product_id}
                                    className="p-2 d-block hover-card"
                                    onMouseDown={(e) => {
                                        setQuery(p.name)
                                        navigate(`/shop?search=${p.name}`)
                                        setIsTyping(false)
                                    }}
                                >
                                    {p.name}
                                </div>
                            ))}
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
                </div>
            </nav>
        </header>
    )
}

