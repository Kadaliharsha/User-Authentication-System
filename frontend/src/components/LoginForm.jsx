import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './FormStyles.css';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);

      if (res.data?.message === 'OTP sent to your email/phone.') {
        // ✅ Save email to localStorage for OTP verification
        localStorage.setItem('email', form.email);
        navigate('/otp');
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      console.error('Login error:', err);
      navigate('/error');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="form-logo">🔐</div>
        <h2>Login</h2>
      </div>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '18px', fontSize: '0.98rem' }}>
        Don't have an account?{' '}
        <span style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/register')}>
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
