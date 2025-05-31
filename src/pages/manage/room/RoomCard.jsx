import { Card, CardContent, CardMedia, Typography, Grid, Chip, Button, Box, IconButton, CardActions } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import BuildIcon from '@mui/icons-material/Build';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
export default function RoomCard({room, onClick}) {
  const roomStatusMap = {
    AVAILABLE: { 
      label: "Còn trống", 
      color: "success", 
      icon: <CheckCircleIcon fontSize="small" /> 
    },
    RENTED: { 
      label: "Đã thuê", 
      color: "error", 
      icon: <HomeWorkIcon fontSize="small" /> 
    },
    WAITING: { 
      label: "Chờ xác nhận", 
      color: "warning", 
      icon: <HourglassTopIcon fontSize="small" /> 
    },
    MAINTENANCE: { 
      label: "Bảo trì", 
      color: "info", 
      icon: <BuildIcon fontSize="small" /> 
    },
    CLEANING: { 
      label: "Vệ sinh", 
      color: "info", 
      icon: <CleaningServicesIcon fontSize="small" /> 
    },
    SUSPENDED: { 
      label: "Tạm ngưng", 
      color: "default", 
      icon: <PauseCircleOutlineIcon fontSize="small" /> 
    },
    DELETED: { 
      label: "Đã xóa", 
      color: "default", 
      icon: <DeleteIcon fontSize="small" /> 
    },
    WAITING_CHECKOUT: {
      label: "Chờ trả phòng",
      color: "info", 
      icon: <CleaningServicesIcon fontSize="small" />
    }
  };

  const navigate = useNavigate();


  const getStatus = (status) => {
    return <Chip label={roomStatusMap[status]?.label} color={roomStatusMap[status]?.color} icon={roomStatusMap[status]?.icon} />
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);
  
    const nextImage = () => {
      setCurrentImageIndex((prev) =>
        prev === room?.images.length - 1 ? 0 : prev + 1
      );
    };
  
    const prevImage = () => {
      setCurrentImageIndex((prev) =>
        prev === 0 ? room?.images.length - 1 : prev - 1
      );
    };
  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', boxShadow: 4 }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          image={room?.images[currentImageIndex]}
          alt={`Room ${room?.roomNumber}`}
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
          {currentImageIndex + 1}/{room?.images.length}
        </Box>
      </Box>

      <CardContent>
        {/* Thông tin cơ bản */}
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6" fontWeight="bold">{room.roomNumber} - {room.room_Type?.name}</Typography>
            <Typography variant="body2" color="text.secondary">{room.description}</Typography>
          </Grid>

          <Grid item xs={12}>
              <Box display="flex" justifyContent={"space-between"}>
                {getStatus(room?.status)}

                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  {room.cost?.toLocaleString()} ₫/tháng
                </Typography>
              </Box>
          </Grid>

          {/* Nội dung chi tiết */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Mô tả:</Typography>
            <Typography variant="body2">{room.room_Type?.description}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Nội thất:</Typography>
            <Typography variant="body2">{room.funiture?.join(', ') || 'Không có'}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Diện tích:</Typography>
            <Typography variant="body2">{room.room_Type?.size} m²</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Chỉ số điện:</Typography>
            <Typography variant="body2">{room?.electricIndex} kWh</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Chỉ số nước:</Typography>
            <Typography variant="body2">{room?.waterIndex} m³</Typography>
          </Grid>

          {/* Hành động */}
        </Grid>
      </CardContent>
      <CardActions>
            <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
              <Button variant="contained" color="primary" onClick={onClick}>Chỉnh sửa</Button>
              {room.status === 'AVAILABLE' && (
                  <Button 
                    variant="outlined" 
                    color="success"
                    onClick={() => {
                      const roomId = room.id; // Thay thế bằng giá trị thực tế của roomId
                      
                      navigate(`/manager/createContract/${roomId}`); // Đưa renterId và roomId vào URL
                    }}
                  >
                    Đặt thuê ngay
                  </Button>
                )}
            </Box>
      </CardActions>
    </Card>
  );
}
