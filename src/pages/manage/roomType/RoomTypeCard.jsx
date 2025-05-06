import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Chip,
  Stack
} from '@mui/material';

export default function RoomTypeCard({roomData, handleDelete, handleEdit}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === roomData?.imageList.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? roomData?.imageList.length - 1 : prev - 1
    );
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', boxShadow: 4, borderRadius: 3 }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          image={roomData?.imageList[currentImageIndex]}
          alt={`Room ${roomData?.name}`}
          sx={{ objectFit: 'cover' }}
        />

        {/* Navigation Buttons */}
        <IconButton
          onClick={prevImage}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.5)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
          }}
        >
          <ChevronLeft size={20} />
        </IconButton>

        <IconButton
          onClick={nextImage}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.5)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
          }}
        >
          <ChevronRight size={20} />
        </IconButton>

        {/* Image Counter */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            bgcolor: 'rgba(0,0,0,0.5)',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: 12
          }}
        >
          {currentImageIndex + 1}/{roomData?.imageList.length}
        </Box>
      </Box>

      <CardContent>
        {/* Room Title and Size */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {roomData?.name}
          </Typography>
          <Chip label={`${roomData?.size} m²`} color="primary" size="small" />
        </Stack>

        {/* Description */}
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            {showFullDescription
              ? roomData?.description
              : `${roomData?.description.substring(0, 50)}${
                  roomData?.description.length > 50 ? '...' : ''
                }`}
            <Button
                size="small"
                variant="text"
                sx={{
                    ml: 1,
                    textTransform: 'none',
                    minWidth: 0, // Giảm tối đa chiều rộng nút
                    padding: 0, // Bỏ padding dư thừa
                    color: showFullDescription ? 'primary.main' : 'primary.main', // Màu chữ
                    '&:hover': {
                    backgroundColor: 'transparent', // Không đổi nền khi hover
                    },
                    opacity: roomData?.description.length > 50 ? 1 : 0, // Ẩn nút nếu mô tả ngắn
                    pointerEvents: roomData?.description.length > 50 ? 'auto' : 'none', // Không cho bấm khi ẩn
                }}
                onClick={() => setShowFullDescription(!showFullDescription)}
                >
                {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
            </Button>

          </Typography>
        </Box>

        {/* Slide Dots */}
        <Stack direction="row" justifyContent="center" spacing={1} mt={2}>
          {roomData?.imageList.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: currentImageIndex === index ? 'primary.main' : 'grey.400',
                cursor: 'pointer'
              }}
            />
          ))}
        </Stack>

        {/* Buttons */}
        <Stack direction="row" spacing={2} justifyContent="space-between" mt={3}>
          <Button variant="contained" color="primary" fullWidth onClick={handleDelete}>
            Xóa
          </Button>
          <Button variant="outlined" fullWidth onClick={handleEdit}>
            Chỉnh sửa
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}