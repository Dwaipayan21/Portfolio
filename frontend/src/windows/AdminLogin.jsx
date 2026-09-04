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

      alert('Login successful!');//success popup

      closeWindow('adminLogin');

    } catch (error) {
      setError(error.message);

      alert(error.message); // error popup
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
        <div id="window-header">
          <WindowControl target="adminLogin" />
          <h2>Admin Login</h2>
        </div>

        {/* Content */}
        <div className='bg-white rounded-b-xl'>
          <form
            onSubmit={handleLogin}
            className="p-6 flex flex-col gap-4 "
          >

            <div>
              <label className="text-sm">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 outline-none"
              />
            </div>

            <div>
              <label className="text-sm">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 outline-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-md hover:opacity-80 transition"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

          </form>
        </div>
    </>
  );
};

const AdminLoginWindow = WindowWrapper( AdminLogin,'adminLogin');

export default AdminLoginWindow;