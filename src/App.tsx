import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import ComponentLazyLoad from "./components/ComponentLazyLoad";

const ProductsPage = ComponentLazyLoad(import("./pages/Products"));
const CartPage =  ComponentLazyLoad(import("./pages/Cart"));

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route Component={MainLayout}>
        <Route path="/products" element={ProductsPage} />\
        <Route path="/cart" element={CartPage} />
      </Route>
   </Routes>
  );
}

export default App;
