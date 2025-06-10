import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="form-container" style={{ maxWidth: 400 }}>
      <div className="form-header">
        <div className="form-logo" style={{ fontSize: '2.5rem' }}>😢</div>
        <h2>Something went wrong</h2>
      </div>
      <p style={{ color: '#e74c3c', fontSize: '1.08rem', textAlign: 'center', marginBottom: 24 }}>
        Sorry, we couldn't process your request.<br />
        Please try again or contact support if the issue persists.
      </p>
      <button className="logout-btn" onClick={() => navigate('/')}>Go to Login</button>
    </div>
  );
};

export default ErrorPage;