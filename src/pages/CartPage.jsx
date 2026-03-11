import dragon from "../imgs/dragoBianco.png"
import { products } from "../data/products"
import { useEffect, useState } from "react";
import "../pages/pages-css/cartpage.css"
// Fake cart in local storage
// localStorage.setItem(
//   "cart",
//   JSON.stringify([
//     { id: 1, quantity: 2 },
//     { id: 3, quantity: 1 }
//   ])
// )

export default function CartPage() {

    function addToCart(id) {
        setCart([...cart, { id, quantity: 1 }])
    }

    const [cart, setCart] = useState([]);

    useEffect(() => {

        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

        setCart(savedCart);

    }, []);



    return (
        <>
            <div className="cart-page-title">
                <h2>Cart</h2>
            </div>




            <div className="d-flex">
                <div className="order-container-left">

                    {/* CONTAINER CARD E DETTAGLI PRODOTTI NEL CARRELLO */}




                    <div className="d-flex border-cart">

                        <div className="card" style={{ width: "10rem" }}>

                            <img src={dragon} className="card-img-top" alt="" />
                        </div>

                        <div className="product-detail">

                            {/* {cart.map(item => (
                            <div key={item.id}>
                                prodotto id: {item.id} quantità: {item.quantity}
                            </div>
                        ))} */}

                            <h3>Nome</h3>

                            <p>stato</p>

                            <p>Quantità</p>

                            <p>prezzo</p>


                        </div>

                    </div>




                    <div className="d-flex border-cart">

                        <div className="card" style={{ width: "10rem" }}>

                            <img src={dragon} className="card-img-top" alt="" />
                        </div>

                        <div className="product-detail">

                            <h3>Nome</h3>

                            <p>stato</p>

                            <p>Quantità</p>

                            <p>prezzo</p>


                        </div>
                    </div>
                </div>







                <div className="price-box container my-5">
                    <p>Prezzo totale</p>

                    <button className="btn btn-success"> Procedi all'ordine</button>
                </div>

            </div>



















        </>
    )
}