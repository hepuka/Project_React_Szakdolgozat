import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
      <div>
        <h2>404</h2>
        <p>KunPao's Coffee</p>
        <p>Az oldal nem található</p>
        <button className="--btn --btn-primary">
          <Link to="/welcome">Vissza a főoldalra</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
