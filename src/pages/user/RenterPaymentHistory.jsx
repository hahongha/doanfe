import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  TablePagination,
  Grid,
  Tooltip,
  Grid2,
} from "@mui/material";
import { toast } from 'react-toastify';
import http from 'redux/api/http';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
const RenterPaymentHistory = () => {
  const formatCurrency = (value) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchPaymentData = async () => {
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
  
      const response = await http.get("/userRental/getPaymentHistory");
      
      
  
      if (response.data.code === "200") {
        setPaymentData(response.data.data);
        console.log(response.data.data);
        
      } else {
        toast.error({
          message: "Lỗi",
          description:
            response.message || "Không thể tải thông tin phòng",
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
  useEffect(() => {
    if (isAuthenticated) {
      fetchPaymentData();
    }else{
      navigate("/login");
    }
  }, [navigate, dispatch, isAuthenticated]);
  if (!paymentData || paymentData.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">Không có phòng nào nào</Typography>
      </Box>
    );
  }

  return (
    <MainCard>
      <Grid2 container spacing={2}>
          <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>Mã thanh toán</TableCell> */}
            <TableCell>Mã hóa đơn</TableCell>
            <TableCell>Tên hóa đơn</TableCell>
            <TableCell>Ngày thanh toán</TableCell>
            <TableCell>Phương thức</TableCell>
            <TableCell>Số tiền</TableCell>
            <TableCell>Ghi chú</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentData.map((payment) => (
            <TableRow key={payment.id}>
              {/* <TableCell>{payment.id}</TableCell> */}
              <TableCell>{payment.bill?.id}</TableCell>
              <TableCell>{payment.bill?.name}</TableCell>
              <TableCell>{payment.paymentDate}</TableCell>
              <TableCell>{payment.paymentMethod}</TableCell>
              <TableCell>{formatCurrency(payment.value)}</TableCell>
              <TableCell>{payment.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </Grid2>   
      </MainCard>

  )
};

export default RenterPaymentHistory;
