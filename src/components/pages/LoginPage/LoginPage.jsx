// src/components/pages/LoginPage/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "../../common/Videobackground";
import Field from "../../common/Field";
import Button from "../../common/Button";
import Card from "../../common/Card";
import Title from "../../common/Title";
import RoleSelector from "./RoleSelector";
import PageTransition from "../../common/PageTransition";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("Admin");
  // eslint-disable-next-line
  const [currentPage, setCurrentPage] = useState(1);

  const handleRoleChange = (role) => setUserRole(role);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login submitted with user role:", userRole);
  };

  return (
    <PageTransition currentPage={currentPage}>
      <div className={styles.container}>
        <VideoBackground src="/video.mp4" />
        <Card>
          <Title text="Log In" level={1} className={styles.title} />
          <p className={styles.subtitle}>Please enter your credentials.</p>
          <form onSubmit={handleLogin} className={styles.form}>
            <Field label="Email" type="email" placeholder="Your email" required />
            <Field
              label="Password"
              type="password"
              placeholder="Password"
              required
            />
            <RoleSelector
              options={["Admin", "Clinic", "Shelter"]}
              selectedRole={userRole}
              onRoleChange={handleRoleChange}
            />
            <Button
              label="Log In"
              onClick={() => navigate("/dashboard")}
              type="submit"
              className={styles.button}
            />
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
