import http from 'src/redux/api/http';

export const searchService = async (data) => {
  const response = await http.post(`/service/search`, data);
  return response;
};
export const getAllService = async () => {
  const response = await http.get(`/service/getAll`);
  return response;
};
export const addService = async (data) => {
  const response = await http.post(`/service`, data);
  return response;
};

export const deleteService = async (id) => {
  const response = await http.delete(`/service/${id}`);
  return response;
};

export const updateService = async (data) => {
  const response = await http.put(`/service`, data);
  return response;
};
