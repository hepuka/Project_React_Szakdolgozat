import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.scss";

const Cart2 = () => {
  return (
    <section>
      {/*  <div className={`container ${styles.table}`}>
        <h2>1.asztal megrendelés összesítő</h2>
        {cartItems.length === 0 ? (
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
                {cartItems.map((cart, index) => {
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
      </div> */}
    </section>
  );
};

export default Cart2;
