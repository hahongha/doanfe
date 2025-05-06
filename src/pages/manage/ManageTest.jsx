import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";

const InvoicePage = () => {
  return (
    <Box sx={{ maxWidth: 1000, margin: "0 auto", p: 2, bgcolor: "#f9fafb" }}>
      {/* Header */}
      <Paper elevation={2} sx={{ display: "flex", justifyContent: "space-between", p: 2, mb: 2, borderBottom: "4px solid #4f46e5" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ bgcolor: "#4f46e5", color: "#fff", px: 2, py: 1, borderRadius: 1, fontWeight: "bold" }}>QT</Box>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Quản Lý Nhà Trọ
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<PictureAsPdfIcon />}>
            Xuất PDF
          </Button>
          <Button variant="contained" startIcon={<PrintIcon />} sx={{ bgcolor: "#4f46e5" }}>
            In hóa đơn
          </Button>
        </Box>
      </Paper>

      {/* Main Content */}
      <Paper sx={{ p: 3 }}>
        {/* Bill Header */}
        <Box display="flex" justifyContent="space-between" borderBottom="1px solid #e5e7eb" pb={2} mb={2}>
          <Box>
            <Typography variant="h5" fontWeight="bold">Hóa đơn #HD001</Typography>
            <Typography color="text.secondary" fontSize={14}>
              Ngày tạo: 02/05/2025 | Hạn thanh toán: 12/05/2025
            </Typography>
          </Box>
          <Chip label="Chưa thanh toán" color="error" variant="outlined" />
        </Box>

        {/* Info Section */}
        <Grid container spacing={3}>
          {/* Room Info */}
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
                Thông tin phòng
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography color="text.secondary" fontSize={14}>Số phòng:</Typography>
                <Typography fontWeight="bold" fontSize={14}>R101</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography color="text.secondary" fontSize={14}>Trạng thái:</Typography>
                <Chip label="Đang cho thuê" color="success" size="small" />
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography color="text.secondary" fontSize={14}>Giá thuê:</Typography>
                <Typography fontWeight="bold" fontSize={14}>3,500,000 VNĐ</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography color="text.secondary" fontSize={14}>Nội thất:</Typography>
                <Typography fontWeight="bold" fontSize={14}>Giường, tủ, bàn học, máy lạnh</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Tenant Info */}
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
                Thông tin người thuê
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography color="text.secondary" fontSize={14}>Họ tên:</Typography>
                <Typography fontWeight="bold" fontSize={14}>Nguyễn Văn A</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography color="text.secondary" fontSize={14}>SĐT:</Typography>
                <Typography fontWeight="bold" fontSize={14}>0912345678</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography color="text.secondary" fontSize={14}>CCCD:</Typography>
                <Typography fontWeight="bold" fontSize={14}>001202012345</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography color="text.secondary" fontSize={14}>Địa chỉ:</Typography>
                <Typography fontWeight="bold" fontSize={14}>123 Đường ABC, Quận XYZ, TP. HCM</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bill Details Table */}
        <Box mt={4}>
          <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
            Chi tiết hóa đơn
          </Typography>
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Dịch vụ</TableCell>
                <TableCell>Đơn giá</TableCell>
                <TableCell>Số lượng/Chỉ số</TableCell>
                <TableCell>Thành tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Tiền phòng tháng 05/2025</TableCell>
                <TableCell>3,500,000 VNĐ</TableCell>
                <TableCell>1</TableCell>
                <TableCell>3,500,000 VNĐ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Tiền điện</TableCell>
                <TableCell>3,500 VNĐ/kWh</TableCell>
                <TableCell>50 kWh</TableCell>
                <TableCell>175,000 VNĐ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>Tiền nước</TableCell>
                <TableCell>25,000 VNĐ/khối</TableCell>
                <TableCell>5 khối</TableCell>
                <TableCell>125,000 VNĐ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>Internet</TableCell>
                <TableCell>150,000 VNĐ</TableCell>
                <TableCell>1</TableCell>
                <TableCell>150,000 VNĐ</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Paper>
              {/* Summary */}
              <Box mt={4} textAlign="right">
          <Typography fontSize={14}>Tạm tính: <strong>3,950,000 VNĐ</strong></Typography>
          <Typography fontSize={14}>Giảm giá: <strong>0 VNĐ</strong></Typography>
          <Typography fontSize={14}>Thành tiền: <strong>3,950,000 VNĐ</strong></Typography>
          <Typography fontSize={14}>Đã thanh toán: <strong>0 VNĐ</strong></Typography>
          <Typography fontSize={16} fontWeight="bold" color="error">
            Còn lại: 3,950,000 VNĐ
          </Typography>
        </Box>

        {/* Notes and Payment Button */}
        <Box mt={4}>
          <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
            Ghi chú
          </Typography>
          <Typography mt={1} fontSize={14} color="text.secondary">
            Vui lòng thanh toán trước hạn để tránh bị cắt dịch vụ và phạt trễ hạn. Mọi thắc mắc xin liên hệ chủ trọ qua Zalo/SĐT.
          </Typography>
        </Box>

        <Box mt={4} textAlign="right">
          <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5, fontWeight: "bold" }}>
            Xác nhận đã thanh toán
          </Button>
        </Box>

    </Box>
  );
};

export default InvoicePage;
