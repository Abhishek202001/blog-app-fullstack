import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleCreateClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate('/create');
    } else {
      alert('Please login to create a blog.');
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#333', padding: '10px' }}>
      <Link to="/" style={{ color: '#fff', marginRight: '15px' }}>Home</Link>
      <a href="/create" onClick={handleCreateClick} style={{ color: '#fff', marginRight: '15px' }}>
        Create
      </a>

      {!isLoggedIn ? (
        <>
          <Link to="/login" style={{ color: '#fff', marginRight: '15px' }}>Login</Link>
          <Link to="/signup" style={{ color: '#fff' }}>Signup</Link>
        </>
      ) : (
        <button onClick={handleLogout} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
