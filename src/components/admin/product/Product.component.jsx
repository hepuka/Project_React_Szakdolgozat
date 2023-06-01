import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter.component";
import ProductList from "./productList/ProductList.comoponent";
import spinner from "../../../assets/spinner.jpg";

const Product = () => {
  const { data, isLoading } = useFetchCollection("kunpaosproducts");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <div className={styles.product}>
      <div className={styles.filter}>
        {isLoading ? null : <ProductFilter />}
      </div>
      <div className={styles.content}>
        {isLoading ? (
          <img
            src={spinner}
            alt="spinner"
            style={{ width: "50px" }}
            className="--center-all"
          />
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  );
};

export default Product;
