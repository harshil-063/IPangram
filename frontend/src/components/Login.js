import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../utils/auth';
import { Link } from 'react-router-dom';

const Login = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logIn(formData);
      history('/departments');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Log In
        </button>
      </form>

      <div className="mt-4">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};


export default Login;
