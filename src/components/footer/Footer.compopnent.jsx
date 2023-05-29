import React from "react";
import styles from "./Footer.module.scss";
import ShowOnLogin from "../hiddenLink/hiddenLink";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <ShowOnLogin>
      <div className={styles.footer}>
        &copy;{year}, Created by Zoltan KUN-FAGYAL - All Rights Reserved
      </div>
    </ShowOnLogin>
  );
};

export default Footer;
