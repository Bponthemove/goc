import { useState, useEffect } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import useFetch from "./useFetch.js";
import ProductDetailInfo from "./ProductDetailInfo.js";
import ProductDetailNutrition from "./ProductDetailNutrition.js";
import ProductDetailStorage from "./ProductDetailStorage.js";

export default function ProductDetails(props) {
  const [product, setProduct] = useState({});
  const { get } = useFetch("https://mygocdatabucket.s3.eu-west-2.amazonaws.com/");
  const params = useParams();
  
  useEffect(() => {
    get(`productinfo/id${params.id}.json`)
      .then(data => setProduct(data))
      .catch(error => console.log("Could not load product details", error));
  }, []);

  return (
    <div className="product-details-layout">
      <div>
        <h2>{product.name}</h2>
        <img
          src={product.image}
          width="125"
          height="125"
          className="product-details-image"
          alt={product.name}
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink 
                to={'details'}
                className={({ isActive }) => isActive ? 'tab-active' : undefined}
              >
                Details
              </NavLink>
            </li>
            <li>
            <NavLink 
                to={'nutrition'}
                className={({ isActive }) => isActive ? 'tab-active' : undefined}
              >
                Nutrition
              </NavLink>
            </li>
            <li>
            <NavLink 
                to={'storage'}
                className={({ isActive }) => isActive ? 'tab-active' : undefined}
              >
                Storage
              </NavLink>
            </li>
          </ul>
        </div>
        <Routes>
          <Route 
            path={'details'}
            element={
              <ProductDetailInfo
                onProductAdd={props.onProductAdd}
                product={product}
              />
            }
          />
          <Route 
            path={"nutrition"}
            element={<ProductDetailNutrition nutrition={product.nutrition} />}
          />
          <Route 
            path={"storage"}
            element={<ProductDetailStorage storage={product.storage} />}
          />
        </Routes>
      </div>
    </div>
  );
}
