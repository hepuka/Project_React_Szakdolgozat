import React from "react";
import styles from "./ProductItem.module.scss";
import Card from "../../../card/Card.component";
import {
  ADD_TO_CART,
  ADD_TO_CART2,
  CALCULATE_TOTAL_QUANTITY,
  CALCULATE_TOTAL_QUANTITY2,
} from "../../../../redux/slice/cartSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({
  product,
  grid,
  id,
  name,
  price,
  packaging,
  desc,
  imageURL,
}) => {
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");

      return shortenedText;
    }

    return text;
  };

  const addtoCart = () => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const addtoCart2 = () => {
    dispatch(ADD_TO_CART2(product));
    dispatch(CALCULATE_TOTAL_QUANTITY2());
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <div className={styles.img}>
        <img src={imageURL} alt={name} />
      </div>

      <div className={styles.content}>
        <div className={styles.details}>
          <h4>{shortenText(name, 18)}</h4>
          <h4>{`${packaging}`}</h4>
          <h4>{`${price} Ft`}</h4>
        </div>

        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}

        <div className="--flex-around">
          <div>
            <button
              className="--btn --btn-danger"
              onClick={() => addtoCart(product)}
            >
              1.asztal
            </button>
          </div>
          <div>
            <button
              className="--btn --btn-danger"
              onClick={() => addtoCart2(product)}
            >
              2.asztal
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
