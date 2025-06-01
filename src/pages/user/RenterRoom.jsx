import { useEffect, useState } from 'react';
import { Home, CreditCard, Zap, Droplets, BedDouble, Check, X } from 'lucide-react';
import { Box, Typography, Card, CardHeader, CardContent, Grid, Avatar, Chip, Button, Divider, Paper, List, ListItem, ListItemIcon, ListItemText, Grid2 } from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import RoomDetails from './RoomDetails';
import http from 'redux/api/http';
import MainCard from 'components/MainCard';
import RenterContractMember from './RenterContractMember';
import RenterService from './RenterService';
export default function RenterRoom() {
  const [roomDatas, setRoomDatas] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchRoomData = async () => {
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
  
      const response = await http.get("/userRental/getRoom");
      
      
  
      if (response.data.code === "200") {
        setRoomDatas(response.data.data);
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
      fetchRoomData();
    }else{
      navigate("/login");
    }
  }, [navigate, dispatch, isAuthenticated]);
  if (!roomDatas || roomDatas.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">Không có phòng nào nào</Typography>
      </Box>
    );
  }
    return (
      <MainCard title="Thông tin phòng đang thuê">
      {roomDatas.map((room) =>
      <Grid2 container spacing={2}>
          <Grid2 size = {6}>
            <RoomDetails roomData={room}/>
          </Grid2>
          <Grid2 size = {6}>
            <MainCard title="Thông tin những người đang thuê cùng">
            <RenterContractMember contract={room?.contractId}/>
            </MainCard>
            <MainCard>
              <RenterService id={room?.id}/>
            </MainCard>
          </Grid2>
      </Grid2>
      )
      }
      
            
      </MainCard>
    );
  }
