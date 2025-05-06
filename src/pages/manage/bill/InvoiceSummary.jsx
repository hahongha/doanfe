import { Box, Typography } from "@mui/material";

const InvoiceSummary = ({ subtotal, discount, paid }) => {
  const remaining = subtotal - discount - paid;
  return (
    <Box mt={4} textAlign="right">
      <Typography fontSize={14}>Tạm tính: <strong>{subtotal} VNĐ</strong></Typography>
      <Typography fontSize={14}>Giảm giá: <strong>{discount} VNĐ</strong></Typography>
      <Typography fontSize={14}>Thành tiền: <strong>{(subtotal - discount)} VNĐ</strong></Typography>
      <Typography fontSize={14}>Đã thanh toán: <strong>{paid} VNĐ</strong></Typography>
      <Typography fontSize={16} fontWeight="bold" color="error">
        Còn lại: {remaining} VNĐ
      </Typography>
    </Box>
  );
};

export default InvoiceSummary;
