import dragon from "../imgs/dragoBianco.png"
import { products } from "../data/products"
import { useParams } from "react-router-dom"

export default function DetailPage() {

    const { id } = useParams()
    const singleProduct = products.find(product => product.product_id === Number(id))
    
    return (
        <>
            <h2>Info prodotto</h2>

            <div className="container mt-3 mb-4">
                <div className="d-flex">

                    <div className="l-box-d">
                        <img src={dragon} alt="" className="img-dectail-page" />

                    </div>

                    <div className="r-box-d">

                        <h4>{singleProduct.name}</h4>

                        <p>Condition: {singleProduct.condition_id}</p>

                        <p>Price:{singleProduct.price}</p>

                        <p>Description:{singleProduct.description}</p>



                        <div><button className="btn btn-warning">Add to cart</button></div>
                    </div>

                </div>
            </div>
        </>
    )
}