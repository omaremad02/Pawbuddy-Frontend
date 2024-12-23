import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ label, onClick, type = 'button', variant = 'primary', className = '', style = {} }) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      style={style} // Apply the style prop here
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  className: PropTypes.string,
  style: PropTypes.object, // Add PropTypes for style
};

export default Button;
