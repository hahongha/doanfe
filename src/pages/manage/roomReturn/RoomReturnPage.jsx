import React, { useEffect, useState } from 'react';
import {
  Container, Typography, TextField, Button, MenuItem,
  FormControl, InputLabel, Select, Grid, Paper
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addRoomReturnRequest, updateRoomReturnRequest } from 'redux/actions/roomReturnAction';
import { useParams, useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';
function RoomReturnFormPage({ data }) {
  const { contractId, roomId } = useParams(); // Lấy contractId và roomId từ URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: null,
    contractId: contractId || '',
    roomId: roomId || '',
    returnDate: '',
    reason: '',
    note: '',
    status: 'PENDING',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        contractId: contractId || data.contractId,
        roomId: roomId || data.roomId,
      });
    }
  }, [data, contractId, roomId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    
    if (formData.id) {
      dispatch(updateRoomReturnRequest(formData));
    } else {
      dispatch(addRoomReturnRequest(formData));
    }
    // navigate("/manager/roomReturn");
  };

  return (
    <MainCard>
        <Typography variant="h5" gutterBottom>
          {formData.id ? 'Cập nhật trả phòng' : 'Thêm trả phòng'}
        </Typography>

        {/* Trường Mã hợp đồng */}
        <TextField
          fullWidth
          label="Mã hợp đồng"
          value={formData.contractId}
          name="contractId"
          margin="normal"
          disabled
        />

        {/* Trường Phòng */}
        <TextField
          fullWidth
          label="Phòng"
          value={formData.roomId}
          name="roomId"
          margin="normal"
          disabled
        />

        {/* Trường Ngày trả */}
        <TextField
          label="Ngày trả"
          type="date"
          fullWidth
          name="returnDate"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={formData.returnDate}
          onChange={handleChange}
        />

        {/* Trường Lý do trả phòng */}
        <TextField
          label="Lý do trả phòng"
          fullWidth
          name="reason"
          margin="normal"
          value={formData.reason}
          onChange={handleChange}
        />

        {/* Trường Ghi chú */}
        <TextField
          label="Ghi chú"
          fullWidth
          name="note"
          margin="normal"
          multiline
          rows={3}
          value={formData.note}
          onChange={handleChange}
        />

        {/* Trường Trạng thái */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Trạng thái</InputLabel>
          <Select
            name="status"
            value={formData.status}
            label="Trạng thái"
            onChange={handleChange}
          >
            <MenuItem value="PENDING">Chờ duyệt</MenuItem>
            <MenuItem value="APPROVED">Đã tiếp nhận</MenuItem>
            <MenuItem value="REJECTED">Từ chối</MenuItem>
            <MenuItem value="COMPLETED">Hoàn tất</MenuItem>
            <MenuItem value="IN_PROGRESS">Đang xử lý</MenuItem>
          </Select>
        </FormControl>

        {/* Các nút Hủy và Lưu */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" onClick={() => navigate(-1)}>
              Hủy
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              Lưu
            </Button>
          </Grid>
        </Grid>
    </MainCard>
  );
}

export default RoomReturnFormPage;
