import React from "react";
import welcome from "../../assets/cafe.png";
import styles from "./Welcome.module.scss";

const Welcome = () => {
  return (
    <div className={styles.centered}>
      <h1>Üdvözöljük</h1>
      <h2>KunPao's Coffee POS</h2>
    </div>
  );
};

export default Welcome;
