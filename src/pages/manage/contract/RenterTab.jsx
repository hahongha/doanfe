import React from 'react';
import { Box, Paper, Typography, Stack, Grid, Chip } from '@mui/material';

const RenterTab = ({ renterData }) => {
  const renter = renterData || {};

  const formatDate = (dateString) => {
    if (!dateString) return "--/--/----";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', p: 3 }}>
      <Paper elevation={3} sx={{ mx: 'auto', borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ backgroundColor: '#1e88e5', color: 'white', p: 3, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold">THÔNG TIN NGƯỜI THUÊ</Typography>
          <Typography variant="subtitle1" mt={1}>
            Mã người thuê: <strong>{renter?.id || '---'}</strong>
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ padding: 3 }}>
          {/* Thông tin cá nhân */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="primary" mb={2} borderBottom={2} borderColor="primary.main" pb={1}>
              Thông Tin Cá Nhân
            </Typography>
            <Stack spacing={2}>
              <InfoRow label="Họ và tên" value={renter?.fullName} />
              <InfoRow label="Giới tính" value={renter?.gender === 'FEMALE' ? 'Nữ' : 'Nam'} />
              <InfoRow label="Ngày sinh" value={formatDate(renter?.dob)} />
              <InfoRow label="Số CMND/CCCD" value={renter?.identification} />
              <InfoRow label="Nguyên quán" value={renter?.placeOfOrigin} />
            </Stack>
          </Grid>

          {/* Thông tin liên lạc */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="primary" mb={2} borderBottom={2} borderColor="primary.main" pb={1}>
              Thông Tin Liên Lạc
            </Typography>
            <Stack spacing={2}>
              <InfoRow label="Số điện thoại" value={renter?.phone} />
              <InfoRow label="SĐT gia đình" value={renter?.familyPhone} />
              <InfoRow label="Địa chỉ hiện tại" value={renter?.address} />
              <InfoRow 
                label="Trạng thái đăng ký" 
                value={
                  <Chip 
                    label={renter?.isRegister ? "Đã đăng ký tạm trú" : "Chưa đăng ký"} 
                    color={renter?.isRegister ? "success" : "default"} 
                    variant="outlined"
                    sx={{ width: 150 }}
                  />
                }
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

// Dùng lại InfoRow từ ContractTab
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

export default RenterTab;
