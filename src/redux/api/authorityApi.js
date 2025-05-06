import http from 'src/redux/api/http';

export const searchAuthority = async (data) => {
  const response = await http.post(`/authority/search`, data);
  return response;
};
export const getAllAuthority = async () => {
  const response = await http.get(`/authority/getAll`);
  return response;
};
export const addAuthority = async (data) => {
  const response = await http.post(`/authority/`, data);
  return response;
};

export const deleteAuthority = async (id) => {
  const response = await http.delete(`/authority/${id}`);
  return response;
};

export const updateAuthority = async (data) => {
  const response = await http.put(`/authority/`, data);
  return response;
};
