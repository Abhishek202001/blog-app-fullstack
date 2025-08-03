// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import Navbar from './components/Navbar';
import CreateBlog from './pages/CreateBlog';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={() => navigate('/')} />} />
        <Route path="/signup" element={<Signup onSignup={() => navigate('/login')} />} />
        <Route path="/blogs/:id" element={<BlogPage />} /> 
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateBlog />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
