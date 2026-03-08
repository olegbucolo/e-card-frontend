import { Outlet } from "react-router-dom";
import HeaderComp from "../components/Header/HeaderComp";
import FooterComp from "../components/Footer/FooterComp"

export default function DefaultLayout() {
    return (
        <>
            <HeaderComp/>
            <Outlet />
            <FooterComp/>
        </>
    )
}