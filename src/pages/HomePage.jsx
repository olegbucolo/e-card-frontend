export default function HomePage() {
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
                        <div className="category-card">Pokemon</div>
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
                        <div className="product-card">Prodotto 1</div>
                        <div className="product-card">Prodotto 2</div>
                        <div className="product-card">Prodotto 3</div>
                        <div className="product-card">Prodotto 4</div>
                    </div>
                </div>
            </section>
        </>
    )
}