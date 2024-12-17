import React from "react";
import PropTypes from "prop-types";
import styles from "./RoleSelector.module.css";

const RoleSelector = ({ options, selectedRole, onRoleChange }) => {
  return (
    <div className={styles.roleSelector}>
      {options.map((role) => (
        <label key={role} className={styles.roleLabel}>
          <input
            type="radio"
            value={role}
            checked={selectedRole === role}
            onChange={() => onRoleChange(role)}
            className={styles.roleInput}
          />
          {role}
        </label>
      ))}
    </div>
  );
};

RoleSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedRole: PropTypes.string.isRequired,
  onRoleChange: PropTypes.func.isRequired,
};

export default RoleSelector;
