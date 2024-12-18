import React from "react";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const StepTransition = ({ children, currentStep, direction }) => {
  const getAnimationDirection = () => {
    return {
      initial: { opacity: 0, x: direction === 'forward' ? 100 : -100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: direction === 'forward' ? -100 : 100 },
      transition: { duration: 2 },
    };
  };

  return (
    <motion.div key={currentStep} {...getAnimationDirection()}>
      {children}
    </motion.div>
  );
};

StepTransition.propTypes = {
  children: PropTypes.node.isRequired,
  currentStep: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
};

export default StepTransition;
