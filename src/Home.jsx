import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Pawbuddy = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Ensures the video reloads properly
    }
  }, []);

  return (
    <div className="container">
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-clip"
      >
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Pawbuddy</h1>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Pawbuddy;
