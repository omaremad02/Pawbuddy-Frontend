import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaHome, FaPaw, FaUser } from "react-icons/fa"; // Example icons
import { Outlet, useNavigate } from "react-router-dom"; // Importing the useNavigate hook
import styles from "./Navbar.module.css";

const Navbar = ({ title, navItems, parsedOutlet }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleSubmenu = (index) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.navbar} ${isNavOpen ? styles.navOpen : ""}`}>
        <button onClick={toggleNav} className={styles.menuButton}>
          {isNavOpen ? "Close" : "Menu"}
        </button>
        <h1 className={`${styles.title} ${isNavOpen ? "" : styles.hidden}`}>
          {title}
        </h1>
        <div className={styles.navItems}>
          {navItems.map((item, index) => (
            <div key={index} className={styles.navItem}>
              <button
                className={styles.navButton}
                onClick={() => {
                  // Navigate to the route when the item is clicked
                  if (item.onClick) {
                    item.onClick();
                  }
                  if (item.route) {
                    navigate(item.route); // Navigate to the route
                  }
                  if (item.subItems) toggleSubmenu(index);
                }}
              >
                {item.icon && <item.icon className={styles.icon} />}
                {isNavOpen && <span>{item.label}</span>}
              </button>
              {item.subItems && (
                <ul
                  className={`${styles.submenu} ${
                    activeItem === index ? styles.openSubmenu : ""
                  }`}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <button
                        className={styles.subItemButton}
                        onClick={() => {
                          // Navigate to the route of the subItem
                          if (subItem.route) {
                            navigate(subItem.route);
                          }
                        }}
                      >
                        {subItem.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        {parsedOutlet ? parsedOutlet : <Outlet />}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      icon: PropTypes.elementType,
      route: PropTypes.string, // Add route prop for navigation
      subItems: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          onClick: PropTypes.func,
          route: PropTypes.string, // Add route prop for subItems
        })
      ),
    })
  ).isRequired,
  parsedOutlet: PropTypes.element,
};

export default Navbar;
