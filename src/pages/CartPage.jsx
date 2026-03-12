import dragon from "../imgs/dragoBianco.png"
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import "../pages/pages-css/cartpage.css"


export default function CartPage() {


    const { indexProducts, cartProducts } = useOutletContext()



    return (
        <>
            <div className="cart-page-title">
                <h2>Cart</h2>
            </div>




            <div className="d-flex">
                <div className="order-container-left">

                    {/* CONTAINER CARD E DETTAGLI PRODOTTI NEL CARRELLO */}




                    {
                        cartProducts.map(item => {

                            const product = indexProducts.find(
                                p => p.id == item.id
                            )
                            

                            if (!product) return null
                            return (

                                

                                <div className="d-flex border-cart" key={item.id}>

                                    <div className="card" style={{ width: "10rem" }}>

                                        <img src={product.image} className="card-img-top" alt="" />
                                    </div>

                                    <div className="product-detail">


                                        <h3>Name: {product.title}</h3>

                                        <p>Avaiable: {product.is_featured}</p>

                                        <p>Quantity: {product.quantity}</p>

                                        <p>price: {product.price}</p>


                                    </div>




                                </div>
                            )
                        }
                        )

                    }

                </div>












                <div className="price-box container my-5">
                    <p>Prezzo totale</p>

                    <button className="btn btn-success"> Procedi all'ordine</button>
                </div>

            </div>



















        </>
    )
}