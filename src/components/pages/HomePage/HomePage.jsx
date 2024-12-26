import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import VideoBackground from "../../common/Videobackground";
import PageTransition from "../../common/PageTransition";
import Header from "../../Header/Header";
import styles from "./HomePage.module.css";
import useUser from "../../../utils/hooks/fetchUserHook";
import { Box, CircularProgress } from "@mui/material";
import { navigateBasedOnRole } from "../../../utils/navigation/navigateBasedOnRole";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, loading } = useUser(); // Fetch user data

  useEffect(() => {
    if (user) {
      // If user data is available, navigate based on the user's role
      navigateBasedOnRole(user, navigate);
    }
  }, [user, navigate]); // Only run when user changes

  if (loading) {
    // Show loading spinner while fetching user data
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={styles.container}>
      <VideoBackground src="/video.mp4" />
      <div className={styles.content}>
        <Header />
        <Link to="/login" className={styles.link}>
          Log In
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
