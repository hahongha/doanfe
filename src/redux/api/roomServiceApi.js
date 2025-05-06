import http from 'src/redux/api/http';

export const searchRoomService = async (data) => {
  const response = await http.post(`/roomService/search`, data);
  return response;
};
export const getAllRoomService = async () => {
  const response = await http.get(`/roomService/getAll`);
  return response;
};
export const addRoomService = async (data) => {
  const response = await http.post(`/roomService`, data);
  return response;
};

export const deleteRoomService = async (id) => {
  const response = await http.delete(`/roomService/${id}`);
  return response;
};

export const updateRoomService = async (data) => {
  const response = await http.put(`/roomService`, data);
  return response;
};
