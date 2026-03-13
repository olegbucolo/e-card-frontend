import { NavLink } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { LuHeart } from "react-icons/lu";
import { FaHeart } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";

import { addToLocalStorage, isPresentInStorage, removeFromLocalStorage } from '../utils/localStorage';

export default function ShopPage() {
    const {
        indexProducts,
        cartProducts,
        setCartProducts,
        wishlistProducts,
        setWishlistProducts
    } = useOutletContext();

    const [searchParams] = useSearchParams();

    const search = searchParams.get("search");
    const priceFilter = searchParams.get("price");
    const nameFilter = searchParams.get("name");
    const popFilter = searchParams.get("pop");

    let filteredProducts = indexProducts || [];

    if (search) {
        filteredProducts = filteredProducts.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (priceFilter) {
        filteredProducts = [...filteredProducts].sort((a, b) =>
            priceFilter === "low-to-high" ? a.price - b.price : b.price - a.price
        );
    }

    if (nameFilter) {
        filteredProducts = [...filteredProducts].sort((a, b) =>
            nameFilter === "a-to-z"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title)
        );
    }

    if (popFilter) {
        filteredProducts = [...filteredProducts].sort((a, b) =>
            popFilter === "more-popular"
                ? b.sold_quantity - a.sold_quantity   // most sold first
                : a.sold_quantity - b.sold_quantity   // least sold first
        );
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
            <div className="container-lg my-5 pt-3">
                <div className="col">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-2">
                        {search ? filteredProducts.map(p => {
                            return (
                                <div key={p.id} className="col">

                                    <div className="card hover-card h-100 p-2 d-flex flex-column rounded-0">

                                        <NavLink to={`/detailpage/${p.slug}`} className="text-decoration-none text-dark">
                                            <img src={p.image} className="card-img-top" alt="" />

                                            <div className="card-body px-0">
                                                <h5 className="card-title fs-5">{p.title}</h5>
                                                <p className="card-text ">{p.description}</p>
                                            </div>
                                        </NavLink>
                                        <div className='mt-auto'>
                                            <div className='mb-2'>
                                                <h5 className='fw-semibold'>{p.price} €</h5>
                                            </div>
                                            <div className="buttons d-flex justify-content-between mt-auto">
                                                <button
                                                    className="hover-button btn btn-success w-50 me-2 d-flex
                                                    justify-content-center align-items-center"
                                                    onClick={() => addToLocalStorage(setCartProducts, p.id)}>
                                                    Cart
                                                    <FiShoppingCart className='ms-1' />
                                                </button>
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
                        }) : <div className='w-100'>You haven't searched anything yet</div>}
                    </div>
                </div>
            </div>
        </>
    )
}