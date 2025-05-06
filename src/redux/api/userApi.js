import http from 'src/redux/api/http';

export const searchUser = async (data) => {
  const response = await http.post(`/user/search`, data);
  return response;
};
export const getAllUser = async () => {
  const response = await http.get(`/user/all`);
  return response;
};
export const addUser = async (data) => {
  const response = await http.post(`/user`, data);
  return response;
};

export const deleteUser = async (id) => {
  const response = await http.delete(`/user/${id}`);
  return response;
};

export const updateUser = async (data) => {
  const response = await http.put(`/user`, data);
  return response;
};

export const updateProfile = async (data) => {
  const response = await http.put(`/user/userProfile`, data);
  return response;
};

export const updatePassword = async (data) => {
  const response = await http.put(`/user/updatepassword`, data);
  return response;
};