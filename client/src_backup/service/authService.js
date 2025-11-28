// src/services/authService.js
import api from './api';

const authService = {
  // реєстрація
  register: async ({ email, name, password }) => {
    const res = await api.post('/registration', { email, name, password });
    return res.data; // { accessToken, refreshToken(cookie), user }
  },

  // логін
  login: async ({ email, password }) => {
    const res = await api.post('/login', { email, password });
    return res.data;
  },

  // logout (сервер видаляє refreshToken з БД + чистить cookie)
  logout: async () => {
    const res = await api.post('/logout'); // withCredentials true встановлено в api
    // локальний clean-up:
    authService.handleLogoutLocal();
    return res.data;
  },

  // refresh — запит на сервер, сервер повертає нові токени
  refresh: async () => {
    // GET /refresh — з cookie (withCredentials = true)
    const res = await api.get('/refresh');
    // повертаємо data (має містити accessToken, user, refreshToken вже в Cookie)
    return res.data;
  },

  handleLogoutLocal: () => {
    localStorage.removeItem('accessToken');
    // додатково можна видаляти userData у localStorage
    localStorage.removeItem('userData');
    // якщо використовується глобальний контекст — його треба оновити (див. AuthProvider)
  }
};

export default authService;
