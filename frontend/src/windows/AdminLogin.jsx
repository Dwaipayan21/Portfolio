
import WindowControl from '@/components/WindowControl';
import WindowWrapper from '@/hoc/WindowWrapper';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import useWindowStore from '@/store/window';
import api from '@/lib/api';

const AdminLogin = () => {
  const { checkAuth } = useAuth();
  const { closeWindow } = useWindowStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      // Uses localhost in development and Render in production
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // Refresh authentication state after successful login
      await checkAuth();

      alert('Login successful!');

      closeWindow('adminLogin');

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Invalid credentials';

      setError(message);

      alert(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      {/* Header */}
      <div id="window-header">
        <WindowControl target="adminLogin" />
        <h2>Admin Login</h2>
      </div>

      {/* Content */}
      <div className="login-body">
        <form onSubmit={handleLogin}>

          <div className="field">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="field">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>
      </div>
    </div>
  );
};

const AdminLoginWindow = WindowWrapper(AdminLogin, 'adminLogin');

export default AdminLoginWindow;