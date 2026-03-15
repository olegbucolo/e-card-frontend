import './pages-css/detailpage.css'
import { addToLocalStorage, isPresentInStorage, removeFromLocalStorage } from "../utils/localStorage";
import { useOutletContext, useParams } from "react-router-dom";
import { LuHeart } from "react-icons/lu";
import { FaHeart } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";


export default function DetailPage() {

    const { indexProducts, cartProducts, setCartProducts, wishlistProducts, setWishlistProducts, } = useOutletContext()

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


    const handleWishlist = (id) => {
        let alreadyInStorage = isPresentInStorage(wishlistProducts, id);
        if (alreadyInStorage) {
            removeFromLocalStorage(setWishlistProducts, id)
        } else {
            addToLocalStorage(setWishlistProducts, id)
        }
    }

    return (
        <>


            <div className="container margin-card">
                <div className="d-flex bg-detail-color">

                    <div className="l-box-d">
                        <img src={singleProduct.image} alt="" className="img-dectail-page" />

                    </div>

                    <div className="r-box-d">

                        <h4>{singleProduct.title}</h4>

                        {/* <p>Disponibilità: {availability}</p> */}

                        {singleProduct.is_featured
                            ? <div>
                                <p className="product-disponible">Disponibile</p>
                                <p className="">Quantita' disponibile: {singleProduct.quantity}</p>

                            </div>
                            : <div>
                                <p className="product-not-disponible">Non Disponibile</p>


                            </div>
                        }

                        <div>
                            <p className=''>Descrizione: {singleProduct.description} </p>

                            <p className='detail-text'>Prezzo: {singleProduct.price}</p>
                        </div>



                        <div className='mt-3'>
                            <button
                                className="hover-button btn btn-warning d-flex bg-light
                                                                            justify-content-center align-items-center"
                                onClick={() => handleWishlist(singleProduct.id)}>
                                Wish
                                {isPresentInStorage(wishlistProducts, singleProduct.id)
                                    ? <FaHeart className='text-danger ms-1' />
                                    : <LuHeart className='text-danger ms-1' />}
                            </button>
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


