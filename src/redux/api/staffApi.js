import http from 'src/redux/api/http';
export const searchStaff = async (data) => {
  const response = await http.post(`/staff/search`, data);
  return response;
};
export const getAllStaff = async () => {
  const response = await http.get(`/staff/getAll`);
  return response;
};
export const addStaff = async (data) => {
  const response = await http.post(`/staff`, data);
  return response;
};

export const deleteStaff = async (id) => {
  const response = await http.delete(`/staff/${id}`);
  return response;
};

export const updateStaff = async (data) => {
  // const response = await http.put(`/staff`, data);
  const response = await http.put(`/staff`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
};
