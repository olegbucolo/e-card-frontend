import './WishListPage.css'
import { useOutletContext } from "react-router-dom";
import { addToLocalStorage, removeFromLocalStorage } from "../utils/localStorage";
import { FiShoppingCart } from "react-icons/fi";

import "../pages/pages-css/cartpage.css"
import { FaCartPlus } from 'react-icons/fa6';
import { IoIosRemoveCircle } from "react-icons/io";


export default function WishlistPage() {

    const { indexProducts, cartProducts, setCartProducts, wishlistProducts, setWishlistProducts } = useOutletContext()

    return (
        <>

            {/* CONTAINER CARD E DETTAGLI PRODOTTI NEL WISHLIST */}

            <div className="container justify-content-center my-5 py-5">
                <div className="text-center mb-5">
                    <h2 className="cart-title-text">Wishlist</h2>
                </div>
                {wishlistProducts.map(item => {
                    const product = indexProducts.find(
                        p => p.id == item.id
                    )

                    if (!product) return null
                    return (

                        <div className="d-sm-flex d-block mb-4 p-2" key={item.id}>

                            <div className="card" style={{ width: "10rem" }}>

                                <img src={product.image} className="card-img-top" alt="" />

                            </div>

                            <div className="detail-card-wishlist d-flex flex-grow-1 flex-column ms-0 ms-sm-4">


                                <h3 className='mt-sm-0 mt-3'>{product.title}</h3>

                                {product.is_featured
                                    ? <div className='mb-2'>
                                        <button className="badge is-available">Disponibile</button>
                                        <p className="">Quantita' disponibile: {product.quantity}</p>

                                    </div>
                                    : <div>
                                        <button className="badge not-disponible">Non Disponibile</button>
                                        <p className="">Quantita' disponibile: 0</p>

                                    </div>
                                }

                                <p className='mb-4'>Prezzo: {product.price} €</p>

                                <div className="mt-auto d-flex">


                                    <button onClick={() => removeFromLocalStorage(setWishlistProducts, item.id, 1)}
                                        className="hover-button btn btn-danger me-2 d-flex
                                                    justify-content-center align-items-center">
                                        Rimuovi
                                        <IoIosRemoveCircle className='ms-1'/>
                                    </button>

                                    {product.is_featured ? <button
                                        className="hover-button btn btn-success me-2 d-flex
                                                    justify-content-center align-items-center"
                                        onClick={() => product.is_featured
                                            && addToLocalStorage(setCartProducts, product.id)}>
                                        Carrello
                                        <FaCartPlus className='ms-1' />
                                    </button> : <div></div>}
                                </div>


                            </div>


                        </div>
                    )
                })}

            </div>
        </>
    )
}