import dragon from "../imgs/dragoBianco.png"
import { products } from "../data/products"
import { useEffect, useState } from "react";

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
            <div className="my-5">
                <h2>carrello</h2>
            </div>



            {/* CONTAINER IMMAGINE E DETTAGLI PRODOTTI NEL CARRELLO */}

            <div className="container my-5">

                <div className="d-flex">

                    <div className="card" style={{ width: "18rem" }}>

                        <img src={dragon} className="card-img-top" alt="" />

                    </div>


                    <div className="product-detail">

                        {cart.map(item => (
                            <div key={item.id}>
                                prodotto id: {item.id} quantità: {item.quantity}
                            </div>
                        ))}


                    </div>

                </div>

            </div>


        </>
    )
}