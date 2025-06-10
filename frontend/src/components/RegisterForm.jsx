import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    age: '',
    dob: '',
  });

  const [image, setImage] = useState(null)
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (image) data.append('profileImage', image);
    
    try {
      await API.post('/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/'); // redirect to login
    } catch (err) {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="form-logo">📝</div>
        <h2>Register</h2>
      </div>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="company" placeholder="Company" onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} />
        <input name="dob" type="date" placeholder="DOB" onChange={handleChange} />
        <input name="profileImage" type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Register</button>
      </form>
      <p style={{ marginTop: '18px', fontSize: '0.98rem' }}>
        Already have an account?{' '}
        <span style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/')}>Login</span>
      </p>
    </div>
  );
};

export default RegisterForm;
