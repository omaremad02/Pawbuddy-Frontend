// src/common/Navbar.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";

const Navbar = ({ title }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarHeader}>
        <button onClick={toggleNav} className={styles.menuButton}>
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
        </button>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div
        className={`${styles.navbarMenu} ${isNavOpen ? styles.open : ""}`}
      >
        <button onClick={toggleNav} className={styles.closeButton}>
          &times;
        </button>
        <button className={styles.navButton}>Adoption Requests</button>
        <button className={styles.navButton}>Settings</button>
        <button className={styles.navButton}>Help</button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
