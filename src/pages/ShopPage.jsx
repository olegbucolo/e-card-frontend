import './ShopPage.css';
import { NavLink, useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import { LuHeart } from "react-icons/lu";
import { FaHeart } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import Toast from '../components/Toast/Toast';
import { FaCircleCheck } from "react-icons/fa6";


import { FaCartPlus } from "react-icons/fa";

import {
    addToLocalStorage,
    getSearchFromLocalStorage,
    getSorterFromLocalStorage,
    isPresentInStorage,
    removeFromLocalStorage
} from '../utils/localStorage';
import { useEffect } from 'react';

const sorters = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "name-asc": (a, b) => a.title.localeCompare(b.title),
    "name-desc": (a, b) => b.title.localeCompare(a.title),
    "pop-asc": (a, b) => a.sold_quantity - b.sold_quantity,
    "pop-desc": (a, b) => b.sold_quantity - a.sold_quantity
};

export default function ShopPage() {
    const navigate = useNavigate();

    const {
        indexProducts,
        cartProducts,
        setCartProducts,
        wishlistProducts,
        setWishlistProducts
    } = useOutletContext();

    const [searchParams] = useSearchParams();

    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || getSorterFromLocalStorage();

    let filteredProducts = indexProducts || [];

    if (search) {

        filteredProducts = filteredProducts.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    useEffect(() => {
        const savedSearch = getSearchFromLocalStorage();
        const savedSort = getSorterFromLocalStorage();

        const params = new URLSearchParams(searchParams);

        if (!params.get("search") && savedSearch) {
            params.set("search", savedSearch);
        }

        if (!params.get("sort") && savedSort) {
            params.set("sort", savedSort);
        }

        if (params.toString() !== searchParams.toString()) {
            navigate(`/shop?${params.toString()}`, { replace: true });
        }

    }, [searchParams, navigate]);


    if (sort && sorters[sort]) {
        filteredProducts = [...filteredProducts].sort(sorters[sort]);
    }

    const handleWishlist = (id) => {
        let alreadyInStorage = isPresentInStorage(wishlistProducts, id);
        if (alreadyInStorage) {
            removeFromLocalStorage(setWishlistProducts, id)
        } else {
            addToLocalStorage(setWishlistProducts, id)
        }
    }

    return (
        <>
            <div className="container-lg my-5 py-5 shop-top-space position-relative">
                <div className="col">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-3">
                        {search ? filteredProducts.map(p => {
                            return (
                                <div key={p.id} className="col">

                                    <div className="card hover-card h-100 p-2 d-flex flex-column">

                                        <NavLink to={`/detailpage/${p.slug}`} className="text-decoration-none text-dark">
                                            <img
                                                src={p.image}
                                                className="card-img-top"
                                                onError={(e) => {
                                                    e.target.onerror = null; // prevent infinite loop
                                                    e.target.src = "/No_Image_Available.jpg"; // your fallback image (put in /public)
                                                }}
                                                alt="" />

                                            <div className="card-body px-0">
                                                <h5 className="card-title fs-5">{p.title}</h5>
                                                <p className="card-text ">{p.description}</p>
                                            </div>
                                        </NavLink>
                                        <div className='mt-auto'>
                                            <div className='mb-2'>
                                                <h5 className='fw-semibold'>{p.price} €</h5>
                                            </div>
                                            <div className=" d-flex justify-content-between fs-lg-dot-8">
                                                {
                                                    p.is_featured ? <button
                                                        className="hover-button btn btn-success w-50 me-2 d-flex
                                                    justify-content-center align-items-center"
                                                        onClick={() => {
                                                            addToLocalStorage(setCartProducts, p.id)
                                                            
                                                        }}>
                                                        Carrello
                                                        {isPresentInStorage(cartProducts, p.id)
                                                        ? <FaCircleCheck  className=' ms-1' />
                                                        : <FaCartPlus className=' ms-1' />}
                                                    </button>
                                                        :
                                                        <button
                                                            className="hover-button btn w-50 me-2 d-flex
                                                    justify-content-center align-items-center"
                                                        >
                                                            <del>Carrello</del>
                                                            <FiShoppingCart className='ms-1' />
                                                        </button>
                                                }
                                                <button
                                                    className="hover-button btn btn-warning w-50 d-flex bg-light
                                                    justify-content-center align-items-center"
                                                    onClick={() => handleWishlist(p.id)}>
                                                    Wish
                                                    {isPresentInStorage(wishlistProducts, p.id)
                                                        ? <FaHeart className='text-danger ms-1' />
                                                        : <LuHeart className='text-danger ms-1' />}
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            )
                        }) : <h4 className='text-center pt-5 mt-md-0 mt-5 pt-md-5 w-100 border-bottom'>Inserisci la carta che vuoi cercare nella barra di ricerca....</h4>}
                    </div>
                </div>
            </div>
        </>
    )
}