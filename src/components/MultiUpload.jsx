import React, { useState } from 'react';
import { Button, Box, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MultiUpload = ({ onUpload, list }) => {
  const [imageUrls, setImageUrls] = useState(list ? list : []); // Danh sách ảnh đã upload
  const [newImageUrl, setNewImageUrl] = useState(''); // URL nhập tay

  // Xử lý upload ảnh từ Cloudinary
  const handleUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dlyprrqnn',
        uploadPreset: 'uploadPublic',
        multiple: true
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          setImageUrls((prev) => [...prev, result.info.secure_url]); // Thêm ảnh vào danh sách
          onUpload((prev) => [...prev, result.info.secure_url]); // Cập nhật danh sách lên parent
        }
      }
    );

    widget.open();
  };

  // Xử lý nhập URL ảnh thủ công
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImageUrls((prev) => [...prev, newImageUrl]);
      onUpload((prev) => [...prev, newImageUrl]);
      setNewImageUrl(''); // Reset input
    }
  };

  // Xóa ảnh khỏi danh sách
  const handleDelete = (url) => {
    const updatedUrls = imageUrls.filter((img) => img !== url);
    setImageUrls(updatedUrls);
    onUpload(updatedUrls);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleUpload}>
        Upload Ảnh
      </Button>

      {/* Nhập URL ảnh */}
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <TextField label="Nhập URL ảnh" variant="outlined" fullWidth value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} />
        <Button variant="contained" onClick={handleAddImage}>
          Thêm
        </Button>
      </Box>

      {/* Hiển thị danh sách ảnh */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
        {imageUrls.map((url, index) => (
          <Box key={index} sx={{ position: 'relative', width: '100px' }}>
            <img src={url} alt={`Uploaded ${index}`} width="100%" />
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'rgba(0,0,0,0.5)',
                color: 'white'
              }}
              onClick={() => handleDelete(url)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MultiUpload;
