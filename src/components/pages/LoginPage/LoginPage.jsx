import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import VideoBackground from "../../common/Videobackground";
import Field from "../../common/Field";
import Button from "../../common/Button";
import Card from "../../common/Card";
import PageTransition from "../../common/PageTransition";
import Swal from "sweetalert2";
import Spinner from "../../common/Spinner";
import styles from "./LoginPage.module.css";
import endpoints from "../../../utils/apiEndpoints";
import useUser from "../../../utils/hooks/fetchUserHook";

const LoginPage = () => {
  const { setUser } = useUser(); // Use the user hook to set user data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

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
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Set user using the hook
      setUser(user);

      // Use the custom hook to navigate based on the user's role

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid credentials or server error.";
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
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
            <span className={styles.link} onClick={() => Navigate("/apply")}>
              Apply!
            </span>
          </p>
        </Card>
      </div>
    </PageTransition>
  );
};

export default LoginPage;
