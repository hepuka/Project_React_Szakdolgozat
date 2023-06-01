/* 
- Header, Footer komponensnek meghívása, itt központilag hívom meg, nem oldalanként
- Header és a Footer között a router és egyéb más megjelenítendő tartalom
- pages könyvtárban lévő index.js fájlba szerveztem ki az összes oldal elérését 
- components könyvtárba lévő index.js-be szerveztem ki az összes komponens elérését.Egyszerűsítve lettek, így egy fájból elérhető az összes oldal és a komponens

*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/header/Header.component.jsx";
import Footer from "./components/footer/Footer.compopnent.jsx";
import ProductDetails from "./components/admin/product/productDetails/ProductDetails.component";
import Cart from "./pages/cart/Cart.";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import CheckoutDetails2 from "./pages/checkout/CheckoutDetails2";
import Checkout from "./pages/checkout/Checkout";
import Checkout2 from "./pages/checkout/Checkout2";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderDetails from "./pages/orderDetails/OrderDetails.js";
import Orders from "./components/admin/orders/Orders.component";
import NotFound from "./pages/notFound/NotFound";
import Welcome from "./pages/wecome/Welcome";
import Cart2 from "./pages/cart/Cart2";
import Home from "./components/admin/home/Home.component.jsx";
import ViewProduct from "./components/admin/viewProduct/ViewProduct.component.jsx";
import AddProduct from "./components/admin/addProducts/AddProduct.component";
import AddUser from "./components/admin/addUser/AddUser.component";
import Users from "./components/admin/users/Users.component";
import Login from "./pages/auth/Login.component.jsx";
import Register from "./pages/auth/Register.component.jsx";
import Reset from "./pages/auth/Reset.component.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Product from "./components/admin/product/Product.component.jsx";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer />
        <div className="item-a">
          <Header />
        </div>
        <div className="item-b">
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/reset" element={<Reset />}></Route>
            <Route path="/welcome" element={<Welcome />}></Route>
            <Route path="/business" element={<Home />}></Route>
            <Route path="/menu" element={<Product />}></Route>
            <Route path="/all-products" element={<ViewProduct />}></Route>
            <Route path="/add-product/:id" element={<AddProduct />}></Route>
            <Route path="/add-user/:id" element={<AddUser />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route
              path="/product-details/:id"
              element={<ProductDetails />}
            ></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/cart2" element={<Cart2 />}></Route>
            <Route
              path="/checkout-details"
              element={<CheckoutDetails />}
            ></Route>
            <Route
              path="/checkout-details2"
              element={<CheckoutDetails2 />}
            ></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/checkout2" element={<Checkout2 />}></Route>
            <Route
              path="/checkout-success"
              element={<CheckoutSuccess />}
            ></Route>

            <Route path="/order-details/:id" element={<OrderDetails />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
        <div className="item-c">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
