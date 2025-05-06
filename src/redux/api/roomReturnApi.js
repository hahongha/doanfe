import http from 'src/redux/api/http';

export const searchRoomReturn = async (data) => {
  const response = await http.post(`/roomReturn/search`, data);
  return response;
};
export const getAllRoomReturn = async () => {
  const response = await http.get(`/roomReturn/getAll`);
  return response;
};
export const addRoomReturn = async (data) => {
  const response = await http.post(`/roomReturn`, data);
  return response;
};

export const deleteRoomReturn = async (id) => {
  const response = await http.delete(`/roomReturn/${id}`);
  return response;
};

export const updateRoomReturn = async (data) => {
  const response = await http.put(`/roomReturn`, data);
  return response;
};
