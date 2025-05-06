import http from 'src/redux/api/http';
export const searchEW = async (data) => {
  const response = await http.post(`/ew/search`, data);
  return response;
};
export const getAllEW = async () => {
  const response = await http.get(`/ew/getAll`);
  return response;
};
export const addEW = async (data) => {
  const response = await http.post(`/ew`, data);
  return response;
};

export const deleteEW = async (id) => {
  const response = await http.delete(`/ew/${id}`);
  return response;
};

export const updateEW = async (data) => {
  const response = await http.put(`/ew`, data);
  return response;
};
