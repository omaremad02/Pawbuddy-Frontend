import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ children, className = '' }) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;