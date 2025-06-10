import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    API.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.error('Token invalid or expired', err);
        localStorage.removeItem('token');
        navigate('/');
      });
  }, []);

  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="dashboard-container">
      <div className="form-header">
        <div className="form-logo">👤</div>
        <h2>Welcome, {user.name}</h2>
      </div>
      {user.profileImage && (
        <img
          src={`http://localhost:5000/uploads/${user.profileImage}`}
          alt="Profile"
          className="profile-img"
        />
      )}
      <p><b>Email:</b> {user.email}</p>
      <p><b>Company:</b> {user.company}</p>
      <p><b>Age:</b> {user.age}</p>
      <p><b>Date of Birth:</b> {new Date(user.dob).toLocaleDateString()}</p>
      <button className="logout-btn" onClick={() => {
        localStorage.removeItem('token');
        navigate('/');
      }}>🚪 Logout</button>
      <button
        className="delete-account-btn"
        style={{ marginTop: 12 }}
        onClick={async () => {
          if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
              const token = localStorage.getItem('token');
              await API.delete('/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
              });
              localStorage.removeItem('token');
              navigate('/');
            } catch (err) {
              alert('Failed to delete account. Please try again.');
            }
          }
        }}
      >🗑️ Delete Account</button>
    </div>
  );
};

export default Dashboard;
