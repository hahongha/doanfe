import { Box, Grid, Typography, Chip } from "@mui/material";

const InfoItem = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" mt={1}>
    <Typography color="text.secondary" fontSize={14}>{label}</Typography>
    <Typography fontWeight="bold" fontSize={14}>{value}</Typography>
  </Box>
);

const InvoiceInfoSection = ({ room, tenant }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Box mb={2}>
        <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
          Thông tin phòng
        </Typography>
        <InfoItem label="Số phòng:" value={room?.roomNumber} />
        <InfoItem label="Mô tả:" value={room?.description} />
        <InfoItem label="Số người ở hiện tại:" value={room?.number} />
      </Box>
    </Grid>
    <Grid item xs={12} md={6}>
      <Box mb={2}>
        <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
          Thông tin người thuê
        </Typography>
        <InfoItem label="Họ tên:" value={tenant?.fullName} />
        <InfoItem label="Giới tính:" value={tenant?.gender==="FEMALE"?"Nữ":"Nam"} />
        <InfoItem label="SĐT:" value={tenant?.phone} />
      </Box>
    </Grid>
  </Grid>
);

export default InvoiceInfoSection;
