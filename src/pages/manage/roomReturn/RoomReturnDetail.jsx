// RoomReturnDetail.jsx
import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, TextField, Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addRoomReturnRequest, updateRoomReturnRequest } from 'redux/actions/roomReturnAction';

function RoomReturnDetail({
  open,
  handleClose,
  data,
  contracts,
  rooms
}) {
  const [formData, setFormData] = useState({
    id: null,
    contractId: '',
    roomId: '',
    returnDate: '',
    reason: '',
    note: '',
    status: 'PENDING',
  });
  
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const dispatch = useDispatch();
  

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    {data.id? dispatch(updateRoomReturnRequest(formData)): dispatch(addRoomReturnRequest(formData))}
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Thêm trả phòng</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Hợp đồng</InputLabel>
          <Select
            name="contractId"
            value={formData.contractId}
            label="Hợp đồng"
            onChange={handleChange}
          >
            {contracts.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.id} - {c?.renter?.fullName}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Phòng</InputLabel>
          <Select
            name="roomId"
            value={formData.roomId}
            label="Phòng"
            onChange={handleChange}
          >
            {rooms.map((room) => (
              <MenuItem key={room.id} value={room.id}>{room?.roomNumber}</MenuItem>
            ))}
          </Select>
        </FormControl>

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

        <TextField
          label="Lý do trả phòng"
          fullWidth
          name="reason"
          margin="normal"
          value={formData.reason}
          onChange={handleChange}
        />

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

        <FormControl fullWidth margin="normal">
          <InputLabel>Trạng thái</InputLabel>
          <Select
            name="status"
            value={formData.status}
            label="Trạng thái"
            onChange={handleChange}
          >
            <MenuItem value="PENDING">Chờ duyệt</MenuItem>
            <MenuItem value="APPROVED">Đã duyệt</MenuItem>
            <MenuItem value="REJECTED">Từ chối</MenuItem>
            <MenuItem value="COMPLETED">Hoàn tất</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained">Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RoomReturnDetail;
