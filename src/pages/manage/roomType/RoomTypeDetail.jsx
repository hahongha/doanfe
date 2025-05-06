import { useState } from 'react';
import { X, Trash2, Plus } from 'lucide-react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, 
  IconButton, Typography, TextField, Grid, Card, 
  CardContent, CardHeader, Divider, CardMedia, CardActions, 
  Stack, Button, Box
} from '@mui/material';
import http from "src/redux/api/http";
import { toast } from 'react-toastify';
export default function RoomTypeDetail({ open, onClose, roomData, setRender}) {
  const [room, setRoom] = useState({
    id: roomData.id ?? null,
    name: roomData.name ?? '',
    size: roomData.size ?? 0,
    description: roomData.description ?? '',
    imageList: roomData.imageList ?? []
  });
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom(prev => ({
      ...prev,
      [name]: name === 'size' ? parseInt(value) || 0 : value
    }));
  };

  const handleRemoveImage = (index, type) => {
    if (type === 'edit') {
      // Xóa ảnh trong danh sách đã tải lên
      setRoom((prev) => {
        const newList = [...prev.imageList];
        newList.splice(index, 1);
        return { ...prev, imageList: newList };
      });
    } else if (type === 'preview') {
      // Xóa ảnh trong danh sách preview
      setPreviewImages((prev) => {
        const newList = [...prev];
        newList.splice(index, 1);
        return newList;
      });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append(
      "roomType",
      new Blob([JSON.stringify(room)], { type: "application/json" })
    );

    if (files) {
      Array.from(files).forEach(file => {
        formData.append('file', file);
      });
    }
  
    let response;
    if (room?.id) {
      // Nếu room có id, thực hiện PUT request
      response = await http.put('/roomType', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Chỉ định Content-Type là multipart/form-data
        },
      });
    } else {
      // Nếu room không có id, thực hiện POST request
      response = await http.post('/roomType', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Chỉ định Content-Type là multipart/form-data
        },
      });
    }
  
    // Xử lý response sau khi gửi request
    if (response.status === 200) {
      // Thực hiện các hành động sau khi lưu thành công
      toast.success("Lưu thành công");
      setRender();
      console.log('Lưu thành công:', response.data);
    } else {
      // Xử lý lỗi nếu có
      toast.error("Lưu thất bại");
      setRender();
      console.error('Lưu thất bại:', response.data);
    }

    onClose();

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

  return (
    <>
      {/* Dialog chỉnh sửa loại phòng */}
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{room?.id? "Chỉnh sửa loại phòng":"Tạo loại phòng"}</Typography>
            <IconButton onClick={onClose}>
              <X />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Hình ảnh */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                {/* <CardHeader title={`Hình ảnh (${room.imageList.length})`} /> */}
                <Divider />
                <CardContent>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    {/* Hiển thị ảnh đã tải lên từ editForm */}
                    {room?.imageList.map((image, index) => (
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

                  {(room?.imageList.length === 0 && previewImages.length === 0) && (
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
                      Không có ảnh nào
                    </Typography>
                  )}
                  </Box>
                </CardContent>
              </Card>

              {/* JSON dữ liệu
              <Card variant="outlined">
                <CardHeader title="Dữ liệu JSON" />
                <Divider />
                <CardContent sx={{ backgroundColor: '#f5f5f5', borderRadius: 2, overflow: 'auto', maxHeight: 300 }}>
                  <pre style={{ fontSize: '0.85rem', margin: 0 }}>
                    {JSON.stringify(room, null, 2)}
                  </pre>
                </CardContent>
              </Card> */}
            </Grid>

            {/* Form nhập liệu */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardHeader title="Thông tin loại phòng" />
                <Divider />
                <CardContent>
                  <Stack spacing={3}>
                    <TextField
                      label="Tên loại phòng"
                      name="name"
                      value={room.name}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Kích thước (m²)"
                      type="number"
                      name="size"
                      value={room.size}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Mô tả"
                      name="description"
                      value={room.description}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="inherit">Đóng</Button>
          <Button onClick={()=>{
            handleSubmit();
            onClose();
          }} color="inherit">Lưu</Button>
        </DialogActions>
      </Dialog>

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
    </>
  );
}
