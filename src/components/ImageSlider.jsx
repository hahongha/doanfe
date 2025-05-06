import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const links = [
  'https://i.imgur.com/01iECtb.jpeg0',
  'https://i.imgur.com/01iECtb.jpeg',
  'https://i.imgur.com/01iECtb.jpeg',
  'https://i.imgur.com/PQ6EFZG.jpeg'
];

function ImageSlider({ images }) {
  const [imageLinks, setImageLinks] = useState(images ? images : links);
  const [index, setIndex] = useState(0);

  // Tự động chuyển ảnh mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % imageLinks.length);
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? imageLinks.length - 1 : prevIndex - 1));
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Ảnh hiển thị full width, nhưng nằm gọn trong 50% màn hình */}
      <img
        src={imageLinks[index]}
        alt={`Slide ${index + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain' // Đảm bảo ảnh không bị cắt
        }}
      />

      {/* Nút điều hướng bên trái */}
      <IconButton
        onClick={prevImage}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
        }}
      >
        <ArrowBackIos />
      </IconButton>

      {/* Nút điều hướng bên phải */}
      <IconButton
        onClick={nextImage}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
}

export default ImageSlider;
