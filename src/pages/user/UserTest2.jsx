import React, { useState } from 'react';
import { Box, Button, Tab, Tabs, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const UserTest = () => {
  const [activeTab, setActiveTab] = useState('details');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', py: 6 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {/* Tab Navigation */}
        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" aria-label="tabs">
          <Tab label="Chi tiết hóa đơn" value="details" />
          <Tab label="Thông tin phòng" value="room" />
          <Tab label="Thông tin người thuê" value="tenant" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ py: 4 }}>
          {activeTab === 'details' && (
            <div>
              <Typography variant="h6" gutterBottom>
                Chi tiết hóa đơn
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Mô tả</TableCell>
                      <TableCell align="right">Giá trị</TableCell>
                      <TableCell align="right">Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">Tiền thuê phòng</TableCell>
                      <TableCell align="right">5,000,000 VNĐ</TableCell>
                      <TableCell align="right">5,000,000 VNĐ</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Dịch vụ điện</TableCell>
                      <TableCell align="right">500,000 VNĐ</TableCell>
                      <TableCell align="right">500,000 VNĐ</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Dịch vụ nước</TableCell>
                      <TableCell align="right">100,000 VNĐ</TableCell>
                      <TableCell align="right">100,000 VNĐ</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Tổng cộng</TableCell>
                      <TableCell align="right">5,600,000 VNĐ</TableCell>
                      <TableCell align="right">5,600,000 VNĐ</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

          {activeTab === 'room' && (
            <div>
              <Typography variant="h6" gutterBottom>
                Thông tin phòng
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography><strong>Loại phòng:</strong> Phòng đơn</Typography>
                <Typography><strong>Diện tích:</strong> 25m²</Typography>
                <Typography><strong>Giá thuê:</strong> 5,000,000 VNĐ/tháng</Typography>
                <Typography><strong>Mô tả:</strong> Phòng sạch sẽ, thoáng mát, đầy đủ tiện nghi.</Typography>
                <Typography><strong>Hình ảnh:</strong> <img src="path_to_image.jpg" alt="Room" style={{ width: '100%', maxWidth: '200px', borderRadius: '8px' }} /></Typography>
              </Box>
            </div>
          )}

          {activeTab === 'tenant' && (
            <div>
              <Typography variant="h6" gutterBottom>
                Thông tin người thuê
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography><strong>Họ tên:</strong> Nguyễn Văn A</Typography>
                <Typography><strong>Ngày sinh:</strong> 01/01/1990</Typography>
                <Typography><strong>Địa chỉ:</strong> 123 Đường ABC, TP.HCM</Typography>
                <Typography><strong>Số điện thoại:</strong> 0901234567</Typography>
                <Typography><strong>Email:</strong> nguyen.a@example.com</Typography>
              </Box>
            </div>
          )}
        </Box>

        {/* Nút hành động */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {/* Nút In hóa đơn */}
          <Button variant="outlined" color="primary" sx={{ textTransform: 'none' }}>
            In hóa đơn
          </Button>
          {/* Nút Xuất PDF */}
          <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
            Xuất PDF
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserTest;
