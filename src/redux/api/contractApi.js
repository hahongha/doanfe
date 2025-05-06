import http from 'src/redux/api/http';

export const searchContract = async (data) => {
  const response = await http.post(`/contract/search`, data);
  return response;
};
export const getAllContract = async () => {
  const response = await http.get(`/contract/getAll`);
  return response;
};
export const addContract = async (data) => {
  const response = await http.post(`/contract`, data);
  return response;
};

export const deleteContract = async (id) => {
  const response = await http.delete(`/contract/${id}`);
  return response;
};

export const updateContract = async (data) => {
  const response = await http.put(`/contract`, data);
  return response;
};
