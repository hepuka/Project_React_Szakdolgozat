import React, { useEffect } from "react";
import InfoBox from "../../infoBox/InfoBox.component";
import styles from "./Home.module.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
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

//Icons
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="red" />;

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
      <h2>Üzleti összesítő</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Bevétel"}
          count={`${totalOrderAmount} Ft`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Termékek száma a kínálatban"}
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Összes megrendelés"}
          count={orders.length}
          icon={ordersIcon}
        />
      </div>
    </div>
  );
};

export default Home;
