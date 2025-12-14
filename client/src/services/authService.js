
import api from './api';

const authService = {

  register: async ({ email, name, password }) => {
    const res = await api.post('/registration', { email, name, password }, { withCredentials: true });
    return res.data; 
  },

 
  login: async ({ email, password }) => {
    const res = await api.post('/login', { email, password }, { withCredentials: true });
    return res.data;
  },


  logout: async () => {
    const res = await api.post('/logout',{}, { withCredentials: true }); 

    authService.handleLogoutLocal();
    return res.data;
  },

  refresh: async () => {
    const res = await api.get('/refresh', { withCredentials: true });
    return res.data;
  },

  handleLogoutLocal: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
  }
};

export default authService;
