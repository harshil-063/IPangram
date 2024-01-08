
import api from '../services/api';

export const signUp = async (formData) => {
  try {
    await api.post('/auth/signup', formData);
  } catch (error) {
    throw error;
  }
};

export const logIn = async (formData) => {
  try {
    const response = await api.post('/auth/login', formData);
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    throw error;
  }
};
