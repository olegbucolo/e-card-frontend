import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layouts/DefaultLayout";

import ShopPage from "./pages/ShopPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage/>}/>
        <Route path="DectailPage" element={<DetailPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;