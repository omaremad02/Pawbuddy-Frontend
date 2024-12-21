// src/components/pages/HelpPage.jsx
import React from "react";
import Navbar from "../../common/Navbar";
import styles from "./HelpPage.module.css";

const HelpPage = () => {
  return (
    <div className={styles.pageContainer}>
      <Navbar title="Help" />
      <div className={styles.contentContainer}>
        <h2>Help</h2>
        <div className={styles.helpContainer}>
          <h3>Frequently Asked Questions</h3>
          <ul>
            <li>How do I add a pet? - Navigate to the dashboard and click "Add Pet."</li>
            <li>How do I edit settings? - Go to the settings page and update your preferences.</li>
            <li>Who do I contact for support? - Email support@shelterapp.com.</li>
          </ul>
          <h3>Contact Support</h3>
          <p>Email us at: support@shelterapp.com</p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
