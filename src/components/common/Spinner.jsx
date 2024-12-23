// Spinner.js
import React from "react";
import styles from "./Spinner.module.css"; // Define your styles here

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Spinner;
