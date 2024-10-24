// src/services/authService.js
import apiClient from '@/helpers/http.js'

class AuthService {
  login(user) {
    return apiClient
      .post('login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          // Stocker le token JWT dans localStorage
          const token = response.data.token;
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          this.user = JSON.parse(jsonPayload);

          // Stocker le token dans localStorage pour persister la session
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('token', token);
        }
        return response.data;
      });
  }

  logout() {
    // Supprimer le token lors de la déconnexion
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }


  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));  // Récupérer le token
  }
}

export default new AuthService();
