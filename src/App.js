import './App.css';
import {Route, Routes} from "react-router-dom";
import AllProducts from "./page/products/AllProducts";
import ProductDetail from "./page/productsDeatil/ProductDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./component/NavBar";

function App() {
  return (
    <div className="App">
        <NavBar />
        <Routes>
            <Route path="/" element={<AllProducts />}/>
            <Route path="/products" element={<AllProducts />}/>
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/category/:category" element={<AllProducts />} />
        </Routes>
    </div>
  );
}

export default App;
