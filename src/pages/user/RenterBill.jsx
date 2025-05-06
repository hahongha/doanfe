import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid2,
  Paper,
  Chip,
  Divider,
  Button,
  CardMedia
} from '@mui/material';
import MainCard from 'components/MainCard';
import OneBill from './OneBill';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import http from '../../redux/api/http';
import BillDTO from './BillDTO';
const RenterBill = () => {
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchBillData = async () => {
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
  
      const response = await http.get("/userRental/getBill");
      
      
  
      if (response.data.code === "200") {
        setBillData(response.data.data);
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
      fetchBillData();
    }else{
      navigate("/login");
    }
  }, [navigate, dispatch, isAuthenticated]);
  if (!billData || billData.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">Không có phòng nào nào</Typography>
      </Box>
    );
  }

  return (
    <MainCard>
      {billData.map((bill) =>
      <Grid2 container spacing={2}>
          <Grid2 size = {12}>
            <BillDTO invoiceData={bill}/>
          </Grid2>
      </Grid2>
      )
      }
      
            
      </MainCard>

  )
};

export default RenterBill;
