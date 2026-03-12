
import { useOutletContext, useParams } from "react-router-dom"

export default function DetailPage() {

    const { indexProducts } = useOutletContext();
    const { id } = useParams()

    const singleProduct = indexProducts.find(
        product => product.id == id
    )

    if (!singleProduct) {
        return <p>Prodotto non trovato</p>
    }

    return (
        <>
            <h2>Info prodotto</h2>

            <div className="container my-5">
                <div className="d-flex bg-detail-color">

                    <div className="l-box-d">
                        <img src={singleProduct.image} alt="" className="img-dectail-page" />

                    </div>

                    <div className="r-box-d">

                        <h4>{singleProduct.title}</h4>

                        <p>Condition: {singleProduct.condition_id}</p>

                        <p>Price:{singleProduct.price}</p>

                        <div>
                            <button className="btn btn-warning">Add to Wishlist</button>
                        </div>
                        <div className="mt-3">
                            <button className="btn btn-success">Add to cart</button>
                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}


