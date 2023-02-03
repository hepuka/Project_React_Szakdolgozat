import React, { useEffect, useState } from "react";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import styles from "./OrderDetails.module.scss";
import spinnerImg from "../../../assets/spinner.jpg";
import { Link, useParams } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("kunpaosorders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={styles.table}>
        <h2>Rendelés részletei</h2>
        <div>
          <Link to="/admin/orders">&larr; Back To Orders</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Rendelés azonosító: </b> {order.id}
            </p>
            <p>
              <b>Rendelés összege: </b> {`${order.orderAmount} Ft`}
            </p>
            <p>
              <b>Rendelés állapota: </b> {order.orderStatus}
            </p>
            <p>
              <b>Felszolgáló:</b> {order.shippingAddress.email}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>Sorszám</th>
                  <th>Termék neve</th>
                  <th>Egységár</th>
                  <th>Mennyiség</th>
                  <th>Végösszeg</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
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
                      <td>{`${price} Ft`}</td>
                      <td>{cartQuantity}</td>
                      <td>{`${(price * cartQuantity).toFixed(2)} Ft`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
