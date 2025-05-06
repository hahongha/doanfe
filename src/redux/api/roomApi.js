import http from 'src/redux/api/http';

export const searchRoom = async (data) => {
  const response = await http.post(`/room/search`, data);
  return response;
};
export const getAllRoom = async () => {
  const response = await http.get(`/room/getAll`);
  return response;
};
export const addRoom = async (data) => {
  const response = await http.post(`/room`, data);
  return response;
};

export const deleteRoom = async (id) => {
  const response = await http.delete(`/room/${id}`);
  return response;
};

export const updateRoom = async (data) => {
  const response = await http.put(`/room`, data);
  return response;
};
