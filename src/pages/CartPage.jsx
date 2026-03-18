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


    const removeItemCompletely = (id) => {
        setCartProducts(prev => {
            const updated = prev.filter(item => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(updated));
            return updated;
        });
    }


    const navigate = useNavigate();

    const totalPrice = cartProducts.reduce((total, item) => {
        const product = indexProducts.find(
            p => p.id == item.id);
        if (!product) return total;
        return total + (product.price * item.quantity);
    }, 0)


    function clearCart() {
        setCartProducts([]);
    }

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* MODALE CON CONFERMA SVUOTA CARRELLO */}
            {showModal && (
                <>
                    <div className="modal d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <p>Sei sicuro di voler svuotare il carrello?</p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Annulla
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            clearCart();
                                            setShowModal(false);
                                        }}
                                    >
                                        Conferma
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            < div className="cart-page-title">
                <h2 className="cart-title-text container">Prodotti nel carrello</h2>
            </div >


            {/* CONTAINER CARD E DETTAGLI PRODOTTI NEL CARRELLO */}


            < div className="container" >
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

                                                <button
                                                    className="btn btn-danger mt-2"
                                                    onClick={() => removeItemCompletely(item.id)}
                                                >
                                                    Rimuovi
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



                        {cartProducts.length > 0 && (
                            <button
                                className="btn-cart text-light"
                                onClick={() => navigate(`/checkout_page`)}
                            >
                                Procedi all'ordine
                            </button>
                        )}




                        {cartProducts.length > 0 && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="btn-remove mb-3 text-light"
                            >
                                Svuota carrello
                            </button>
                        )}

                    </div>

                </div>

            </div >



        </>
    )
}





