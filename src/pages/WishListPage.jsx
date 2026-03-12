import { useOutletContext } from "react-router-dom";
import { addToLocalStorage, removeFromLocalStorage } from "../utils/localStorage";

import "../pages/pages-css/cartpage.css"

export default function WishlistPage() {

    const { indexProducts, cartProducts, setCartProducts, wishlistProducts, setWishlistProducts } = useOutletContext()

    return (
        <>
            <div className="cart-page-title">
                <h2 className="cart-title-text">Cart</h2>
            </div>

            {/* CONTAINER CARD E DETTAGLI PRODOTTI NEL CARRELLO */}

            <div className="container">

                <div className="d-flex">
                    <div className="order-container-left">

                        {
                            wishlistProducts.map(item => {

                                const product = indexProducts.find(
                                    p => p.id == item.id
                                )


                                if (!product) return null
                                return (

                                    <div className="d-flex border-cart my-5" key={item.id}>

                                        <div className="card" style={{ width: "10rem" }}>

                                            <img src={product.image} className="card-img-top" alt="" />

                                        </div>

                                        <div className="product-detail">


                                            <h3>{product.title}</h3>

                                            <p className="avaible-text">{product.is_featured === 1 ? "Avaiable" : "Not avaible"}</p>

                                            <p>Quantity: {item.quantity}</p>

                                            <p>Price: {product.price}</p>

                                            <button onClick={() => addToLocalStorage(setCartProducts, item.id, 1)}
                                                className=" btn btn-outline-success me-2">
                                                add
                                            </button>

                                            <button onClick={() => removeFromLocalStorage(setCartProducts, item.id, 1)}
                                                className="btn btn-outline-danger me-2">
                                                remove
                                            </button>


                                        </div>
                                    </div>
                                )
                            }
                            )

                        }

                    </div>
                    <div className="price-box container my-5">
                        <p>Total Price</p>
                        <button className="btn btn-success"> Proceed to order</button>
                    </div>
                </div>
            </div>
        </>
    )
}