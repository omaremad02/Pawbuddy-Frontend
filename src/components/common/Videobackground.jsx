import React from 'react';
import PropTypes from 'prop-types';
import styles from './Videobackground.module.css';

const VideoBackground = ({ src, type = 'video', alt = '', className = '' }) => {
  return (
    <div className={`${styles.backgroundContainer} ${className}`}>
      {type === 'video' ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.background}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={src} alt={alt} className={styles.background} />
      )}
    </div>
  );
};

VideoBackground.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['video', 'image']),
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default VideoBackground;
