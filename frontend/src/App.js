import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import OTPForm from './components/OTPForm'; // <-- make sure this exists
import Dashboard from './components/Dashboard';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/otp" element={<OTPForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/error" element={<ErrorPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
