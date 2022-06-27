import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { cartValueSelector, removeProduct } from "./store.js";
import { loadStripe } from "@stripe/stripe-js";
import Input from "./Input.js";
import Button from "./Button.js";

const stripeLoadedPromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function Cart() {
  const cart = useSelector(state => state.cart);
  const totalPrice = useSelector(cartValueSelector);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();

    const lineItems = cart.map(product => {
      return { price: product.price_id, quantity: product.quantity };
    });

    stripeLoadedPromise.then(stripe => {
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: `${window.location.origin}`,
          cancelUrl: `${window.location.origin}`,
          customerEmail: email,
        })
        .then((response) => {
          // this will only log if the redirect did not work
          console.log(response.error);
        })
        .catch((error) => {
          // wrong API key? you will see the error message here
          console.log(error);
        });
    });
  }

  return (
    <div className="cart-layout">
      <div>
        <h1>Your Cart</h1>
        {cart.length === 0 && (
          <p>You have not added any product to your cart yet.</p>
        )}
        {cart.length > 0 && (
          <>
            <table className="table table-cart">
              <thead>
                <tr>
                  <th width="25%" className="th-product">
                    Product
                  </th>
                  <th width="20%">Unit price</th>
                  <th width="10%">Quanity</th>
                  <th width="25%">Total</th>
                  <th width="10%"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                    <tr key={product.productId}>
                      <td>
                        <img
                          src={product.image}
                          width="30"
                          height="30"
                          alt=""
                        />{" "}
                        {product.name}
                      </td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <strong>${(product.price * product.quantity).toFixed(2)}</strong>
                      </td>
                      <td>
                        <Button
                          outline
                          onClick={() => dispatch(removeProduct(product.productId))}
                          className="product-delete"
                        >
                          x
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="2"></th>
                  <th className="cart-highlight">Total</th>
                  <th className="cart-highlight">${totalPrice}</th>
                </tr>
              </tfoot>
            </table>
            <form className="pay-form" onSubmit={handleFormSubmit}>
              <p>
                Enter your email and then click on pay and your products will be
                delivered to you on the same day!
                <br />
              </p>
              <Input
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                required
              />
              <Button type="submit">Pay</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
