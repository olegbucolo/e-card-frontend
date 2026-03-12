import { useOutletContext, Link } from "react-router-dom";
import lotus from "../imgs/img-hero/black-lotus-hero.png";
import dragon from "../imgs/img-hero/dragoBianco.png";
import drowzee from "../imgs/img-hero/drowzee-hero.png";
import luffy from "../imgs/img-hero/luffy-hero.png";

import pokemon from "../imgs/categories/pokemon-logo.png";
import yugioh from "../imgs/categories/yugioh-logo.png";
import magic from "../imgs/categories/magic-logo.png";
import onepiece from "../imgs/categories/op-logo.png";

import { FaTruckFast } from "react-icons/fa6";
import { FaShieldAlt, FaGem } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function HomePage() {
    const { indexProducts = [], cartProducts, setCartProducts } = useOutletContext();

    const featuredProducts = indexProducts
        .filter((p) => Number(is_featured) === 1)
        .slice(0, 8);

    const bestSellerProducts = [...indexProducts]
        .sort((a, b) => Number(b.sold_quantity) - Number(a.sold_quantity))
        .slice(0, 8);

    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <span className="hero-badge">Competenza • Affidabilità • Precisione</span>
                            <h1>Le migliori carte collezionabili per veri appassionati</h1>
                            <p>
                                Scopri carte rare, edizioni speciali e prodotti selezionati per
                                collezionisti e giocatori.
                            </p>
                        </div>

                        <div className="hero-slider-box">
                            <section className="hero-swiper">
                                <Swiper
                                    modules={[Navigation]}
                                    navigation
                                    slidesPerView={1}
                                    centeredSlides={true}
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
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <section className="categories">
                <div className="container">
                    <h2 className="section-title">Categorie</h2>

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
                    <h2 className="mb-4">Prodotti in evidenza</h2>

                    <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={20}
                        slidesPerView={4}
                        grabCursor={true}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            576: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                            },
                            1200: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {featuredProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <Link to={`/detailpage/${product.slug}`} className="product-card-link">
                                    <div className="product-card">
                                        <div className="product-image-box">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="product-image"
                                            />
                                        </div>

                                        <div className="product-info">
                                            <h3>{product.title}</h3>
                                            <span className="product-price">€ {product.price}</span>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section className="best-sellers">
                <div className="container">
                    <h2 className="mb-4">Più venduti</h2>

                    <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={20}
                        slidesPerView={4}
                        grabCursor={true}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            576: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                            },
                            1200: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {bestSellerProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <Link to={`/detailpage/${product.slug}`} className="product-card-link">
                                    <div className="product-card">
                                        <div className="product-image-box">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="product-image"
                                            />
                                        </div>

                                        <div className="product-info">
                                            <h3>{product.title}</h3>
                                            <span className="product-price">€ {product.price}</span>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section className="shop-benefits">
                <div className="container">
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <FaTruckFast className="benefit-icon" />
                            <h3>Spedizione veloce</h3>
                            <p>Consegna rapida e tracciata su tutti gli ordini.</p>
                        </div>

                        <div className="benefit-card">
                            <FaGem className="benefit-icon" />
                            <h3>Carte selezionate</h3>
                            <p>Solo carte originali e verificate dai nostri esperti.</p>
                        </div>

                        <div className="benefit-card">
                            <FaShieldAlt className="benefit-icon" />
                            <h3>Pagamenti sicuri</h3>
                            <p>Transazioni protette con sistemi di pagamento affidabili.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}