import { Outlet, useOutletContext } from "react-router-dom";
import HeaderComp from "../components/Header/HeaderComp";
import FooterComp from "../components/Footer/FooterComp";
import { useState, useEffect } from 'react';
import axios from 'axios';

const indexProductsAPI = 'http://localhost:3000/products/'

export default function DefaultLayout() {

    const [cartProducts, setCartProducts] = useState(() => {
        const localStorageCart = JSON.parse(localStorage.getItem('cart'));
        if (localStorageCart) {
            return localStorageCart
        } else {
            return []
        }
    })

    const [indexProducts, setIndexProducts] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get(indexProductsAPI)
                setIndexProducts(res.data);
                console.log(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchProducts();

    }, [])

    return (
        <>
            <HeaderComp indexProducts={indexProducts} />
            <main>
                <Outlet context={{ indexProducts, cartProducts, setCartProducts }} />
            </main>
            <FooterComp />
        </>
    );
}