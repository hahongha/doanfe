import {
  Card,
  CardMedia,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  Grid2,
  CardActions,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Plus, X } from 'lucide-react';

import http from "src/redux/api/http";
import { toast } from 'react-toastify';
function RoomDialog({ open, handleClose, room, handleSave }) {
  const [selectedRoom, setSelectedRoom] = useState(room? room: {
    id: null,
    roomNumber: '',
    status: 'AVAILABLE',
    isActive: false,
    description: '',
    number: 0,
    electricIndex: 0,
    waterIndex: 0,
    room_Type: { id: 0 },
    images: ['']
  });
  
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  // Effect to reset form when room changes

  const handleChange = (e) => {
    setSelectedRoom((prev) => ({ ...prev, [e.target.name]: e.target.value })); 
  };
  const handleRemoveImage = (index, type) => {
    if (type === 'edit') {
      // Xóa ảnh trong danh sách đã tải lên
      setSelectedRoom((prev) => {
        const newList = [...prev.images]; // Sao chép danh sách hình ảnh hiện tại
        if (index >= 0 && index < newList.length) {
          newList.splice(index, 1); // Xóa ảnh tại vị trí chỉ định
        }
        return { ...prev, images: newList }; // Cập nhật lại trạng thái với danh sách ảnh đã thay đổi
      });
    } else if (type === 'preview') {
      // Xóa ảnh trong danh sách preview
      setPreviewImages((prev) => {
        const newList = [...prev]; // Sao chép danh sách ảnh preview hiện tại
        if (index >= 0 && index < newList.length) {
          newList.splice(index, 1); // Xóa ảnh tại vị trí chỉ định
        }
        return newList; // Cập nhật lại trạng thái với danh sách ảnh đã thay đổi
      });
    }
  };
  

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append(
      "room",
      new Blob([JSON.stringify(selectedRoom)], { type: "application/json" })
    );

    if (files) {
      Array.from(files).forEach(file => {
        formData.append('file', file);
      });
    }
  
    let response;

    toast.info("Loading");
    if (room.id) {
      // Nếu room có id, thực hiện PUT request
      response = await http.put('/room', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Chỉ định Content-Type là multipart/form-data
        },
      });
    } else {
      // Nếu room không có id, thực hiện POST request
      response = await http.post('/room', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Chỉ định Content-Type là multipart/form-data
        },
      });
    }
  
    // Xử lý response sau khi gửi request
    if (response.status === 200) {
      // Thực hiện các hành động sau khi lưu thành công
      toast.success("Lưu thành công");
      // setRender();
      console.log('Lưu thành công:', response.data);
    } else {
      // Xử lý lỗi nếu có
      toast.error("Lưu thất bại");
      // setRender();
      console.error('Lưu thất bại:', response.data);
    }

    handleSave();

  };

  const handleAddImage = (event) => {
    const selectedFiles = event.target.files;
    setFiles(selectedFiles);

    // Sử dụng FileReader để tạo preview cho ảnh
    const imagePreviews = [];
    Array.from(selectedFiles).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imagePreviews.push(reader.result);
        setPreviewImages([...imagePreviews]);
      };
      reader.readAsDataURL(file);  // Đọc file dưới dạng URL
    });
  };

  const statusOptions = [
    { value: 'AVAILABLE', label: 'Trống', color: 'success' },
    { value: 'OCCUPIED', label: 'Có người ở', color: 'primary' },
    { value: 'MAINTENANCE', label: 'Đang sửa chữa', color: 'warning' },
    { value: 'CLEANING', label: 'Đang vệ sinh', color: 'info' },
    { value: 'RESERVED', label: 'Đặt trước', color: 'secondary' },
    { value: 'INACTIVE', label: 'Tạm ngừng cho thuê', color: 'error' },
    { value: 'PENDING', label: 'Chờ thanh lý hợp đồng', color: 'warning' },
    { value: 'INSPECTION', label: 'Đang kiểm tra kỹ thuật', color: 'info' }
  ];

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleClose();
        }
      }}
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Thông tin phòng</Typography>
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Số phòng"
          name="roomNumber"
          fullWidth
          value={selectedRoom.roomNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Mô tả"
          name="description"
          fullWidth
          value={selectedRoom.description}
          onChange={handleChange}
        />
        <Select
          label="Trạng thái"
          fullWidth
          value={selectedRoom.status}
          onChange={handleChange}
          margin="dense"
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          margin="dense"
          label="Chỉ số điện"
          name="electricIndex"
          fullWidth
          type="number"
          value={selectedRoom.electricIndex}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Chỉ số nước"
          name="waterIndex"
          fullWidth
          type="number"
          value={selectedRoom.waterIndex}
          onChange={handleChange}
        />
        <Box display="flex" gap={2} flexWrap="wrap">
                    {/* Hiển thị ảnh đã tải lên từ editForm */}
                    {selectedRoom?.images.map((image, index) => (
                      <Card key={index} sx={{ width: 200, position: 'relative', marginTop: 2 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={image}
                          alt={`Image ${index}`}
                          sx={{
                            objectFit: 'cover',
                            width: '100%',  // Đảm bảo ảnh chiếm hết chiều rộng của Card
                            cursor: 'pointer',
                          }}
                          onClick={() => setSelectedImage(image)}
                        />
                        
                        <CardActions sx={{ position: 'absolute', top: 8, right: 8 }}>
                          <IconButton color="error" onClick={() => handleRemoveImage(index, 'edit')}>
                            <X size={16} />
                          </IconButton>
                        </CardActions>
                      </Card>
                    ))}

                    {/* Hiển thị ảnh preview */}
                    {previewImages.map((image, index) => (
                      <Card key={index} sx={{ width: 200, position: 'relative', marginTop: 2 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={image}
                          alt={`Image ${index}`}
                          sx={{
                            objectFit: 'cover',
                            width: '100%',  // Đảm bảo ảnh chiếm hết chiều rộng của Card
                            cursor: 'pointer',
                          }}
                          onClick={() => setSelectedImage(image)}
                        />
                        
                        <CardActions sx={{ position: 'absolute', top: 8, right: 8 }}>
                          <IconButton color="error" onClick={() => handleRemoveImage(index, 'preview')}>
                            <X size={16} />
                          </IconButton>
                        </CardActions>
                      </Card>
                    ))}
                  </Box>
                  <Box>
                  
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                      <input
                        type="file"
                        accept="image/*"
                        id="upload-image"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleAddImage}
                      />
                      <Button
                        variant="contained"
                        component="label"
                        htmlFor="upload-image"
                        startIcon={<Plus />}
                      >
                        Thêm ảnh
                      </Button>
                    </Stack>

                  {(room?.images.length === 0 && previewImages.length === 0) && (
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
                      Không có ảnh nào
                    </Typography>
                  )}
                  </Box>        
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
          >
            Lưu
          </Button>
        </Box>
      </DialogContent>
      {/* Dialog xem ảnh */}
      <Dialog open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)} maxWidth="md">
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <IconButton onClick={() => setSelectedImage(null)}>
              <X />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <>
              <Box component="img" src={selectedImage} alt="Ảnh" width="100%" sx={{ borderRadius: 2, mb: 2 }} />

            </>
          )}
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}

export default RoomDialog;
