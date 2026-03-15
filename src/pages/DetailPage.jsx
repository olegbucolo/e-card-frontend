import './pages-css/detailpage.css'
import { addToLocalStorage } from "../utils/localStorage";
import { useOutletContext, useParams } from "react-router-dom"

export default function DetailPage() {

    const { indexProducts, cartProducts, setCartProducts } = useOutletContext()

    const { slug } = useParams()



    const singleProduct = indexProducts.find(
        product => product.slug == slug
    )

    if (!singleProduct) {
        return <p>Prodotto non trovato</p>
    }

    const availability = singleProduct.is_featured == 1
        ? "Available"
        : "Not available"

    return (
        <>


            <div className="container margin-card">
                <div className="d-flex bg-detail-color">

                    <div className="l-box-d">
                        <img src={singleProduct.image} alt="" className="img-dectail-page" />

                    </div>

                    <div className="r-box-d">

                        <h4>{singleProduct.title}</h4>

                        <p>Disponibilità: {availability}</p>

                        <p>Descrizione: {singleProduct.description} </p>

                        <p>Prezzo: {singleProduct.price}</p>

                        <div>
                            <button className="btn-wishlist">Add to wishlist</button>
                        </div>
                        <div className="mt-3">
                            <button
                                className="btn btn-success"
                                disabled={singleProduct.is_featured === 0}
                                onClick={() => addToLocalStorage(setCartProducts, singleProduct.id, 1)}
                            >
                                {singleProduct.is_featured ? "Add to cart" : "Not avaible"}
                            </button>
                        </div>


                    </div>

                </div>
            </div >
        </>
    )
}


