import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Adjust if your Django server runs on different port

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(`${API_BASE_URL}/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await api.post('/login/', { username, password });
    return response.data;
  },
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/register/', { username, email, password });
    return response.data;
  },
  refresh: async (refresh: string) => {
    const response = await api.post('/refresh/', { refresh });
    return response.data;
  },
};

export const ticketsAPI = {
  getTickets: async () => {
    const response = await api.get('/tickets/');
    return response.data;
  },
  createTicket: async (title: string, description: string) => {
    const response = await api.post('/tickets/', { title, description });
    return response.data;
  },
  updateTicket: async (id: number, data: Partial<any>) => {
    const response = await api.patch(`/tickets/${id}/`, data);
    return response.data;
  },
  deleteTicket: async (id: number) => {
    await api.delete(`/tickets/${id}/`);
  },
  getAdminTickets: async () => {
    const response = await api.get('/tickets/');
    return response.data;
  },
};

export default api;