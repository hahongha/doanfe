import { useState } from 'react';
import { Home, CreditCard, Zap, Droplets, BedDouble, Check, X } from 'lucide-react';
import { Box, Typography, Card, CardHeader, CardContent, Grid, Avatar, Chip, Button, Divider, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

export default function RoomDetails({roomData}) {

    if (!roomData) {
        return <Typography variant="h6" color="text.secondary">No room data available.</Typography>;
      }
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <Box maxWidth="lg" mx="auto" py={4}>
      <Card>
        <CardHeader
          sx={{ backgroundColor: 'primary.main', color: 'white' }}
          title={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" display="flex" alignItems="center">
                <Home style={{ marginRight: 8 }} /> Phòng {roomData?.roomNumber}
              </Typography>
              <Chip
                icon={roomData?.isActive ? <Check /> : <X />}
                label={roomData?.isActive ? "Đang hoạt động" : "Không hoạt động"}
                color={roomData?.isActive ? "success" : "error"}
              />
            </Box>
          }
        />
        <CardContent>
          {/* Phần ảnh */}
          <Box height={300} mb={4} display="flex" justifyContent="center" alignItems="center" bgcolor="#f0f0f0">
            {roomData?.images && roomData?.images.length > 0 ? (
              <img src={roomData?.images[0]} alt="Hình ảnh phòng" style={{ height: '100%', objectFit: 'cover', borderRadius: 8 }} />
            ) : (
              <Typography color="text.secondary">Không có ảnh</Typography>
            )}
          </Box>

          <Grid container spacing={4}>
            {/* Thông tin chi tiết */}
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>{roomData?.room_Type?.name}</Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>{roomData?.description}</Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>Chi tiết phòng</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                  <BedDouble style={{ color: '#1976d2', marginRight: 8 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Loại phòng</Typography>
                    <Typography>{roomData?.room_Type?.name}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                  <Home style={{ color: '#1976d2', marginRight: 8 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Diện tích</Typography>
                    <Typography>{roomData?.room_Type?.size} m²</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                  <Zap style={{ color: '#1976d2', marginRight: 8 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Chỉ số điện</Typography>
                    <Typography>{roomData?.electricIndex} kWh</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                  <Droplets style={{ color: '#1976d2', marginRight: 8 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Chỉ số nước</Typography>
                    <Typography>{roomData?.waterIndex} m³</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />
              <Typography variant="subtitle1" gutterBottom>Mô tả chi tiết</Typography>
              <Typography color="text.secondary">{roomData?.room_Type?.description}</Typography>
            </Grid>

            {/* Giá và nội thất */}
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">Giá thuê hàng tháng</Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <CreditCard style={{ color: '#2e7d32', marginRight: 8 }} />
                  <Typography variant="h6" color="green">{formatCurrency(roomData.cost)}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1">Nội thất có sẵn:</Typography>
                <List dense>
                  {roomData?.funiture?.map((item, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon>
                        <Check color="success" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
