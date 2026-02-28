import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Privacy from './pages/Privacy';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* La Landing no lleva el menú lateral */}
        <Route path="/" element={<Landing />} />

        {/* Las páginas internas SI llevan el menú lateral */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  );
}

export default App;