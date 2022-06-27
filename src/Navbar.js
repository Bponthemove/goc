import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { cartCountSelector } from "./store.js";

export default function Navbar() {
  const cartCount = useSelector(cartCountSelector);

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <h1>
          GOC
        </h1>
        <p>Grassfed | Organic | Carbon neutral</p>
      </NavLink>
      <ul>
        <li className="nav-item">
          <NavLink 
            to="/"
            className={({ isActive }) => isActive ? 'active' : undefined}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="about"
            className={({ isActive }) => isActive ? 'active' : undefined}
          >
            About us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="products"
            className={({ isActive }) => isActive ? 'active' : undefined}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="cart" className="nav-item nav-cart btn btn-accent">
            Cart ({cartCount})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
