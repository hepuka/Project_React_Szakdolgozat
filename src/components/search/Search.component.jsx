import React from "react";
import styles from "./Search.module.scss";

const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="keresés név alapján"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
