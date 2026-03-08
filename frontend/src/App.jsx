import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Templates from './pages/Templates';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
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
                <Route path="/register" element={<Register />} />
                <Route path="/privacy" element={<Privacy />} />

                <Route path="/onboarding" element={
                    <PrivateRoute>
                        <Onboarding />
                    </PrivateRoute>
                } />
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
                <Route path="/analytics" element={
                    <PrivateRoute>
                        <Layout><Analytics /></Layout>
                    </PrivateRoute>
                } />
                <Route path="/templates" element={
                    <PrivateRoute>
                        <Layout><Templates /></Layout>
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
