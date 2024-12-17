import React from "react";
import { Link } from "react-router-dom";
import VideoBackground from '../../common/Videobackground';
import styles from "./HomePage.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <VideoBackground src="/video.mp4" />
      <div className={styles.content}>
        <h1 className={styles.title}>Pawbuddy</h1>
        <Link to="/login" className={styles.link}>
          Log In
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
