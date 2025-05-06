import { authenticationPath } from './authenticationPath.login';
import http from './http';

const auth = {
  loginAccount: function (body) {
    return http.post(authenticationPath.login, body);
  },
  refreshToken: function () {
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      return http.post(`${authenticationPath.refreshToken}?refreshtoken=${refresh_token}`);
    } catch (error) {
      localStorage.clear();
      throw error;
    }
  },
  getUserInfo: () => http.get(authenticationPath?.userInfo),
  logout: async (data) => {
    try {
      // Gửi yêu cầu đến endpoint đăng xuất nếu cần
      await http.post(authenticationPath.logout, data);

      // Xóa thông tin xác thực khỏi localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('profile');

      // Điều hướng đến trang đăng nhập hoặc trang khác nếu cần
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
      // Xử lý lỗi đăng xuất nếu cần
    }
  }
};

export default auth;
