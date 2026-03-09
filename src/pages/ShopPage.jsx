import drago from '../imgs/dragoBianco.png'
import { products } from '../data/products'

export default function ShopPage() {
    return (
        <>
            <div className="container-lg my-3">
                <div className="col">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-2">
                        {products.map(p => (
                            <div key={p.slug} className="col">
                                <div className="card hover-card h-100 p-2">
                                    <img src={drago} className="card-img-top" alt="..." />
                                    <div className="card-body px-0">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                    <div className="buttons d-flex justify-content-between g-2">
                                        <button type="button" className="hover-button btn btn-success w-50 me-2">Buy</button>
                                        <button type="button" className="hover-button btn btn-warning w-50">Wishlist</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}