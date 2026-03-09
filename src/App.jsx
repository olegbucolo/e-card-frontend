import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layouts/DefaultLayout";

import ShopPage from "./pages/ShopPage";
import DectailPage from "./pages/DectailPage";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage/>}/>
        <Route path="DectailPage" element={<DectailPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;