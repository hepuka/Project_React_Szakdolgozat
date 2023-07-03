import React from "react";
import styles from "./Footer.module.scss";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <div className={styles.footer}>
      <h2>
        &copy; 2022 - {year}, Created by Zoltan KUN-FAGYAL - All Rights Reserved
      </h2>
    </div>
  );
};

export default Footer;
