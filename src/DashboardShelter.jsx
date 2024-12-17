// Dashboard.jsx
import React from 'react';
import styles from './Login.module.css';

const Dashboard = () => {
    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div className={styles.card}>
                <h1>Welcome to the Shelter Dashboard</h1>
                <p>This is where you can manage everything!</p>
            </div>
        </div>
    );
};

export default Dashboard;
