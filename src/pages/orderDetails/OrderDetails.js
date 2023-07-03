import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.jpg";
import styles from "./OrderDetails.module.scss";
import ChangeOrderStatus from "../../components/admin/changeOrderStatus/ChangeOrderStatus.component";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("kunpaosorders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <div className={`container ${styles.table}`}>
      <div>
        <Link to="/orders">&larr; Back To Orders</Link>
      </div>
      <br />
      {order === null ? (
        <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
      ) : (
        <>
          <span>
            <b>Megrendelés azonosító: </b> {order.id}
          </span>
          <br />
          <span>
            <b>Rendelés összege: </b> {`${order.orderAmount} Ft`}
          </span>
          <br />
          <span>
            <b>Rendelés állapota:</b> {order.orderStatus}
          </span>

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
                    <td>{price}</td>
                    <td>{cartQuantity}</td>
                    <td>{(price * cartQuantity).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {order.orderStatus !== "Fizetve" ? (
            <ChangeOrderStatus order={order} id={id} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default OrderDetails;
