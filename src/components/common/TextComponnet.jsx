import React from "react";
import styles from "./TextComponnet.module.css"; // Assuming you use CSS modules for styling

const TextComponent = ({ children, color = "#000", size = "1rem", weight = "normal", align = "left", style = {} }) => {
    return (
      <p
        className={styles.text}
        style={{
          color,
          fontSize: size,
          fontWeight: weight,
          textAlign: align,
          ...style, // Allow overriding styles
        }}
      >
        {children}
      </p>
    );
  };
export default TextComponent;
