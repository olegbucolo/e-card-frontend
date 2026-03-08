import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {useState} from 'react';

export default function HeaderComp() {
    const location = useLocation();
    const showSearch = location.pathname.startsWith("/shop");
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/shop?search=${query}`)
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-md bg-body-tertiary">
                    <div className="container-xxl">
                        <div className="flex-grow-1"><NavLink to="/" className="navbar-brand" ><span className="text-warning">e</span>-card</NavLink></div>
                        {showSearch && (
                            <form onSubmit={handleSubmit} className="d-flex " role="search">
                                <input
                                    className="form-control me-2"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search" />
                                <button
                                    className="btn btn-outline-success"
                                    type="submit">Search</button>
                            </form>
                        )}
                        <div className="none-at-768 flex-grow-1 d-flex justify-content-end">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
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
        </>
    )
}