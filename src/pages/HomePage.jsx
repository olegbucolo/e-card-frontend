import { products } from "../data/products";

export default function HomePage() {
    const featuredProducts = products.filter(p => p.product_id <= 4);
    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
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
                                <div className="product-image">
                                    <span>{product.image}</span>
                                </div>

                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <span className="product-price">€ {product.price}</span>
                                    <button>Aggiungi al carrello</button>
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