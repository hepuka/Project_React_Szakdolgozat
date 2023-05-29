import React, { useEffect } from "react";
import InfoBox from "../../infoBox/InfoBox.component";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";

import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";

import {
  CALC_TOTAL_ORDER_AMOUNT,
  selectOrderHistory,
  selectTotalOrderAmount,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";

const Home = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);
  const fbProducts = useFetchCollection("kunpaosproducts");
  const { data } = useFetchCollection("kunpaosorders");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );

    dispatch(STORE_ORDERS(data));

    dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, fbProducts]);

  return (
    <div className={styles.home}>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Bevétel"}
          count={`${totalOrderAmount} Ft`}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Termékek száma"}
          count={products.length}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Összes megrendelés"}
          count={orders.length}
        />
      </div>
    </div>
  );
};

export default Home;
