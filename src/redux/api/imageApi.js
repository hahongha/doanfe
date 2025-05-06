import http from 'src/redux/api/http';
import http from './http';

// export const addImage = async (data) => {
//   const response = await http.post(`/upload`, data);
//   return response;
// };

export const addImageBase64 = async (data) => {
  const response = await http.post(`/uploadBase64`, data);
  return response;
};

export const addListImage = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('file', file)); // Gửi nhiều ảnh
  const response = await http.post('/upload/files', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response;
};

export const addImage = async (files) => {
  // Gửi nhiều ảnh
  const response = await http.post('/upload/file', files, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response; // Trả về danh sách URL ảnh từ API
};

export const uploadImage = async (id, file) => {
  try {
    // Tạo FormData để gửi file
    const formData = new FormData();
    formData.append('file', file);

    // Gửi request POST
    const response = await http.post(`/upload/user/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Ảnh đã upload:', response.data);
    return response;
  } catch (error) {
    console.error('Lỗi upload ảnh:', error);
    throw error;
  }
};

export const uploadAvatar = async (file) => {
  try {
    // Tạo FormData để gửi file
    const formData = new FormData();
    formData.append('file', file);
    // Gửi request POST
    const response = await http.post(`/user/avatarUpload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Ảnh đã upload:', response.data);
    return response;
  } catch (error) {
    console.error('Lỗi upload ảnh:', error);
    throw error;
  }
};
