import React, { useState } from 'react';
import {
  Box, Paper, Typography, Stack, Button, Chip, Grid, TextField,
  Switch
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteContractRequest, updateContractRequest } from 'redux/actions/contractAction';
import InfoRow from './InfoRow';
import { useNavigate } from 'react-router';
// import ContractDialog from './ContractDialog';

const ContractTab = ({ contractData }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(contractData || {});

  const formatDate = (dateString) => {
    if (!dateString) return "--/--/----";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(updateContractRequest(formData));
    setEditMode(false);
  };

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
    contractId
  } = formData || {};

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', p: 3 }}>
      <Paper elevation={3} sx={{ mx: 'auto', borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ backgroundColor: '#1e88e5', color: 'white', p: 3, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold">THÔNG TIN HỢP ĐỒNG</Typography>
          <Typography variant="subtitle1" mt={1}>
            Mã hợp đồng: <strong>{contractId || 'HD00123'}</strong>
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ paddingTop: 2, px: 5 }}>
          {/* Thông tin thời gian */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="primary" mb={2} borderBottom={2} borderColor="primary.main" pb={1}>
              Thông Tin Thời Gian
            </Typography>
            <Stack spacing={2}>
              <InfoRow label="Số tháng thuê" name="month" value={month} editMode={editMode} onChange={handleChange} />
              <InfoRow label="Ngày bắt đầu" name="startDate" value={startDate} editMode={editMode} onChange={handleChange} type='date'/>
              <InfoRow label="Ngày kết thúc (dự kiến)" name="endDate" value={endDate} editMode={editMode} onChange={handleChange} type='date'/>
              <InfoRow label="Ngày kết thúc thực tế" name="realEndDate" value={realEndDate} editMode={editMode} onChange={handleChange} type='date'/>
              <InfoRow label="Ngày ký hợp đồng" name="signatureDate" value={signatureDate} editMode={editMode} onChange={handleChange} />
            </Stack>
          </Grid>

          {/* Thông tin tài chính */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="primary" mb={2} borderBottom={2} borderColor="primary.main" pb={1}>
              Thông Tin Tài Chính
            </Typography>
            <Stack spacing={2}>
              <InfoRow label="Giá thuê/tháng" name="rentalPrice" value={rentalPrice} editMode={editMode} onChange={handleChange} />
              <InfoRow label="Tiền cọc" name="deposit" value={deposit} editMode={editMode} onChange={handleChange} type='text' />
              <InfoRow 
                label="Trạng thái cọc" 
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
          </Grid>
        </Grid>

        {/* Trạng thái hợp đồng */}
        <Box sx={{ paddingTop: 2, px: 5 }}>
          <Typography variant="h6" color="primary" mb={2} borderBottom={2} borderColor="primary.main" pb={1}>
            Trạng Thái Hợp Đồng
          </Typography>
          <Stack spacing={2}>
          <InfoRow
              label="Hiệu lực"
              name="status"
              type="select"
              value={status}
              options={{
                WAITING: "Đang chờ xác nhận",
                ACTIVE: "Đang có hiệu lực",
                EXPIRED: "Đã hết hạn",
                TERMINATED: "Bị chấm dứt sớm",
                CANCELED: "Đã bị hủy",
                PENDING: "Đang chờ xử lý",
                COMPLETED: "Đã hoàn thành",
                WAITING_CHECKOUT:"Chờ trả phòng"
              }}
              editMode={editMode}
              onChange={handleChange}
            />

          </Stack>
        </Box>

        {/* Button group */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3} sx={{ paddingBottom: 2, px: 5 }}>
          {editMode ? (
            <>
              <Button variant="contained" color="success" onClick={handleSave}>Lưu thay đổi</Button>
              <Button variant="outlined" color="inherit" onClick={() => { setEditMode(false); setFormData(contractData); }}>Hủy</Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>Chỉnh sửa</Button>
          )}
          <Button variant="contained" color="secondary">In hợp đồng</Button>
          {
            status === "ACTIVE" && (
              <>
                <Button variant="contained" color="success">Gia hạn hợp đồng</Button>
                <Button variant="contained" color="error"
                onClick={() => {
                      const contractId = contractData?.id; // Thay thế bằng giá trị thực tế của roomId
                      const roomId = contractData?.room?.id;
                      navigate(`/manager/createRoomReturn/${contractId}/${roomId}`); // Đưa renterId và roomId vào URL
                    }}
                >Hủy hợp đồng</Button>
              </>
            )
          }
          {
            status === "WAITING" && <Button variant="contained" color="error" onClick={() => dispatch(deleteContractRequest(contractId))}>Xóa</Button>
          }
        </Stack>
      </Paper>
    </Box>
  );
};

export default ContractTab;