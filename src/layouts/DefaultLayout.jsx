import { Outlet } from "react-router-dom";
import HeaderComp from "../components/Header/HeaderComp";
import FooterComp from "../components/Footer/FooterComp";
import { useState, useEffect } from 'react';
import axios from 'axios';

const indexProductsAPI = 'http://localhost:3000/products/'

export default function DefaultLayout() {

    const [indexProducts, setIndexProducts] = useState([])

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
            <HeaderComp />
            <main>
                <Outlet products={indexProducts} />
            </main>
            <FooterComp />
        </>
    );
}