import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../utils/auth';

const Signup = () => {
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      history.push('/login');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
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
          Sign Up
        </button>
      </form>

      <p className="mt-4">
        Already have an account?{" "}
        <a href="/" className="text-blue-500 hover:underline">
          Go to Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
