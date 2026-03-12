import drago from '../imgs/dragoBianco.png'
import { products } from '../data/products'
import { NavLink } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

export default function ShopPage() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search")
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search?.toLowerCase() || ""))
    return (
        <>
            <div className="container-lg my-5 pt-3">
                <div className="col">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-2">
                        {search ? filteredProducts.map(p => {
                            return (
                                <div key={p.product_id} className="col">

                                    <div className="card hover-card h-100 p-2 d-flex flex-column">

                                        <NavLink to={`/detailpage/${p.product_id}`} className="text-decoration-none text-dark">
                                            <img src={drago} className="card-img-top" alt="" />

                                            <div className="card-body px-0">
                                                <h5 className="card-title fs-5">{p.name}</h5>
                                                <p className="card-text ">{p.description}</p>
                                            </div>
                                        </NavLink>

                                        <div className="buttons d-flex justify-content-between mt-auto">
                                            <button className="hover-button btn btn-success w-50 me-2">
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