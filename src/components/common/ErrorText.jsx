// ErrorText.js
import React from 'react';
import './ErrorText.css'; // Assuming the CSS file for styles

const ErrorText = ({ message }) => {
  return message ? <div className="errorText">{message}</div> : null;
};

export default ErrorText;
