import { useOutletContext } from "react-router-dom";
import { addToLocalStorage, removeFromLocalStorage } from "../utils/localStorage";

import "../pages/pages-css/cartpage.css"

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

                        <div className="d-flex border mb-2 p-2" key={item.id}>

                            <div className="card" style={{ width: "10rem" }}>

                                <img src={product.image} className="card-img-top" alt="" />

                            </div>

                            <div className="product-detail d-flex flex-grow-1 flex-column">


                                <h3>{product.title}</h3>

                                {product.quantity > 35
                                    ? <div>
                                        <p className="text-light lh-base bg-success">Disponibile</p>
                                        <p className="">Quantita' disponibile: {product.quantity}</p>

                                    </div>
                                    : <div>
                                        <p className="text-light lh-base bg-danger">Non Disponibile</p>
                                        <p className="">Quantita' disponibile: 0</p>

                                    </div>
                                }

                                <p>Prezzo: {product.price} €</p>

                                <div className="mt-auto">


                                    <button onClick={() => removeFromLocalStorage(setWishlistProducts, item.id, 1)}
                                        className="btn btn-outline-danger me-2">
                                        Rimuovi
                                    </button>
                                </div>


                            </div>


                        </div>
                    )
                })}

            </div>
        </>
    )
}