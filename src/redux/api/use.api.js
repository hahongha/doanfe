// apis/user.api.js
import { authenticationPath } from './authenticationPath.login';
import http from './http';
import { updateProfile } from './userApi';

const userAPI = {
  getProfile: () => http.get(authenticationPath?.userInfo)
};

export default userAPI;
