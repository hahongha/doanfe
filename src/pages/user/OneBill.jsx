import React from 'react';
import {
  Box,
  Typography,
  Grid2,
  Paper,
  Chip,
  Divider,
  Button,
  CardMedia,
  Card
} from '@mui/material';
import { padding } from '@mui/system';

const OneBill = ({billData}) => {

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('vi-VN');

  const statusMapping = {
    PAID: 'Đã thanh toán',
    UNPAID: 'Chưa thanh toán',
    OVERDUE: 'Quá hạn',
    PENDING: 'Chờ xử lý'
  };

  const statusColor = {
    PAID: 'success',
    UNPAID: 'warning',
    OVERDUE: 'error',
    PENDING: 'default'
  };
  const showActions = billData?.status !== 'PAID';

  return (
    // <Box sx={{ p: 12, bgcolor: '#f9fafb', minHeight: '100vh' }}>
    //   <Paper elevation={3} sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
    <Card>
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, borderRadius: 1, mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">{billData?.name}</Typography>
          <Chip label={statusMapping[billData?.status]} color={statusColor[billData?.status]} />
        </Box>

        <Box mb={3} sx={{ p: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>Thông tin hóa đơn</Typography>
          <Grid2 container size = {12} spacing={2}>
            <Grid2 size = {12}><Typography sx={{pr:5}}>Mã hóa đơn: <strong>{billData?.id}</strong></Typography></Grid2>
            <Grid2 size = {12}><Typography sx={{pr:5}}>Tổng tiền: <strong>{formatCurrency(billData?.totalAmount)}</strong></Typography></Grid2>
            <Grid2 size = {12}><Typography sx={{pr:5}}>Ngày đến hạn: <strong>{formatDate(billData?.dueDate)}</strong></Typography></Grid2>
            <Grid2 size = {12}><Typography sx={{pr:5}}>Ngày tạo: <strong>{formatDate(billData?.createAt)}</strong></Typography></Grid2>
            <Grid2 size = {12}><Typography sx={{pr:5}}>Ngày cập nhật cuối cùng: <strong>{formatDate(billData?.updateAt)}</strong></Typography></Grid2>
            <Grid2 size = {12}><Typography sx={{pr:5}}>Ngày thanh toán: <strong>{billData?.paymentDate ? formatDate(billData?.paymentDate) : 'Chưa thanh toán'}</strong></Typography></Grid2>
          </Grid2>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box mb={3} sx={{ p: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>Thông tin phòng</Typography>
          <Grid2 container size = {12} spacing={2}>
            <Grid2 size = {12}><Typography sx={{pr:5}}>Số phòng: <strong>{billData?.room.roomNumber}</strong></Typography></Grid2>
            <Grid2 size = {12}><Typography sx={{pr:5}}>Loại phòng: <strong>{billData?.room.room_Type.name}</strong></Typography></Grid2>
          </Grid2>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box mb={3} sx={{ p: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>Thông tin người thuê</Typography>
          <Grid2 container size = {12} spacing={2}>
            <Grid2 size = {12}><Typography sx={{pr:5}}>Họ và tên: <strong>{billData?.renter.fullName}</strong></Typography></Grid2>
            <Grid2 size = {12}><Typography sx={{pr:5}}>Giới tính: <strong>{billData?.renter.gender === 'Female' ? 'Nữ' : 'Nam'}</strong></Typography></Grid2>
            <Grid2 size = {12}><Typography sx={{pr:5}}>SĐT: <strong>{billData?.renter.phone}</strong></Typography></Grid2>
          </Grid2>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
  {/* Các nút hiển thị khi showActions = true */}

  {/* Các nút luôn hiển thị */}
    <Box textAlign="right">
    {showActions && (
        <Button variant="contained" sx={{ mr: 2 }} color="primary">
            Thanh toán
        </Button>
    )}
        <Button variant="outlined" sx={{ mr: 2 }}>
        In hóa đơn
        </Button>
        <Button variant="contained" sx={{ mr: 2 }} color="primary">
        Xuất PDF
        </Button>
        <Button variant="contained" color="primary">
        Chi tiết hóa đơn
        </Button>
    </Box>
    </Box>
    </Card>
    //   </Paper>
    // </Box>
  );
};

export default OneBill;
