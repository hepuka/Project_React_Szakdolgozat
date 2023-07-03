import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.scss";

import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [cartItems, dispatch]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <div className={`container ${styles.table}`}>
      <h2>1.asztal megrendelés összesítő</h2>
      {cartItems.length === 0 ? (
        <>
          <p>Nincs rendelés leadva</p>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Sorszám</th>
                <th>Termék neve</th>
                <th>Egységár</th>
                <th>Mennyiség</th>
                <th>Összeg</th>
                <th>Művelet</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cart, index) => {
                const { id, name, price, cartQuantity } = cart;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                    </td>
                    <td>{price}</td>
                    <td>
                      <div className={styles.count}>
                        <button
                          className="--btn"
                          onClick={() => decreaseCart(cart)}
                        >
                          -
                        </button>
                        <p>
                          <b>{cartQuantity}</b>
                        </p>
                        <button
                          className="--btn"
                          onClick={() => increaseCart(cart)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{(price * cartQuantity).toFixed(2)}</td>
                    <td className={styles.icons}>
                      <FaTrashAlt
                        size={19}
                        color="red"
                        onClick={() => removeFromCart(cart)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={styles.summary}>
            <div>
              <button className="--btn --btn-primary" onClick={clearCart}>
                Rendelések törlése
              </button>
            </div>

            <div className={styles.checkout}>
              <p>
                <b> {`Tételek száma: ${cartTotalQuantity}`}</b>
              </p>
              <div className={styles.text}>
                <h4>Összeg:</h4>
                <h3>{`${cartTotalAmount.toFixed(2)} Ft`}</h3>
              </div>
              <p>Az összeg 25% ÁFA-t tartalmaz</p>
              <button className="--btn --btn-primary" onClick={checkout}>
                Fizetés leadása
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
