import http from 'src/redux/api/http';

export const searchRole = async (data) => {
  const response = await http.post(`/role/search`, data);
  return response;
};
export const getAllRole = async () => {
  const response = await http.get(`/role/getAll`);
  return response;
};
export const addRole = async (data) => {
  const response = await http.post(`/role/`, data);
  return response;
};

export const deleteRole = async (id) => {
  const response = await http.delete(`/role/${id}`);
  return response;
};

export const updateRole = async (data) => {
  const response = await http.put(`/role/`, data);
  return response;
};
