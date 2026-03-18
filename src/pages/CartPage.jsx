import dragon from "../imgs/dragoBianco.png"
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToLocalStorage, removeFromLocalStorage } from "../utils/localStorage";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

import "../pages/pages-css/cartpage.css"


export default function CartPage() {


    const { indexProducts, cartProducts, setCartProducts } = useOutletContext()

    const navigate = useNavigate();

    let orderShippingCost;
    let totalPrice;

    const cartTotalPrice = cartProducts.reduce((total, item) => {
        const product = indexProducts.find(
            p => p.id == item.id);
        if (!product) return total;
        return total + (product.price * item.quantity);
    }, 0)

    if (cartTotalPrice > 50) {
        orderShippingCost = 0;
        totalPrice = cartTotalPrice + orderShippingCost;
    } else {
        orderShippingCost = 5;
        totalPrice = cartTotalPrice + orderShippingCost;
    }

    function clearCart() {

        const confirmClear = confirm("Sei sicuro di voler svuotare il carrello?");


        if (confirmClear) {
            setCartProducts([]);
        }

    }


    return (
        <>
            <div className="cart-page-title">
                <h2 className="cart-title-text container">Prodotti nel carrello</h2>
            </div>


            {/* CONTAINER CARD E DETTAGLI PRODOTTI NEL CARRELLO */}


            <div className="container">
                <div className="d-flex responsive">
                    <div className="order-container-left">

                        {
                            cartProducts.map(item => {

                                const product = indexProducts.find(
                                    p => p.id == item.id
                                )


                                if (!product) return null
                                return (

                                    <div className="d-flex border-cart mb-5" key={item.id}>

                                        <div className="card" style={{ width: "10rem" }}>

                                            <img src={product.image} className="card-img-top" alt="" />

                                        </div>

                                        <div className="product-detail">


                                            <h3 className="">{product.title}</h3>





                                            <div className="d-flex">

                                                <p className="">Quantità:</p>

                                                <button onClick={() => removeFromLocalStorage(setCartProducts, item.id, 1)}
                                                    className="btn btn-outline-danger quantity-btn">
                                                    <FiMinus />
                                                </button>

                                                <p className=""> {item.quantity}</p>

                                                <button onClick={() => addToLocalStorage(setCartProducts, item.id, 1)}
                                                    className=" btn btn-outline-success quantity-btn">
                                                    <FaPlus />
                                                </button>
                                            </div>

                                            <p className="fw-bold fs-5">{(product.price * item.quantity).toFixed(2)}€</p>







                                        </div>
                                    </div>
                                )
                            }
                            )

                        }

                    </div>

                    <div className="price-box container">
                        <span className=""> <p className="fw-bold mt-2 text-light">Prezzo totale: {totalPrice.toFixed(2)}€</p> </span>

                        <button className="btn-cart text-light" onClick={() => navigate(`/checkout_page`)}>
                            Procedi all'ordine</button>


                        <button onClick={clearCart} className="btn-remove mb-3 text-light">
                            Svuota carrello
                        </button>

                    </div>

                </div>

            </div>



        </>
    )
}