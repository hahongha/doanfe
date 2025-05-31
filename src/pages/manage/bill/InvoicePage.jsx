import React from "react";
import { Box, Paper, Chip, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from "@mui/material";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceDetailTable from "./InvoiceDetailTable";
import InvoiceSummary from "./InvoiceSummary";
import PaymentQRCode from "../payment/PaymentQRCode";
import { useNavigate } from "react-router";

const InvoicePage = ({open, onClose, data}) => {
  const navigate = useNavigate();
  const InfoItem = ({ label, value }) => (
    <Box display="flex" justifyContent="space-between" mt={1}>
      <Typography color="text.secondary" fontSize={14}>{label}</Typography>
      <Typography fontWeight="bold" fontSize={14}>{value}</Typography>
    </Box>
  );
    const invoiceStatusMap = {
      PAID: {
        label: "Đã thanh toán",
        color: "success",
      },
      UNPAID: {
        label: "Chưa thanh toán",
        color: "error",
      },
      PARTIAL: {
        label: "Thanh toán một phần",
        color: "warning",
      },
      OVERDUE: {
        label: "Quá hạn",
        color: "error",
      },
      CANCELED: {
        label: "Đã hủy",
        color: "default",
      },
    };
    const getStatusChip = (statusValue) => {
      const status = invoiceStatusMap[statusValue];
    
      if (!status) {
        return <Chip label="Không xác định" color="default" size="small" />;
      }
    
      return <Chip label={status.label} color={status.color} size="small" />;
    };

  const items = [
    { name: "Tiền phòng tháng 05/2025", unitPrice: "3,500,000 VNĐ", quantity: 1, total: "3,500,000 VNĐ" },
    { name: "Tiền điện", unitPrice: "3,500 VNĐ/kWh", quantity: "50 kWh", total: "175,000 VNĐ" },
    { name: "Tiền nước", unitPrice: "25,000 VNĐ/khối", quantity: "5 khối", total: "125,000 VNĐ" },
    { name: "Internet", unitPrice: "150,000 VNĐ", quantity: 1, total: "150,000 VNĐ" },
  ];

  return (
    <Dialog open = {open} onClose={onClose}>
      <DialogTitle>
      <InvoiceHeader onPrint={() => window.print()} onExportPDF={() => {}} />
      </DialogTitle>
      <DialogContent>

      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" borderBottom="1px solid #e5e7eb" pb={2} mb={2}>
          <Box>
            <Typography variant="h5" fontWeight="bold">Hóa đơn #{data?.id}</Typography>
            <Typography variant="h5" fontWeight="bold">{data?.name}</Typography>
            <Typography color="text.secondary" fontSize={14}>
              Ngày tạo: {data?.createAt} | Hạn thanh toán: {data?.dueDate}
            </Typography>
            <Typography color="text.secondary" fontSize={14}>
              Ngày thanh toán: {data?.paymentDate}
            </Typography>
          </Box>
            {getStatusChip(data?.status)}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
                Thông tin phòng
              </Typography>
              <InfoItem label="Số phòng:" value={data?.room?.roomNumber} />
              <InfoItem label="Mô tả:" value={data?.room?.description} />
              <InfoItem label="Số người ở hiện tại:" value={data?.room?.number} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
                Thông tin người thuê
              </Typography>
              <InfoItem label="Họ tên:" value={data?.renter?.fullName} />
              <InfoItem label="Giới tính:" value={data?.renter?.gender==="FEMALE"?"Nữ":"Nam"} />
              <InfoItem label="SĐT:" value={data?.renter?.phone} />
            </Box>
          </Grid>
      </Grid>
        <InvoiceDetailTable items={data?.billDetails} />
        <InvoiceSummary subtotal={data?.value||0} paid= {data?.paid||0} discount = {data?.discount||0} />
        <Box mt={4}>
          <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
            Ghi chú
          </Typography>
          <PaymentQRCode 
            bankCode="MB"
            accountNumber="0388580312"
            accountName="PHAM THI HA"
            amount= {data?.value - data?.discount -data?.paid}
            description= {data?.name}
        />
          <Typography mt={1} fontSize={14} color="text.secondary">
            {data?.note}
          </Typography>
        </Box>
      </Paper>
      </DialogContent>
      <DialogActions>
        <Box mt={4} display={"flex"} justifyContent={"space-between"} gap={2}>
          {data?.status!=="PAID" &&
            <Button variant="outlined" color="success" onClick={()=>navigate(`/manager/create-payment/${data?.id}`)}>Thanh toán ngay</Button>}
          <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5, fontWeight: "bold" }} onClick={onClose}>
            Đóng
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default InvoicePage;
