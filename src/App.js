import './App.css';
import {Route, Routes} from "react-router-dom";
import AllProducts from "./page/allProducts/AllProducts";
import ProductDetail from "./page/productsDeatil/ProductDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./component/NavBar";
import AddProduct from "./page/addProduct/AddProduct";
import UpdateProduct from "./page/updateProduct/UpdateProduct";
import Login from "./Auth/login/Login";
import Join from "./Auth/join/Join";
import Carts from "./page/carts/Carts";

function App() {
  return (
    <div className="App">
        <NavBar />
        <Routes>
            <Route path="/" element={<AllProducts />}/>
            {/*<Route path="/products" element={<AllProducts />}/>*/}
            <Route path="/:id" element={<ProductDetail />} />
            <Route path="/category/:category" element={<AllProducts />} />
            <Route path="/product/add" element={<AddProduct />}/>
            <Route path="/product/update/:id" element={<UpdateProduct />} />

            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/carts" element={<Carts />} />
        </Routes>
    </div>
  );
}

export default App;
