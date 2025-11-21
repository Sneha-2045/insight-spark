import { User } from './api';
import { setToken, removeToken, authApi } from './api';

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Set current user in localStorage
export const setCurrentUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Clear user data from localStorage
export const clearUser = (): void => {
  removeToken();
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

// Login user and store token and user data
export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await authApi.login({ email, password });
  
  if (response.success && response.data) {
    setToken(response.data.token);
    setCurrentUser(response.data.user);
    return response.data.user;
  }
  
  throw new Error(response.message || 'Login failed');
};

// Signup user and store token and user data
export const signupUser = async (
  name: string,
  email: string,
  password: string,
  role: 'student' | 'teacher' | 'society'
): Promise<User> => {
  const response = await authApi.signup({ name, email, password, role });
  
  if (response.success && response.data) {
    setToken(response.data.token);
    setCurrentUser(response.data.user);
    return response.data.user;
  }
  
  throw new Error(response.message || 'Signup failed');
};

// Logout user
export const logoutUser = (): void => {
  clearUser();
};

// Verify token and refresh user data
export const verifyAuth = async (): Promise<User | null> => {
  try {
    const response = await authApi.verifyToken();
    if (response.success && response.data) {
      setCurrentUser(response.data.user);
      return response.data.user;
    }
    return null;
  } catch {
    clearUser();
    return null;
  }
};

