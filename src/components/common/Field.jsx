import React from 'react';
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
  return (
    <div className={styles.fieldContainer}>
      {label && (
        <label className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
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
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
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
