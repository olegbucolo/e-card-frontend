import lotus from "../imgs/img-hero/black-lotus-hero.png";
import dragon from "../imgs/img-hero/dragoBianco.png";
import drowzee from "../imgs/img-hero/drowzee-hero.png";
import luffy from "../imgs/img-hero/luffy-hero.png";
import pokemon from "../imgs/categories/pokemon-logo.png";
import yugioh from "../imgs/categories/yugioh-logo.png";
import magic from "../imgs/categories/magic-logo.png";
import onepiece from "../imgs/categories/op-logo.png";
import { products } from "../data/products";
import Toast from "../components/Toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function HomePage() {
    const featuredProducts = products.filter((p) => p.product_id <= 4);

    const categories = [
        { name: "Pokemon", slug: "pokemon", img: pokemon },
        { name: "Yu-Gi-Oh", slug: "yugioh", img: yugioh },
        { name: "Magic", slug: "magic", img: magic },
        { name: "One Piece", slug: "onepiece", img: onepiece }
    ];

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

                        <section className="hero-swiper">
                            <div className="container">
                                <Swiper
                                    modules={[Navigation]}
                                    navigation
                                    slidesPerView={1}
                                    spaceBetween={20}
                                    grabCursor={true}
                                >
                                    <SwiperSlide>
                                        <img src={dragon} alt="Blue Eyes" />
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <img src={drowzee} alt="Drowzee" />
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <img src={luffy} alt="Luffy" />
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <img src={lotus} alt="Black Lotus" />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            <section className="categories">
                <div className="container">
                    <h2 className="text-center mb-5">Categorie</h2>

                    <div className="categories-grid">

                        <div className="category-card">
                            <img src={pokemon} alt="pokemon" />
                        </div>

                        <div className="category-card">
                            <img src={yugioh} alt="yugioh" />
                        </div>

                        <div className="category-card">
                            <img src={magic} alt="magic" />
                        </div>

                        <div className="category-card">
                            <img src={onepiece} alt="onepiece" />
                        </div>

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