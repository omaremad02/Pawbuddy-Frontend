// src/common/PageTransition.jsx
import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const PageTransition = ({ children, currentPage }) => {
  const getAnimationDirection = () => {
    return {
      initial: { opacity: 0, x: currentPage > 0 ? 100 : -100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: currentPage > 0 ? -100 : 100 },
      transition: { duration: 0.5 },
    };
  };

  return (
    <motion.div key={currentPage} {...getAnimationDirection()}>
      {children}
    </motion.div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default PageTransition;
