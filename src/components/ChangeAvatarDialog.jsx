import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

export default function ChangeAvatarDialog({ open, onClose, currentAvatar, onSave, imageLink }) {
  const [selectedImage, setSelectedImage] = useState(imageLink);

  // Xử lý khi chọn ảnh mới
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // Xử lý khi lưu ảnh mới
  const handleSave = () => {
    onSave(selectedImage); // Trả ảnh đã chọn về component cha
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thay đổi ảnh đại diện</DialogTitle>
      <DialogContent>
        <Avatar src={selectedImage || currentAvatar} sx={{ width: 120, height: 120, margin: 'auto', mb: 2 }} />
        <input type="file" accept="image/*" id="upload-avatar" style={{ display: 'none' }} onChange={handleImageChange} />
        <label htmlFor="upload-avatar">
          <IconButton component="span" color="primary">
            <PhotoCameraIcon fontSize="large" />
          </IconButton>
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSave} color="primary" disabled={!selectedImage}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
