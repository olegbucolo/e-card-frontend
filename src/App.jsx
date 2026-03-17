import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layouts/DefaultLayout";

import ShopPage from "./pages/ShopPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AddPaymentMethodPage from "./pages/AddPaymentMethodPage.jsx"
import WishlistPage from "./pages/WishListPage";


function App() {
  return (
    <Routes>
      <Route path="add_payment_method_page" element={<AddPaymentMethodPage />}></Route>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="detailpage/:slug" element={<DetailPage />} />
        <Route path="cartpage" element={<CartPage />} />
        <Route path="checkout_page" element={<CheckoutPage />} />
        <Route path="wishlist_page" element={<WishlistPage />} />
      </Route>
    </Routes>
  );
}

export default App;