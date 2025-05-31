import http from 'src/redux/api/http';
export const searchBill = async (data) => {
  const response = await http.post(`/bill/search`, data);
  return response;
};
export const getAllBill = async () => {
  const response = await http.get(`/bill/getAll`);
  return response;
};

export const getBillById = async (id) => {
  const response = await http.get(`/bill/${id}`);
  return response;
};

export const addBill = async (data) => {
  const response = await http.post(`/bill`, data);
  return response;
};

export const deleteBill = async (id) => {
  const response = await http.delete(`/bill/${id}`);
  return response;
};

export const updateBill = async (data) => {
  const response = await http.put(`/bill`, data);
  return response;
};
