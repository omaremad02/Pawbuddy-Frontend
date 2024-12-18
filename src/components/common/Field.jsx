import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Field.module.css';

const Field = ({
  label,
  type = 'text',
  placeholder = '',
  required = false,
  value,
  onChange,
  textarea = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordField = type === 'password' && !textarea;

  return (
    <div className={styles.fieldContainer}>
      {label && (
        <label className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {textarea ? (
          <textarea
            className={styles.input}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            {...props}
          />
        ) : (
          <input
            className={styles.input}
            type={isPasswordField && showPassword ? 'text' : type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            {...props}
          />
        )}
        {isPasswordField && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={handleTogglePassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>
    </div>
  );
};

Field.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  textarea: PropTypes.bool,
};

export default Field;
