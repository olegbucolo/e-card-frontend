import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layouts/DefaultLayout";

import ShopPage from "./pages/ShopPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishListPage from "./pages/WishListPage";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="detailpage/:slug" element={<DetailPage />} />
        <Route path="cartpage" element={<CartPage />} />
        <Route path="checkout_page" element={<CheckoutPage />} />
        <Route path="wishlist_page" element={<WishListPage />} />
      </Route>
    </Routes>
  );
}

export default App;