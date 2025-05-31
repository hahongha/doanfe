import http from 'src/redux/api/http';

export const searchPayment = async (data) => {
  const response = await http.post(`/payment/search`, data);
  return response;
};
export const getAllPayment = async () => {
  const response = await http.get(`/payment/getAll`);
  return response;
};
export const addPayment = async (data) => {
  const response = await http.post(`/payment`, data);
  return response;
};

export const deletePayment = async (id) => {
  const response = await http.delete(`/payment/${id}`);
  return response;
};

export const updatePayment = async (data) => {
  const response = await http.put(`/payment`, data);
  return response;
};
