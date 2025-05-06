import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addRoomServiceRequest, updateRoomServiceRequest } from "redux/actions/roomServiceAction";

export default function RoomServiceEditForm({data, roomOptions, serviceOptions, onClose, open}) {
  const [selectedServiceId, setSelectedServiceId] = useState(1);
  const [selectedRoomId, setSelectedRoomId] = useState(1);
  const [startDate, setStartDate] = useState("2025-05-02");
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState("ACTIVE");
  const [quantity, setQuantity] = useState("ACTIVE");
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setSelectedServiceId(data.service?.id || "");
      setSelectedRoomId(data.room?.id || "");
      setStartDate(data.startDate || "");
      setStatus(data.status || "ACTIVE");
      setEndDate(data.endDate|| "");
      setQuantity(data.quantity||0);
    }
  }, [data, open]);
  

  const handleSubmit = () => {
    const selectedService = serviceOptions.find((s) => s.id === selectedServiceId);
    const selectedRoom = roomOptions.find((r) => r.id === selectedRoomId);
    const updatedData = {
        id: data?.id|| null,
      service: selectedService,
      room: selectedRoom,
      startDate,
      status,
      endDate,
      quantity
    };
    {data.id? dispatch(updateRoomServiceRequest(updatedData)): dispatch(addRoomServiceRequest(updatedData))};
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogContent>
        <Typography variant="h5" gutterBottom>
          Chỉnh sửa đăng ký dịch vụ phòng
        </Typography>

        <Grid container spacing={3}>
          {/* Chọn dịch vụ */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="service-select-label">Dịch vụ</InputLabel>
              <Select
                labelId="service-select-label"
                value={selectedServiceId}
                label="Dịch vụ"
                onChange={(e) => setSelectedServiceId(Number(e.target.value))}
              >
                {Array.isArray(serviceOptions) && serviceOptions.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.serviceName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Chọn phòng */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="room-select-label">Phòng</InputLabel>
              <Select
                labelId="room-select-label"
                value={selectedRoomId}
                label="Phòng"
                onChange={(e) => setSelectedRoomId(Number(e.target.value))}
              >
                {Array.isArray(roomOptions) && roomOptions.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    {room.roomNumber}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Ngày bắt đầu */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ngày bắt đầu"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Ngày bắt đầu */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ngày két thúc"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Số lượng"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Trạng thái */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Trạng thái</InputLabel>
              <Select
                labelId="status-label"
                value={status}
                label="Trạng thái"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="ACTIVE">
                  <Chip label="ACTIVE" color="success" size="small" />
                </MenuItem>
                <MenuItem value="INACTIVE">
                  <Chip label="INACTIVE" color="default" size="small" />
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
            {/* Nút lưu */}
            <Box mt={2} display={"flex"} justifyContent={"space-between"} gap={2}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Lưu thay đổi
              </Button>
              <Button variant="contained" color="primary" onClick={onClose}>
                Đóng
              </Button>
            </Box>
        </DialogActions>
    </Dialog>
  );
}
