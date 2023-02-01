import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../card/Card.component";
import styles from "./CheckoutSummary.module.scss";

import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  console.log(cartItems);
  return (
    <div>
      <div>
        {cartItems.lenght === 0 ? (
          <>
            <p>No item in your cart.</p>
            <button className="--btn">
              <Link to="/menu">Back To Shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Tételek száma: ${cartTotalQuantity}`}</b>
            </p>
            <div className={styles.text}>
              <h4>Végösszeg:</h4>
              <h3>{cartTotalAmount.toFixed(2)} Ft</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <Card key={id} cardClass={styles.card}>
                  <h4>Termék neve: {name}</h4>
                  <p>Mennyiség: {cartQuantity} darab(adag)</p>
                  <p>Egységár: {price} Ft</p>
                  <p>Ár: {price * cartQuantity} Ft</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
