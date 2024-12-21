// src/components/pages/SettingsPage.jsx
import React from "react";
import Navbar from "../../common/Navbar";
import styles from "./SettingsPage.module.css";
import Field from "../../common/Field";
import Button from "../../common/Button";

const SettingsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <Navbar title="Settings" />
      <div className={styles.contentContainer}>
        <h2>Settings</h2>
        <div className={styles.settingsContainer}>
          <Field
            label="Email Notifications"
            type="checkbox"
            onChange={(e) => console.log(e.target.checked)}
          />
          <Field
            label="Account Privacy"
            type="checkbox"
            onChange={(e) => console.log(e.target.checked)}
          />
          <Field
            label="Change Password"
            type="password"
            placeholder="Enter new password"
          />
          <Button label="Save Changes" onClick={() => console.log("Settings Saved!")} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
