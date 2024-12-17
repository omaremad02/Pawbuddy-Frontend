import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "../../common/Videobackground";
import Field from "../../common/Field";
import Button from "../../common/Button";
import Card from "../../common/Card";
import Title from "../../common/Title";
import styles from "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("Admin");

  const handleRoleChange = (role) => setUserRole(role);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login submitted with user role:", userRole);
  };

  return (
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
          <div className={styles.roleSelection}>
            {["Admin", "Clinic", "Shelter"].map((role) => (
              <label key={role}>
                <input
                  type="radio"
                  value={role}
                  checked={userRole === role}
                  onChange={() => handleRoleChange(role)}
                />
                {role}
              </label>
            ))}
          </div>
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
  );
};

export default LoginPage;
