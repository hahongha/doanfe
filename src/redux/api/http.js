import axios, { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { authenticationPath } from './authenticationPath.login';
import auth from './auth.api';
import userAPI from './use.api';

class Http {
  constructor() {
    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_REACT_APP_URL_BACKEND,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.refreshTokenRequest = null;

    this.handleLogout = () => {
      this.accessToken = null;
      this.refreshToken = null;
      this.profile = null;
      localStorage.clear();
      window.location.href = '/login';
    };

    this.instance.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.Authorization = 'Bearer ' + this.accessToken;
      }
      return config;
    });

    this.instance.interceptors.response.use(
      async (response) => {
        const { url } = response.config;
        if (url === authenticationPath.login) {
          const data = response.data;
          this.accessToken = data.accessToken;
          this.refreshToken = data.refreshToken;
          localStorage.setItem('access_token', this.accessToken);
          localStorage.setItem('refresh_token', this.refreshToken);

          let profile = await userAPI.getProfile();
          this.profile = profile.data.data;
          localStorage.setItem('profile', JSON.stringify(this.profile));
          localStorage.setItem('scope', this.profile.userType)
          // Gọi API lấy role sau khi đăng nhập thành công
          // await this.fetchRole();
        } else if (url === authenticationPath.logout) {
          this.handleLogout();
        }
        return response;
      },
      (error) => {
        if (error?.response?.status === HttpStatusCode.InternalServerError) {
          const data = error.response?.data;
          const message = data?.message || 'Server Error.';
          if (message !== 'Access is denied') {
            toast.error(message);
          }
          return Promise.reject(error);
        } else if (error.response.status === 401) {
          if (!this.refreshTokenRequest) {
            this.refreshTokenRequest = auth.refreshToken().finally(() => {
              this.refreshTokenRequest = null;
            });
          }

          return this.refreshTokenRequest
            .then(async (data) => {
              const { accessToken, refreshToken } = data.data;
              this.accessToken = accessToken;
              this.refreshToken = refreshToken;
              localStorage.setItem('access_token', accessToken);
              localStorage.setItem('refresh_token', refreshToken);

              error.config.headers.Authorization = 'Bearer ' + accessToken;
              return this.instance(error.config); // Retry the original request
            })
            .catch((refreshTokenError) => {
              this.handleLogout();
              return Promise.reject(refreshTokenError);
            });
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
