const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'society';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'society';
}

// Get auth token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Set auth token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Remove auth token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem('token');
};

// Make API request with authentication
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

// Auth API functions
export const authApi = {
  signup: async (data: SignupData): Promise<ApiResponse<AuthResponse>> => {
    return apiRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest<{ user: User }>('/auth/me', {
      method: 'GET',
    });
  },

  verifyToken: async (): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest<{ user: User }>('/auth/verify', {
      method: 'POST',
    });
  },
};

// Dashboard API functions
export const dashboardApi = {
  getStudentDashboard: async (): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest<{ user: User }>('/dashboard/student', {
      method: 'GET',
    });
  },

  getTeacherDashboard: async (): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest<{ user: User }>('/dashboard/teacher', {
      method: 'GET',
    });
  },

  getSocietyDashboard: async (): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest<{ user: User }>('/dashboard/society', {
      method: 'GET',
    });
  },
};

