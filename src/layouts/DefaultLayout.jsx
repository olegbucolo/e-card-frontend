import { Outlet, useOutletContext } from "react-router-dom";
import HeaderComp from "../components/Header/HeaderComp";
import FooterComp from "../components/Footer/FooterComp";
import { useState, useEffect } from 'react';
import axios from 'axios';

const indexProductsAPI = 'http://localhost:3000/products/'

export default function DefaultLayout() {

    const [cartProducts, setCartProducts] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
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

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts))
    }, [cartProducts])

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