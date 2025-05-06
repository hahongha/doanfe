import React from "react";
import { Card, CardContent, CardHeader, Typography, Avatar, Chip, Grid2, Paper, Stack, Button } from "@mui/material";
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const [year, month, day] = dateString?.split("-");
  return `${day}/${month}/${year}`;
};
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


const getBorderColor = (status) => {
  switch (status) {
    case "ACTIVE": return "2px solid green";
    case "INACTIVE": return "2px solid gray";
    default: return "2px solid gold";
  }
};

export default function ContractDetail({contract}) {
  const showActions = contract?.status === 'ACTIVE' || contract?.status === 'INACTIVE';

  return (
          <Grid2 container spacing={2}
           style={{ 
            // border: getBorderColor(contract.status), 
            padding:2, margin:2}}
           >
          <Grid2 size={3}>
              <Typography variant="h3" gutterBottom>Thông tin hợp đồng</Typography>
              <Typography variant="body1"><strong>Thời gian thuê:</strong> {contract?.month} tháng</Typography>
              <Typography variant="body1"><strong>Ngày bắt đầu:</strong> {formatDate(contract?.startDate)}</Typography>
              <Typography variant="body1"><strong>Ngày kết thúc:</strong> {formatDate(contract?.endDate)}</Typography>
              <Typography variant="body1"><strong>Tiền thuê:</strong> {contract?.rentalPrice} VNĐ</Typography>
              <Typography variant="body1"><strong>Đặt cọc:</strong> {contract?.deposit} VNĐ</Typography>
              <Typography variant="body1"><strong>Trạng thái:</strong> <Chip label={contract.status} color={contract.status === 'ACTIVE' ? 'success' : contract.status === 'INACTIVE' ? 'default' : 'warning'} /></Typography>
            </Grid2>
            <Grid2 size={5}>
              <Typography variant="h3" gutterBottom>Thông tin người thuê</Typography>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <Avatar src={contract?.renter?.user?.imageUrl} alt="avatar" sx={{ width: 56, height: 56 }} />
                <div>
                  <Typography variant="body1"><strong>Họ và tên:</strong>{contract?.renter.fullName}</Typography>
                  <Typography variant="body1"><strong>Giới tính:</strong>{getGender(contract?.renter?.gender)}</Typography>
                  <Typography variant="body1"><strong>Ngày sinh:</strong>{formatDate(contract?.renter?.dob)}</Typography>
                  <Typography variant="body1"><strong>Quê quán:</strong>{contract?.renter?.placeOfOrigin}</Typography>
                  <Typography variant="body1"><strong>Địa chỉ thường trú:</strong>{contract?.renter?.address}</Typography>
                  <Typography variant="body1"><strong>Số căn cước công dân:</strong>{contract?.renter?.identification}</Typography>
                  <Typography variant="body1"><strong>Số điện thoại:</strong>{contract?.renter?.phone}</Typography>
                  <Typography variant="body1"><strong>Email:</strong>{contract?.renter?.user?.email}</Typography>
                  <Typography variant="body1"><strong>Số điện thoại người thân:</strong>{contract?.renter?.familyPhone}</Typography>
                </div>
              </div>
            </Grid2>
            <Grid2 size={4}>
              <Typography variant="h3" gutterBottom>Thông tin phòng</Typography>
              <Typography variant="body1"><strong>Phòng:</strong> {contract?.room?.roomNumber}</Typography>
              <Typography variant="body1"><strong>Loại:</strong> {contract?.room?.room_Type?.name} ({contract?.room?.room_Type?.size}m²)</Typography>
              <Typography variant="body1"><strong>Nội thất:</strong> {contract?.room?.furniture}</Typography>
              {/* <Typography variant="body1"><strong>Giá phòng:</strong> {contract?.room?.room_Type?.cost} VNĐ</Typography> */}
              <Typography variant="body1"><strong>Mô tả:</strong> {contract?.room?.description}</Typography>
            </Grid2>
            {showActions && (
            <Stack direction="row" spacing={2} justifyContent="center" marginTop={3}>
              <Button variant="contained" color="primary">Gia hạn</Button>
              <Button variant="contained" color="warning">Không gia hạn</Button>
              <Button variant="outlined" color="error">Hủy hợp đồng</Button>
            </Stack>
          )}
          </Grid2>

          
  );
}
