import drago from '../imgs/dragoBianco.png'
import { products } from '../data/products'

export default function ShopPage() {
    return (
        <>
            <div className="container-lg mt-2">
                <div className="col">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-2">
                        {products.map(p => (
                            <div className="col">
                                <div className="card hover-card h-100 p-2">
                                    <img src={drago} class=" card-img-top" alt="..." />
                                    <div className="card-body px-0">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
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