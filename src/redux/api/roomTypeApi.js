import http from 'src/redux/api/http';

export const searchRoomType = async (data) => {
  const response = await http.post(`/roomType/search`, data);
  return response;
};
export const getAllRoomType = async () => {
  const response = await http.get(`/roomType/getAll`);
  return response;
};
export const addRoomType = async (data) => {
  const response = await http.post(`/roomType`, data);
  return response;
};

export const deleteRoomType = async (id) => {
  const response = await http.delete(`/roomType/${id}`);
  return response;
};

// export const updateRoomType = async (formData, files) => {
  
//   // const response = await http.put(`/roomType`, data);
//   // const response = await http.put('/roomType', formData, {
//   //   headers: {
//   //       'Content-Type': 'multipart/form-data',  // Chỉ định Content-Type là multipart/form-data
//   //   },
//   // });
//         const formData = new FormData();

//         // Thêm dữ liệu JSON vào FormData (chuyển đổi thành chuỗi JSON)
//         // formData.append('roomType', JSON.stringify(roomTypeDTO));
//         formData.append(
//           "roomType",
//           new Blob([JSON.stringify(roomTypeDTO)], { type: "application/json" })
//         );
  
//         // Thêm các tệp tin vào FormData
//         if (files) {
//             Array.from(files).forEach(file => {
//                 formData.append('file', file);
//             });
//         }

//           const response = await http.put('/roomType', formData, {
//               headers: {
//                   'Content-Type': 'multipart/form-data',  // Chỉ định Content-Type là multipart/form-data
//               },
//         });
//   return response;
// };

export const updateRoomType = async (roomTypeDTO, files) => {
  const formData = new FormData();

  // Thêm dữ liệu JSON vào FormData (chuyển đổi thành chuỗi JSON)
  formData.append(
    "roomType", 
    new Blob([JSON.stringify(roomTypeDTO)], { type: "application/json" })
  );

  // Thêm các tệp tin vào FormData
  if (files) {
    Array.from(files).forEach(file => {
      formData.append('file', file);
    });
  }

  // Gửi PUT request với formData
    const response = await http.put('/roomType', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Chỉ định Content-Type là multipart/form-data
      },
    });
    return response;
};
