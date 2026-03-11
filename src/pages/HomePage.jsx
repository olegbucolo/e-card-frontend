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
    const featuredProducts = products.filter((p) => p.is_featured).slice(0, 4);
    const bestSellerProducts = products.filter((p) => !p.is_featured).slice(0, 4);

    return (
        <>
            <div className="d-flex justify-content-center">
                <Toast />
            </div>

            <section className="hero">
                <div className="container">
                    <div className="hero-content">
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
                            <SwiperSlide key={product.product_id}>
                                <div className="product-card">
                                    <div className="product-image-box">
                                        <img src={dragon} alt={product.name} className="product-image" />
                                    </div>

                                    <div className="product-info">
                                        <h3>{product.name}</h3>
                                        <span className="product-price">€ {product.price}</span>
                                    </div>
                                </div>
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
                            <SwiperSlide key={product.product_id}>

                                <div className="product-card">

                                    <div className="product-image-box">
                                        <img src={dragon} alt={product.name} className="product-image" />
                                    </div>

                                    <div className="product-info">
                                        <h3>{product.name}</h3>
                                        <span className="product-price">€ {product.price}</span>
                                    </div>

                                </div>

                            </SwiperSlide>
                        ))}

                    </Swiper>

                </div>
            </section>
        </>

    );
}