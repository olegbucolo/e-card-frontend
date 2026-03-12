import { NavLink } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

export default function ShopPage() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search")
    const { indexProducts, cartProducts, setCartProducts } = useOutletContext();
    const filteredProducts = indexProducts?.filter(p => p.title.toLowerCase().includes(search?.toLowerCase() || ""))

    function addToCart(productId, quantity = 1)  {
        setCartProducts(prev => {
            const existingProduct = prev.find(p => p.id === productId);
            if(existingProduct){
                return prev.map(p => p.id === productId ? {...p, quantity: p.quantity + quantity} : p);
            }
            return [...prev, {id: productId, quantity}]
        })
    }

    return (
        <>
            <div className="container-lg my-5 pt-3">
                <div className="col">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-2">
                        {search ? filteredProducts.map(p => {
                            return (
                                <div key={p.id} className="col">

                                    <div className="card hover-card h-100 p-2 d-flex flex-column">

                                        <NavLink to={`/detailpage/${p.slug}`} className="text-decoration-none text-dark">
                                            <img src={p.image} className="card-img-top" alt="" />

                                            <div className="card-body px-0">
                                                <h5 className="card-title fs-5">{p.title}</h5>
                                                <p className="card-text ">{p.description}</p>
                                            </div>
                                        </NavLink>

                                        <div className="buttons d-flex justify-content-between mt-auto">
                                            <button className="hover-button btn btn-success w-50 me-2" onClick={() => addToCart(p.id)}>
                                                Add to Cart
                                            </button>
                                            <button className="hover-button btn btn-warning w-50">
                                                Wishlist
                                            </button>
                                        </div>

                                    </div>

                                </div>
                            )
                        }) : <div className='w-100'>You haven't searched anything yet</div>}
                    </div>
                </div>
            </div>
        </>
    )
}