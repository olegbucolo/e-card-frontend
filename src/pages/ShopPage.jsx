import drago from '../imgs/dragoBianco.png'
import { products } from '../data/products'

export default function ShopPage() {
    return (
        <>
            <div className="container-lg">
                <div class="col">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                        {products.map(p => (
                            <div class="card">
                                <img src={drago} class=" card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{p.name}</h5>
                                    <p class="card-text">{p.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}