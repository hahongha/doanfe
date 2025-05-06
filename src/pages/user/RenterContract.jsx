import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Typography, Avatar, Chip, Grid2, Paper, Stack, Button, Box } from "@mui/material";
import MainCard from 'components/MainCard';
import ContractDetail from "./ContractDetail";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import http from "../../redux/api/http";
const getGender = (type) => {
  switch (type) {
    case "MALE":
    case "Male":
      return "Nam";
    case "FEMALE":
    case "Female":
      return "Nữ";
    default:
      return "Không xác định";
  }
};


export default function RenterContract() {
const [contractData, setContractData] = useState(null);
const [loading, setLoading] = useState(true);
const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
const navigate = useNavigate();
const dispatch = useDispatch();
const fetchContractData = async () => {
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

    const response = await http.get("/userRental/getContract");
    console.log(response);
    

    if (response.data.code === "200") {
      setContractData(response.data.data);
      
    } else {
      toast.error({
        message: "Lỗi",
        description:
          response.message || "Không thể tải thông tin hợp đồng",
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
    fetchContractData();
  }else{
    navigate("/login");
  }
}, [navigate, dispatch, isAuthenticated]);
if (!contractData || contractData.length === 0) {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h6">Không có hợp đồng nào</Typography>
    </Box>
  );
}
  return (
    <MainCard title="Hợp đồng của tôi">
      
{contractData.map((contract) =>
          <ContractDetail contract={contract}/>)
}
          
    </MainCard>
  );
}
