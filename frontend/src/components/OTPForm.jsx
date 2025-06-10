import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

const OTPForm = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/verify-otp', { email, otp });

      if (res.data.token) {
        alert('OTP verified and login successful!');
        localStorage.setItem('token', res.data.token);
        localStorage.removeItem('email');
        navigate('/dashboard'); // or any protected route
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      console.error('OTP verify error:', err);
      navigate('/error');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="form-logo">🔑</div>
        <h2>Enter OTP</h2>
      </div>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="6-digit OTP"
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OTPForm;
