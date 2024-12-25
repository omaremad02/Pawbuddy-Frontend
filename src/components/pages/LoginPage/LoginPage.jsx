import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VideoBackground from "../../common/Videobackground";
import Field from "../../common/Field";
import Button from "../../common/Button";
import Card from "../../common/Card";
import Title from "../../common/Title";
import RoleSelector from "./RoleSelector";
import PageTransition from "../../common/PageTransition";
import styles from "./LoginPage.module.css";
import endpoints from "../../../utils/apiEndpoints";
import Spinner from "../../common/Spinner";
import Swal from "sweetalert2"; // Import SweetAlert2

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please fill in both fields.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(endpoints.LOGIN, { email, password });

      // Assuming the response contains a token and role
      const { token } = response.data;
      const { user } = response.data;


      // Store token in localStorage
      localStorage.setItem("token", token);

      // Navigate based on the user's role
      if (user.role === "Admin") {
        navigate("/Admin");
      } else {
        navigate("/shelter-dashboard");
      }
    } catch (err) {
      // Check if error response exists and display the message
      if (err.response && err.response.data && err.response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Invalid credentials or server error.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className={styles.container}>
        <VideoBackground src="/video.mp4" />
        <Card size="medium">
          <p className={styles.subtitle}>Welcome, please enter your credentials.</p>
          <form onSubmit={handleLogin} className={styles.form}>
            <Field
              label="Email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Field
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
         
            {isLoading ? (
              <Spinner />
            ) : (
              <Button
                label={isLoading ? "Logging in..." : "Log In"}
                type="submit"
                className={styles.button}
                disabled={isLoading}
              />
            )}
          </form>
          <p className={styles.footer}>
            Not with us?{" "}
            <span className={styles.link} onClick={() => navigate("/apply")}>
              Apply!
            </span>
          </p>
        </Card>
      </div>
    </PageTransition>
  );
};

export default LoginPage;
