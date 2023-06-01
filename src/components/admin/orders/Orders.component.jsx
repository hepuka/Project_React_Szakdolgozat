import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Loader from "../../loader/Loader.component";
import styles from "./Orders.module.scss";
import {
  selectOrderHistory,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";

const Orders = () => {
  const { data, isLoading } = useFetchCollection("kunpaosorders");
  const orders = useSelector(selectOrderHistory);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.table}>
        <p>
          Válassz egy rendelést a részleteinek <b>megtekintésére</b>
        </p>
        <br />

        {orders.length === 0 ? (
          <p>No order found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sorszám</th>
                <th>Rendelés dátuma</th>
                <th>Rendelés azonosítója</th>
                <th>Rendelés összege</th>
                <th>Felszolgáló neve</th>
                <th>Rendelés állapota</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const {
                  id,
                  orderDate,
                  orderTime,
                  orderAmount,
                  userName,
                  orderStatus,
                } = order;
                return (
                  <tr key={id} onClick={() => handleClick(id)}>
                    <td>{index + 1}</td>
                    <td>
                      {orderDate} at {orderTime}
                    </td>
                    <td>{id}</td>
                    <td>{orderAmount} Ft</td>
                    <td>{userName}</td>

                    <td>
                      <p>{orderStatus}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Orders;
