import WindowControl from '@/components/WindowControl';
import WindowWrapper from '@/hoc/WindowWrapper';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import useWindowStore from '@/store/window';

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
      const response = await fetch(
        'http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
            data.message || 'Invalid credentials'
        );
      }

      await checkAuth();

      alert('Login successful!'); // success popup

      closeWindow('adminLogin');

    } catch (error) {
      setError(error.message);

      alert(error.message); // error popup
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