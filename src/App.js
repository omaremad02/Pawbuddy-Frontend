import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Apply from './Apply';
import Dashboard from './DashboardShelter';
import Home from './Home';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/apply" element={<Apply />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
    </BrowserRouter>
);

export default App;

