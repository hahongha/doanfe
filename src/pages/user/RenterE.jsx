import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import http from '../../redux/api/http';

export default function RenterW() {
  const [utilityData, setUtilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => !!state.auth.accessToken);

  const params = {
    type: "ELECTRIC"
    // ,
    // month1: 1,
    // month2: 3,
    // year1: 2024,
    // year2: 2025
  };
  const fetchUtilityData = async () => {
    try {
      setLoading(true);

      if (!isAuthenticated) {
        setLoading(false);
        toast.warning({
          message: "Chưa đăng nhập",
          description: "Vui lòng đăng nhập để xem thông tin cá nhân",
        });
        return;
      }

      const response = await http.get('/userRental/getEW', { params });
      

      if (response.data.code === "200") {
        setUtilityData(response.data.data);
        
      } else {
        toast.error({
          message: "Lỗi",
          description:
            response.message || "Không thể tải thông tin người dùng",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error({
        message: "Lỗi kết nối",
        description: "Không thể kết nối đến máy chủ",
      });
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      fetchUtilityData();
    }else{
      navigate("/login");
    }
  }, [navigate, dispatch, isAuthenticated]);
    
  if (!utilityData || utilityData.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">Không có chỉ số nào</Typography>
      </Box>
    );
  }
  return (
    <MainCard>
      <Typography variant="h5" gutterBottom>Bảng ghi chỉ số điện nước</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tháng/Năm</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Chỉ số cũ</TableCell>
              <TableCell>Chỉ số mới</TableCell>
              <TableCell>Số tiêu thụ</TableCell>
              <TableCell>Đơn giá</TableCell>
              <TableCell>Thành tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {utilityData &&utilityData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.month}/{item.year}</TableCell>
                <TableCell>
                  <Chip
                    label={item.type === 'Electric' ? 'Điện' : 'Nước'}
                    color={item.type === 'Electric' ? 'warning' : 'info'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{item.room.roomNumber}</TableCell>
                <TableCell>{item.previousIndex}</TableCell>
                <TableCell>{item.currentIndex}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.pricePerUnit} VND</TableCell>
                <TableCell>{item.totalAmount} VND</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}