import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.scss";

import {
  ADD_TO_CART2,
  CALCULATE_SUBTOTAL2,
  CALCULATE_TOTAL_QUANTITY2,
  CLEAR_CART2,
  DECREASE_CART2,
  REMOVE_FROM_CART2,
  SAVE_URL,
  selectCartItems2,
  selectCartTotalAmount,
  selectCartTotalQuantity2,
} from "../../redux/slice/cartSlice";

import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card.component";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const Cart2 = () => {
  const cartItems2 = useSelector(selectCartItems2);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity2);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART2(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART2(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART2(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART2());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL2());
    dispatch(CALCULATE_TOTAL_QUANTITY2());
    dispatch(SAVE_URL(""));
  }, [cartItems2, dispatch]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details2");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>2.asztal megrendelés összesítő</h2>
        {cartItems2.length === 0 ? (
          <>
            <p>Nincs rendelés leadva</p>
            <br />
            <div>
              <Link to="/menu">&larr; Vissza</Link>
            </div>
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
                {cartItems2.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
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
              <button className="--btn --btn-danger" onClick={clearCart}>
                Rendelések törlése
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/menu">&larr; vissza</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b> {`Tételek száma: ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Összeg:</h4>
                    <h3>{`${cartTotalAmount.toFixed(2)} Ft`}</h3>
                  </div>
                  <p>Az összeg 25% ÁFA-t tartalmaz</p>
                  <button
                    className="--btn --btn-primary --btn-block"
                    onClick={checkout}
                  >
                    Fizetés leadása
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart2;
