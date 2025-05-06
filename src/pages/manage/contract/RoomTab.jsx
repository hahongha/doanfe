import React from 'react';
import { Box, Paper, Typography, Stack, Button, Chip, Grid } from '@mui/material';

const RoomTab = ({ roomData }) => {
  const formatCurrency = (amount) => {
    if (!amount) return "0 VNĐ";
    return new Intl.NumberFormat('vi-VN').format(amount) + " VNĐ";
  };

  const {
    roomNumber,
    status,
    cost,
    isActive,
    funiture,
    description,
    electricIndex,
    waterIndex,
    room_Type,
  } = roomData || {};

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', p: 3 }}>
      <Paper elevation={3} sx={{ mx: 'auto', borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ backgroundColor: '#1e88e5', color: 'white', p: 3, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold">THÔNG TIN PHÒNG</Typography>
          <Typography variant="subtitle1" mt={1}>
            Phòng: <strong>{roomNumber || 'N/A'}</strong>
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ paddingTop: 2, paddingLeft: 5, paddingRight: 5 }}>
          {/* Thông tin cơ bản */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="primary" mb={2} borderBottom={2} borderColor="primary.main" pb={1}>
              Thông Tin Cơ Bản
            </Typography>

            <Stack spacing={2}>
              <InfoRow label="Mã phòng" value={roomNumber} />
              <InfoRow
                label="Trạng thái"
                value={
                  <Chip
                    label={status === 'RENTED' ? 'Đã thuê' : 'Trống'}
                    color={status === 'RENTED' ? 'warning' : 'success'}
                    variant="outlined"
                    sx={{ width: 100, justifyContent: 'center' }}
                  />
                }
              />
              <InfoRow label="Giá thuê" value={formatCurrency(cost)} />
              <InfoRow
                label="Hoạt động"
                value={
                  <Chip
                    label={isActive ? 'Đang hoạt động' : 'Ngưng hoạt động'}
                    color={isActive ? 'success' : 'error'}
                    variant="outlined"
                    sx={{ width: 140, justifyContent: 'center' }}
                  />
                }
              />
              <InfoRow label="Mô tả" value={description} />
            </Stack>
          </Grid>

          {/* Chỉ số điện nước */}
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="h6" color="primary" mb={2} borderBottom={2} borderColor="primary.main" pb={1}>
                Chỉ Số Điện Nước
              </Typography>

              <Stack spacing={2}>
                <InfoRow label="Chỉ số điện" value={`${electricIndex} kWh`} />
                <InfoRow label="Chỉ số nước" value={`${waterIndex} m³`} />
              </Stack>
            </Box>
            <Box>
              <Typography variant="h6" color="primary" mb={2} borderBottom={2} borderColor="primary.main" pb={1}>
                Nội Thất
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, paddingTop:9 }}>
                {funiture && funiture.length > 0 ? (
                  funiture.map((item, index) => (
                    <Typography variant="subtitle1" key={index} sx={{ ml: 2 }}>
                      {item.trim()}
                    </Typography>
                  ))
                ) : (
                  <Typography>Không có nội thất</Typography>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Nội thất */}
          <Grid item xs={12}>
            
          </Grid>

          {/* Thông tin loại phòng */}
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" mb={2} borderBottom={2} borderColor="primary.main" pb={1}>
              Thông Tin Loại Phòng
            </Typography>

            <Stack spacing={2}>
              <InfoRow label="Tên loại phòng" value={room_Type?.name} />
              <InfoRow label="Diện tích" value={`${room_Type?.size} m²`} />
              <InfoRow label="Mô tả loại phòng" value={room_Type?.description} />
            </Stack>
          </Grid>
        </Grid>

        {/* Button group */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3} sx={{ paddingBottom: 2, paddingRight: 5 }}>
          <Button variant="contained" color="primary">Chỉnh sửa</Button>
          <Button variant="contained" color="success">Xem chi tiết</Button>
          <Button variant="contained" color="error">Xóa</Button>
        </Stack>
      </Paper>
    </Box>
  );
};

// Component con để render 1 dòng label-value
const InfoRow = ({ label, value }) => (
  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
    <Typography sx={{ width: { md: 200, xs: '100%' }, fontWeight: 600, color: '#555' }}>{label}</Typography>
    <Box
      sx={{
        flex: 1,
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: 1,
        minHeight: 38,
        display: 'flex',
        alignItems: 'center',
        px: 2,
      }}
    >
      {typeof value === 'string' || typeof value === 'number' ? (
        <Typography>{value}</Typography>
      ) : value}
    </Box>
  </Stack>
);

export default RoomTab;
