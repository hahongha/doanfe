import React from 'react';
import { Box, Paper, Typography, Stack, Button, Chip, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteContractRequest } from '../../../redux/actions/contractAction';
import ContractDialog from './ContractDialog';

const ContractTab = ({ contractData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "--/--/----";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const formatCurrency = (amount) => {
    if (!amount) return "0 VNĐ";
    return new Intl.NumberFormat('vi-VN').format(amount) + " VNĐ";
  };

  const dispatch = useDispatch();

  const {
    month,
    startDate,
    endDate,
    realEndDate,
    signatureDate,
    rentalPrice,
    deposit,
    isDeposit,
    status,
    contractId,
  } = contractData || {};

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', p: 3 }}>
      <Paper elevation={3} sx={{ mx: 'auto', borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ backgroundColor: '#1e88e5', color: 'white', p: 3, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold">THÔNG TIN HỢP ĐỒNG</Typography>
          <Typography variant="subtitle1" mt={1}>
            Mã hợp đồng: <strong>{contractId || 'HD00123'}</strong>
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{paddingTop:2, paddingLeft:5, paddingRight:5}}>
          {/* Thông tin thời gian */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="primary" mb={2} borderBottom={2} borderColor="primary.main" pb={1}>
              Thông Tin Thời Gian
            </Typography>

            <Stack spacing={2}>
              <InfoRow label="Số tháng thuê" value={month} />
              <InfoRow label="Ngày bắt đầu" value={formatDate(startDate)} />
              <InfoRow label="Ngày kết thúc (dự kiến)" value={formatDate(endDate)} />
              <InfoRow label="Ngày kết thúc thực tế" value={realEndDate ? formatDate(realEndDate) : "--/--/----"} />
              <InfoRow label="Ngày ký hợp đồng" value={formatDate(signatureDate)} />
            </Stack>
          </Grid>

          {/* Thông tin tài chính */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="primary" mb={2} borderBottom={2} borderColor="primary.main" pb={1}>
              Thông Tin Tài Chính
            </Typography>

            <Stack spacing={2}>
              <InfoRow label="Giá thuê/tháng" value={formatCurrency(rentalPrice)} />
              <InfoRow label="Tiền cọc" value={formatCurrency(deposit)} />
              <InfoRow 
                label="Trạng thái đặt cọc" 
                value={
                  <Chip
                    label={isDeposit ? 'Đã đặt cọc' : 'Chưa đặt cọc'}
                    color={isDeposit ? 'success' : 'error'}
                    variant="outlined"
                    sx={{ width: 120, justifyContent: 'center' }}
                  />
                }
              />
            </Stack>
          </Grid>
          </Grid>

          {/* Trạng thái hợp đồng */}
          <Box sx={{paddingTop:2, paddingLeft:5, paddingRight:5}}>
            <Typography variant="h6" color="primary" mb={2} borderBottom={2} borderColor="primary.main" pb={1}>
              Trạng Thái Hợp Đồng
            </Typography>

            <Stack spacing={2}>
              <InfoRow 
                label="Hiệu lực" 
                value={
                  <Chip
                    label={status === 'ACTIVE' ? 'Có hiệu lực' : 'Không hiệu lực'}
                    color={status === 'ACTIVE' ? 'primary' : 'error'}
                    variant="outlined"
                    sx={{ width: 120, justifyContent: 'center' }}
                  />
                }
              />
            </Stack>
          </Box>

          {/* Button group */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3} sx={{paddingBottom:2 , paddingRight:5}}>
            <Button variant="contained" color="primary">Chỉnh sửa</Button>
            <Button variant="contained" color="success">In hợp đồng</Button>
            <Button variant="contained" color="error" onClick={()=>{
              dispatch(deleteContractRequest(contractId));
            }}>Xóa</Button>
          </Stack>
      </Paper>
      <ContractDialog />
    </Box>
  );
};

// Component con để render 1 dòng label-value
const InfoRow = ({ label, value }) => (
  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
    <Typography sx={{ width: { md: 200, xs: '100%' }, fontWeight: 600, color: '#555' }}>{label}</Typography>
    <Box 
      sx={{
        flex: 1,
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: 1,
        minHeight: 38,
        display: 'flex',
        alignItems: 'center',
        px: 2,
      }}
    >
      {typeof value === 'string' || typeof value === 'number' ? (
        <Typography>{value}</Typography>
      ) : value}
    </Box>
  </Stack>
);

export default ContractTab;
