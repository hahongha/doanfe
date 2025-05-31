import {
  Card,
  CardMedia,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Select,
  MenuItem,
  IconButton,
  Grid2,
  CardActions,
  Stack,
  TextField,
  FormHelperText,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import { Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import http from 'src/redux/api/http';
import { toast } from 'react-toastify';

const initialRoomData = {
  id: null,
  roomNumber: '',
  status: 'AVAILABLE',
  cost: 0,
  isActive: false,
  funiture: [], // Changed to match schema spelling
  description: '',
  number: 0,
  electricIndex: 0,
  waterIndex: 0,
  room_Type: { id: 0, name: '', size: 0, description: '', imageList: [] },
  images: [],
  contractId: '',
};

const statusOptions = [
  { value: 'AVAILABLE', label: 'Trống', color: 'success' },
  { value: 'OCCUPIED', label: 'Có người ở', color: 'primary' },
  { value: 'MAINTENANCE', label: 'Đang sửa chữa', color: 'warning' },
  { value: 'CLEANING', label: 'Đang vệ sinh', color: 'info' },
  { value: 'RESERVED', label: 'Đặt trước', color: 'secondary' },
  { value: 'INACTIVE', label: 'Tạm ngừng cho thuê', color: 'error' },
  { value: 'PENDING', label: 'Chờ thanh lý hợp đồng', color: 'warning' },
  { value: 'INSPECTION', label: 'Đang kiểm tra kỹ thuật', color: 'info' },
];

export default function RoomDialog({ open, handleClose, room, handleSave }) {
  const [selectedRoom, setSelectedRoom] = useState(initialRoomData);
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [furnitureInput, setFurnitureInput] = useState('');

  useEffect(() => {
    setSelectedRoom(room || initialRoomData);
    setPreviewImages(room?.images || []);
    setFiles([]);
    setErrors({});
    setFurnitureInput('');
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    setSelectedRoom((prev) => {
      if (keys.length > 1) {
        return { ...prev, room_Type: { ...prev.room_Type, [keys[1]]: value } };
      }
      return { ...prev, [name]: value };
    });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFurnitureAdd = () => {
    if (furnitureInput.trim()) {
      setSelectedRoom((prev) => ({
        ...prev,
        funiture: [...prev.funiture, furnitureInput.trim()],
      }));
      setFurnitureInput('');
      setErrors((prev) => ({ ...prev, funiture: '' }));
    }
  };

  const handleFurnitureRemove = (index) => {
    setSelectedRoom((prev) => {
      const newFurniture = [...prev.funiture];
      newFurniture.splice(index, 1);
      return { ...prev, funiture: newFurniture };
    });
  };

  const handleRemoveImage = (index, type) => {
    if (type === 'edit') {
      setSelectedRoom((prev) => {
        const newImages = [...prev.images];
        newImages.splice(index, 1);
        return { ...prev, images: newImages };
      });
    } else if (type === 'preview') {
      setPreviewImages((prev) => {
        const newImages = [...prev];
        newImages.splice(index, 1);
        return newImages;
      });
      setFiles((prev) => {
        const newFiles = Array.from(prev);
        newFiles.splice(index, 1);
        return newFiles;
      });
    }
  };

  const handleAddImage = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
      const imagePreviews = [];
      Array.from(selectedFiles).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagePreviews.push(reader.result);
          setPreviewImages((prev) => [...prev, ...imagePreviews].filter(Boolean));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!selectedRoom.roomNumber) tempErrors.roomNumber = 'Số phòng không được để trống';
    if (!selectedRoom.status) tempErrors.status = 'Vui lòng chọn trạng thái';
    if (selectedRoom.cost < 0) tempErrors.cost = 'Giá phòng không được âm';
    if (selectedRoom.electricIndex < 0) tempErrors.electricIndex = 'Chỉ số điện không được âm';
    if (selectedRoom.waterIndex < 0) tempErrors.waterIndex = 'Chỉ số nước không được âm';
    if (selectedRoom.number < 0) tempErrors.number = 'Số người không được âm';
    if (!selectedRoom.room_Type.name) tempErrors['room_Type.name'] = 'Tên loại phòng không được để trống';
    if (selectedRoom.room_Type.size < 0) tempErrors['room_Type.size'] = 'Diện tích không được âm';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error('Vui lòng điền đầy đủ thông tin hợp lệ');
      return;
    }

    const formData = new FormData();
    formData.append('room', new Blob([JSON.stringify(selectedRoom)], { type: 'application/json' }));
    files.forEach((file) => formData.append('file', file));

    try {
      toast.info('Đang lưu...');
      const response = await http[selectedRoom.id ? 'put' : 'post']('/room', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        toast.success('Lưu thành công');
        handleSave();
        handleClose();
      } else {
        toast.error('Lưu thất bại');
      }
    } catch (error) {
      toast.error('Lỗi khi lưu: ' + error.message);
      console.error('Lưu thất bại:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') handleClose();
      }}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Thông tin phòng</Typography>
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid2 container spacing={2} sx={{ mt: 1 }}>
          <Grid2 size={6}>
            <TextField
              label="Số phòng"
              name="roomNumber"
              fullWidth
              value={selectedRoom.roomNumber}
              onChange={handleChange}
              error={!!errors.roomNumber}
              helperText={errors.roomNumber}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Giá phòng"
              name="cost"
              fullWidth
              type="number"
              value={selectedRoom.cost}
              onChange={handleChange}
              error={!!errors.cost}
              helperText={errors.cost}
            />
          </Grid2>
          <Grid2 size={6}>
            <Select
              label="Trạng thái"
              name="status"
              fullWidth
              value={selectedRoom.status || 'AVAILABLE'}
              onChange={handleChange}
              error={!!errors.status}
            >
              <MenuItem value="">Chọn trạng thái</MenuItem>
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors.status && <FormHelperText error>{errors.status}</FormHelperText>}
          </Grid2>
          <Grid2 size={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={selectedRoom.isActive}
                  onChange={(e) => setSelectedRoom((prev) => ({ ...prev, isActive: e.target.checked }))}
                />
              }
              label="Đang hoạt động"
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              label="Mô tả"
              name="description"
              fullWidth
              value={selectedRoom.description}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Số người"
              name="number"
              fullWidth
              type="number"
              value={selectedRoom.number}
              onChange={handleChange}
              error={!!errors.number}
              helperText={errors.number}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Mã hợp đồng"
              name="contractId"
              fullWidth
              value={selectedRoom.contractId}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Chỉ số điện"
              name="electricIndex"
              fullWidth
              type="number"
              value={selectedRoom.electricIndex}
              onChange={handleChange}
              error={!!errors.electricIndex}
              helperText={errors.electricIndex}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Chỉ số nước"
              name="waterIndex"
              fullWidth
              type="number"
              value={selectedRoom.waterIndex}
              onChange={handleChange}
              error={!!errors.waterIndex}
              helperText={errors.waterIndex}
            />
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="subtitle1" gutterBottom>
              Nội thất
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                label="Thêm nội thất"
                value={furnitureInput}
                onChange={(e) => setFurnitureInput(e.target.value)}
                fullWidth
              />
              <Button variant="contained" onClick={handleFurnitureAdd}>
                Thêm
              </Button>
            </Stack>
            {selectedRoom.funiture.length > 0 ? (
              <Stack spacing={1} sx={{ mt: 1 }}>
                {selectedRoom.funiture.map((item, index) => (
                  <Box key={index} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography>{item}</Typography>
                    <IconButton color="error" onClick={() => handleFurnitureRemove(index)}>
                      <X size={16} />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Chưa có nội thất
              </Typography>
            )}
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Tên loại phòng"
              name="room_Type.name"
              fullWidth
              value={selectedRoom.room_Type.name}
              onChange={handleChange}
              error={!!errors['room_Type.name']}
              helperText={errors['room_Type.name']}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Diện tích (m²)"
              name="room_Type.size"
              fullWidth
              type="number"
              value={selectedRoom.room_Type.size}
              onChange={handleChange}
              error={!!errors['room_Type.size']}
              helperText={errors['room_Type.size']}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              label="Mô tả loại phòng"
              name="room_Type.description"
              fullWidth
              value={selectedRoom.room_Type.description}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="subtitle1" gutterBottom>
              Hình ảnh
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              {selectedRoom.images.map((image, index) =>
                image ? (
                  <Card key={`edit-${index}`} sx={{ width: 200, position: 'relative', mt: 2 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={image}
                      alt={`Hình ảnh ${index + 1}`}
                      sx={{ objectFit: 'cover', width: '100%', cursor: 'pointer' }}
                      onClick={() => setSelectedImage(image)}
                    />
                    <CardActions sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <IconButton color="error" onClick={() => handleRemoveImage(index, 'edit')}>
                        <X size={16} />
                      </IconButton>
                    </CardActions>
                  </Card>
                ) : null
              )}
              {previewImages.map((image, index) => (
                <Card key={`preview-${index}`} sx={{ width: 200, position: 'relative', mt: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={`Hình ảnh xem trước ${index + 1}`}
                    sx={{ objectFit: 'cover', width: '100%', cursor: 'pointer' }}
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
            {selectedRoom.images.length === 0 && previewImages.length === 0 && (
              <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
                Không có ảnh nào
              </Typography>
            )}
          </Grid2>
        </Grid2>
      </DialogContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Lưu
        </Button>
      </Box>
      <Dialog open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)} maxWidth="md">
        <DialogTitle>
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <IconButton onClick={() => setSelectedImage(null)}>
              <X />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <Box component="img" src={selectedImage} alt="Ảnh phòng" width="100%" sx={{ borderRadius: 2 }} />
          )}
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}