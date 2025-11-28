// src/services/api.js
import axios from 'axios';
import authService from './authService';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true // ВАЖЛИВО: відправляє cookie (refreshToken)
});

// Додаємо accessToken в заголовки
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обробляємо 401 — пробуємо оновити токен та повторити запит
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Якщо без відповіді або не 401 — пробросимо помилку
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Уникаємо зациклення
    if (originalRequest._retry) return Promise.reject(error);
    originalRequest._retry = true;

    if (isRefreshing) {
      // ставимо в чергу запит, який чекає оновлення токена
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        return api(originalRequest);
      }).catch(err => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const refreshRes = await authService.refresh(); // викликає /refresh
      const newAccessToken = refreshRes.accessToken;
      localStorage.setItem('accessToken', newAccessToken);
      api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
      processQueue(null, newAccessToken);
      isRefreshing = false;

      originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      isRefreshing = false;
      // якщо не вдалося оновити — виконуємо логаут
      authService.handleLogoutLocal();
      return Promise.reject(err);
    }
  }
);

export default api;
