import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from './store.js';
import Navbar from "./Navbar.js";
import Home from "./Home.js";
import About from "./About.js";
import Products from "./Products.js";
import ProductDetails from "./ProductDetails.js";
import Cart from "./Cart.js";

function App() {
  const [cart, setCart] = useState(function () {
    let savedCart = [];
    try {
      savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      savedCart = [];
    }
    return savedCart;
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar cart={cart} />
        <div className="container">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="about"
              element={<About />}
            />
            <Route 
              path="products"
              element={
                <Products
                  cart={cart}
                />
              }          
            />
            <Route 
              path="products/:id/*"
              element={<ProductDetails />}
            />
            <Route 
              path="cart"
              element={<Cart cart={cart} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
