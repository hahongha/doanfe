import http from 'src/redux/api/http';

export const searchContractMember = async (data) => {
  const response = await http.post(`/contractMember/search`, data);
  return response;
};
export const getAllContractMember = async () => {
  const response = await http.get(`/contractMember/getAll`);
  return response;
};
export const addContractMember = async (data) => {
 const response = await http.post(`/contractMember`, data, {
     headers: {
       'Content-Type': 'multipart/form-data'
     }
   });
  return response;
};

export const deleteContractMember = async (id) => {
  const response = await http.delete(`/contractMember/${id}`);
  return response;
};

export const updateContractMember = async (data) => {
  const response = await http.put(`/contractMember`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  return response;
};
