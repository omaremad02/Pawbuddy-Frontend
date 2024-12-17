import React from 'react';
import PropTypes from 'prop-types';
import styles from './Title.module.css';

const Title = ({ text, level = 1, className = '' }) => {
  const Heading = `h${level}`;

  return <Heading className={`${styles.title} ${className}`}>{text}</Heading>;
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  className: PropTypes.string,
};

export default Title;
