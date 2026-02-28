import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Layout from './components/Layout';
import { getToken } from './api/auth';

function PrivateRoute({ children }) {
    if (!getToken()) return <Navigate to="/login" replace />;
    return children;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/privacy" element={<Privacy />} />

                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Layout><Dashboard /></Layout>
                    </PrivateRoute>
                } />
                <Route path="/settings" element={
                    <PrivateRoute>
                        <Layout><Settings /></Layout>
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
