import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

const UploadImage = ({ onUpload }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dlyprrqnn',
        uploadPreset: 'uploadPublic'
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          setImageUrl(result.info.secure_url);
          onUpload(result.info.secure_url); // Trả về URL ảnh
        }
      }
    );

    widget.open();
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleUpload}>
        Upload Ảnh
      </Button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" width="100px" />}
    </Box>
  );
};

export default UploadImage;
