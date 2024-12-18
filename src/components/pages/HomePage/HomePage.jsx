// src/components/pages/HomePage/HomePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import VideoBackground from "../../common/Videobackground";
import Title from "../../common/Title";
import PageTransition from "../../common/PageTransition";
import styles from "./HomePage.module.css";

const HomePage = () => {
  // eslint-disable-next-line
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <PageTransition currentPage={currentPage}>
      <div className={styles.container}>
        <VideoBackground src="/video.mp4" />
        <div className={styles.content}>
          <Title text="Pawbuddy" level={1} />
          <Link to="/login" className={styles.link}>
            Log In
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
