import http from 'src/redux/api/http';
export const searchRenter = async (data) => {
  const response = await http.post(`/renter/search`, data);
  return response;
};
export const getAllRenter = async () => {
  const response = await http.get(`/renter/getAll`);
  return response;
};
export const addRenter = async (data) => {
  const response = await http.post(`/renter`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
};

export const deleteRenter = async (id) => {
  const response = await http.delete(`/renter/${id}`);
  return response;
};

export const updateRenter = async (data) => {
  // const response = await http.put(`/renter`, data);
  const response = await http.put(`/renter`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
};
