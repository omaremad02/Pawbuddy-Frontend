import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ children, className = '', size = 'medium', style = {} }) => {
  const sizeClass = styles[`card--${size}`] || '';

  return (
    <div className={`${styles.card} ${sizeClass} ${className}`} style={style}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  style: PropTypes.object,
};

export default Card;
