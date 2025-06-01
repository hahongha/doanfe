import { useState } from 'react';
import { Box, Typography, Paper, Divider, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Tab,Tabs, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { CalendarToday, MonetizationOn, Home, Person, CheckCircle, AccessTime } from '@mui/icons-material';


function BillPanelDialog({invoiceData, open, handleClose}) {
  function TabPanel({ children, value, index }) {
    return value === index ? <Box mt={2}>{children}</Box> : null;
  }
  const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('vi-VN');

     const [tabIndex, setTabIndex] = useState(0);
      const [showDetails, setShowDetails] = useState(true);
    return ( 
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chi tiết hóa đơn</DialogTitle>
        <DialogContent>
        <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
        <Tab label="Chi tiết hóa đơn" />
        <Tab label="Thông tin phòng" icon={<Home />} iconPosition="start" />
        <Tab label="Thông tin người thuê" icon={<Person />} iconPosition="start" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <Paper sx={{ mt: 2, p: 2 }}>
          <Box display="flex" flexDirection="column" gap={1} mb={2}>
              <Typography variant="h4">Chi tiết hóa đơn</Typography>
              <Typography variant="h4">Tên hóa đơn: {invoiceData?.name}</Typography>
              <Typography variant="h7">Ngày thanh toán: {invoiceData?.paymentDate}</Typography>
              <Typography variant="h7">Ghi chú: {invoiceData?.note}</Typography>
              <Typography variant="h7">Trạng thái: {invoiceData?.status}</Typography>
              <Typography variant="h7">Hạn thanh toán: {invoiceData?.dueDate}</Typography>
              
              <Button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'Ẩn' : 'Hiển thị'}
              </Button>
            </Box>


          {showDetails && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mục</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Đơn giá</TableCell>
                  <TableCell align="right">Số tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceData.billDetails.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell align="right">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}

          <Box display="flex" flexDirection="column" gap={1} mb={2}>
            <Typography variant="h5">Tổng phải đóng: {formatCurrency(invoiceData?.value)}</Typography>
              <Typography variant="h5">Giảm giá: {formatCurrency(invoiceData?.discount)} </Typography>
              <Typography variant="h5">Đã thanh toán: {formatCurrency(invoiceData?.paid)}</Typography>
              <Typography variant="h5">Còn lại: {formatCurrency(invoiceData?.totalAmount)}</Typography>
          </Box>
        </Paper>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography variant="h4" gutterBottom>Thông tin phòng</Typography>
          <Typography variant="subtitle1">Phòng {invoiceData.room.roomNumber}</Typography>
          <Typography variant="body2" gutterBottom>{invoiceData.room.description}</Typography>
          <Typography variant="body2">Giá phòng: {formatCurrency(invoiceData.room.cost)}</Typography>
          <Typography variant="body2">Trang thiết bị: {invoiceData.room.funiture.join(', ')}</Typography>
          <Typography variant="body2">
            Trạng thái: <span style={{ color: invoiceData.room.isActive ? 'green' : 'red' }}>
              {invoiceData.room.isActive ? 'Đang hoạt động' : 'Ngưng hoạt động'}
            </span>
          </Typography>
        </Paper>
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography variant="h4" gutterBottom>Thông tin người thuê</Typography>
          <Typography variant="subtitle1">{invoiceData.renter.fullName}</Typography>
          <Typography variant="body2">Giới tính: {invoiceData.renter.gender === 'Female' ? 'Nữ' : 'Nam'}</Typography>
          <Typography variant="body2">Điện thoại: {invoiceData.renter.phone}</Typography>
          <Typography variant="body2">Ngày sinh: {formatDate(invoiceData.renter.dob)}</Typography>
          <Typography variant="body2">CMND/CCCD: {invoiceData.renter.identification}</Typography>
          <Typography variant="body2">Nguyên quán: {invoiceData.renter.placeOfOrigin}</Typography>
          <Typography variant="body2">Đăng ký tạm trú: {invoiceData.renter.isRegister ? 'Đã đăng ký' : 'Chưa đăng ký'}</Typography>
        </Paper>
      </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button variant='outlined' onClick={handleClose}>In hóa đơn</Button>
          {invoiceData.status !== 'PAID'&& (
                <Button variant="contained" sx={{ margin: 2 }}>
                    Thanh toán
                </Button>
            )}
        </DialogActions>
      </Dialog>
     );
}

export default BillPanelDialog;