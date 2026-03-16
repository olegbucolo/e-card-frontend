import { Outlet, useOutletContext } from "react-router-dom";
import HeaderComp from "../components/Header/HeaderComp";
import FooterComp from "../components/Footer/FooterComp";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { setFirstVisit } from "../utils/localStorage";
import Toast from "../components/Toast/Toast";

const indexProductsAPI = 'http://localhost:3000/products/'

export default function DefaultLayout() {
    setFirstVisit()
    const [isFirstVisit, setIsFirstVisit] = useState(JSON.parse(localStorage.getItem('isFirstVisit')))
    console.log(isFirstVisit)
    // state for the cart from localStorage
    const [cartProducts, setCartProducts] = useState(() => {
        const stored = localStorage.getItem('cart');

        return stored ? JSON.parse(stored) : [];
    })

    // effect that updates cart in localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts))
    }, [cartProducts])

    // state for the wishlist from localStorage
    const [wishlistProducts, setWishlistProducts] = useState(() => {
        const stored = localStorage.getItem('wishlist');
        return stored ? JSON.parse(stored) : [];
    })

    // effect that updates wishlist in localStorage
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistProducts))
    }, [wishlistProducts])

    // state that holds products from db
    const [indexProducts, setIndexProducts] = useState([])

    // GET query for index products
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get(indexProductsAPI)
                setIndexProducts(res.data);
            } catch (err) {
                console.error(err)
            }
        }
        fetchProducts();

    }, [])

    return (
        <>
            {isFirstVisit && <Toast />}
            <HeaderComp
                indexProducts={indexProducts}
                wishlistProducts={wishlistProducts}
                cartProducts={cartProducts} />
            <main className="mt-5">
                <Outlet context={{
                    indexProducts,
                    cartProducts,
                    setCartProducts,
                    wishlistProducts,
                    setWishlistProducts
                }} />
            </main>
            <FooterComp />
        </>
    );
}