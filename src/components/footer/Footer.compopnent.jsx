import React from "react";
import styles from "./Footer.module.scss";
import ShowOnLogin from "../hiddenLink/hiddenLink";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <ShowOnLogin>
      <div className={styles.footer}>
        <h2>
          &copy;{year}, Created by Zoltan KUN-FAGYAL - All Rights Reserved
        </h2>
      </div>
    </ShowOnLogin>
  );
};

export default Footer;
