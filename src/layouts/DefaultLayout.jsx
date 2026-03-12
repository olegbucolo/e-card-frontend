import { Outlet } from "react-router-dom";
import HeaderComp from "../components/Header/HeaderComp";
import FooterComp from "../components/Footer/FooterComp";


const indexProductsAPI = 'http://localhost:3000/products'

export default function DefaultLayout() {
    return (
        <>
            <HeaderComp />
            <main>
                <Outlet />
            </main>
            <FooterComp />
        </>
    );
}