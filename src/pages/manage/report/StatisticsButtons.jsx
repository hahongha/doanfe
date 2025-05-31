import React, { useState } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import RoomDashboard from './RoomDashBoard';

const StatisticsButtons = () => {
  const handleClick = (statType) => {
    console.log(`Thống kê: ${statType}`);
    // Xử lý các hành động thống kê khác ở đây
  };

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Thống Kê Quản Lý Nhà Trọ
      </Typography>
      <Grid container spacing={2}>
        {/* Nút Thu nhập */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
               onClick={() => setOpenDialog(true)}
            >
              Thống Kê tình trạng phòng
            </Button>
          </Paper>
        </Grid>
        
        {/* Nút Chi phí */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => handleClick('Chi Phí')}
            >
              Thống kê hợp đồng thuê phòng
            </Button>
          </Paper>
        </Grid>

        {/* Nút Lợi nhuận */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={() => handleClick('Lợi Nhuận')}
            >
              Thống Kê Lợi Nhuận
            </Button>
          </Paper>
        </Grid>

        {/* Nút Tình trạng phòng */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              color="info"
              onClick={() => handleClick('Tình Trạng Phòng')}
            >
              Thống Kê Dịch vụ phòng
            </Button>
          </Paper>
        </Grid>

        {/* Nút Số lượng khách thuê */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              onClick={() => handleClick('Số Lượng Khách Thuê')}
            >
              Thống Kê Số Lượng Khách Thuê
            </Button>
          </Paper>
        </Grid>

        {/* Nút Dịch vụ phát sinh */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleClick('Dịch Vụ Phát Sinh')}
            >
              Thống Kê Dịch Vụ Phát Sinh
            </Button>
          </Paper>
        </Grid>

        {/* Nút Chi phí bảo trì */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => handleClick('Chi Phí Bảo Trì')}
            >
              Thống Kê Chi Phí Bảo Trì
            </Button>
          </Paper>
        </Grid>

        {/* Nút Thời gian thuê */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={() => handleClick('Thời Gian Thuê')}
            >
              Thống Kê Thời Gian Thuê
            </Button>
          </Paper>
        </Grid>

        {/* Nút Tình trạng thanh toán */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              color="info"
              onClick={() => handleClick('Tình Trạng Thanh Toán')}
            >
              Thống Kê Tình Trạng Thanh Toán
            </Button>
          </Paper>
        </Grid>

        {/* Nút Tỷ lệ lấp đầy phòng */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              onClick={() => handleClick('Tỷ Lệ Lấp Đầy Phòng')}
            >
              Thống Kê Tỷ Lệ Lấp Đầy Phòng
            </Button>
          </Paper>
        </Grid>

        {/* Nút Đánh giá khách hàng */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleClick('Đánh Giá Khách Hàng')}
            >
              Thống Kê Đánh Giá Khách Hàng
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatisticsButtons;
