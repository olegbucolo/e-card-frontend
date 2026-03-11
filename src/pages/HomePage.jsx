import dragon from "../imgs/dragoBianco.png"
import { products } from "../data/products";
import Toast from "../components/Toast";

export default function HomePage() {
    const featuredProducts = products.filter(p => p.product_id <= 4);
    return (
        <>
            <div className="d-flex justify-content-center">
                <Toast />
            </div>


            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>Le migliori carte collezionabili per veri appassionati</h1>
                        <h1>Le migliori carte collezionabili per veri appassionati</h1>
                        <p>
                            Scopri carte rare, edizioni speciali e prodotti selezionati per
                            collezionisti e giocatori.
                        </p>
                        <button>Scopri i prodotti</button>
                    </div>
                </div>
            </section>

            <section className="categories">
                <div className="container">
                    <h2>Esplora per categoria</h2>

                    <div className="categories-grid">
                        <div className="category-card">Pokémon</div>
                        <div className="category-card">Yu-Gi-Oh!</div>
                        <div className="category-card">Magic</div>
                        <div className="category-card">One Piece</div>
                    </div>
                </div>
            </section>

            <section className="featured-products">
                <div className="container">
                    <h2>Prodotti in evidenza</h2>

                    <div className="products-grid">
                        {featuredProducts.map((product) => (
                            <div className="product-card" key={product.product_id}>
                                <div className="l-box-d">
                                    <img src={dragon} alt="" className="img-dectail-page" />
                                </div>

                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <span className="product-price">€ {product.price}</span>
                                    <div className="buttons d-flex justify-content-between mt-auto">
                                        <button className="hover-button btn btn-success w-50 me-2">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <section className="shop-benefits">
                <div className="container">
                    <h2>Perché scegliere noi</h2>

                    <div className="benefits-grid">
                        <div className="benefit-card">Spedizione veloce</div>
                        <div className="benefit-card">Carte selezionate</div>
                        <div className="benefit-card">Pagamenti sicuri</div>
                    </div>
                </div>
            </section>
        </>
    );
}