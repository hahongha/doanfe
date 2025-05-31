import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
  IconButton,
  Grid,
  Divider
} from '@mui/material';
import { CalendarToday, CheckCircle, Close as CloseIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomRequest } from 'src/redux/actions/roomAction';
import { getAllRenterRequest } from 'src/redux/actions/renterAction';
import { addContractRequest } from 'src/redux/actions/contractAction';
import { useNavigate, useParams } from 'react-router';
export default function AddContract() {
  const { roomId } = useParams();
  const [formData, setFormData] = useState({
    id: '',
    renter: { id: '' },
    room: { id: roomId||'' },
    month: 0,
    startDate: '2025-05-01',
    endDate: '2025-05-01',
    realEndDate: null,
    rentalPrice: 0,
    deposit: 0,
    isDeposit: true,
    status: 'pending',
    signatureDate: '2025-05-01'
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [renterIdentification, setRenterIdentification] = useState(formData?.renter?.identification? formData?.renter?.identification:'');
  const renterList = useSelector((state) => state.renter?.all_renter);
  const rooms = useSelector((state) => state.room.all_rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRenterRequest());
    dispatch(getAllRoomRequest()); 
    if(roomId)
      handleRoomChange2(roomId);
  }, [dispatch]);
  
  const calculateEndDate = (startDate, months) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split('T')[0]; // Định dạng yyyy-mm-dd
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newFormData = { ...formData };

    
    
  
    if (name === 'renter.id') {
      newFormData.renter = { ...formData.renter, id: value };
    } else if (type === 'checkbox') {
      newFormData[name] = checked;
    } else if (type === 'number') {
      newFormData[name] = parseFloat(value);
    } else {
      newFormData[name] = value;
    }
  
    // Nếu thay đổi startDate hoặc month thì cập nhật endDate
    if (name === 'startDate' || name === 'month') {
      const updatedStartDate = name === 'startDate' ? value : newFormData.startDate;
      const updatedMonths = name === 'month' ? parseInt(value, 10) : newFormData.month;
  
      if (updatedStartDate && updatedMonths >= 0) {
        newFormData.endDate = calculateEndDate(updatedStartDate, updatedMonths);
        
      }
    }
  
    setFormData(newFormData);
  };

  const handleRefresh= (e)=>{
    setFormData({
      id: '', renter: { id: '' }, room: { id: 0 }, month: 0,
      startDate: '2025-05-01', endDate: '2025-05-01', realEndDate: '2025-05-01',
      rentalPrice: 0, deposit: 0, isDeposit: true, status: 'pending', signatureDate: '2025-05-01'
    });
    setFoundRenter(null);
    setRenterIdentification('');
    setSelectedRoom(null);
  }
  

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    dispatch(addContractRequest(formData));
    setMessage('Hợp đồng đã được tạo thành công!');
    setMessageType('success');

    handleRefresh();

  };

  const clearMessage = () => {
    setMessage('');
    setMessageType('');
  };
  const [selectedRoom, setSelectedRoom] = useState('');
  
    const handleRoomChange = (event) => {
      const selectedRoomId = event.target.value;
      const room = rooms.find((room) => room.id === selectedRoomId);
      setSelectedRoom(room);
      setFormData((prev) => ({
        ...prev,
        room: { ...prev.room, id: selectedRoomId },
        deposit: room?.cost || 0,
        rentalPrice: room?.cost || 0
      }));
    };

    const handleRoomChange2 = (e) => {
      const selectedRoomId = e;
      const room = rooms.find((room) => room.id === selectedRoomId);
      setSelectedRoom(room);
      setFormData((prev) => ({
        ...prev,
        room: { ...prev.room, id: selectedRoomId },
        deposit: room?.cost || 0,
        rentalPrice: room?.cost || 0
      }));
    };

  const [foundRenter, setFoundRenter] = useState(null);

  const handleSearch = () => {
    console.log(renterIdentification);
    
    const renter = renterList.find((r) => r.identification === renterIdentification);
    if (renter) {
      setFoundRenter(renter);
      setFormData((prev) => ({
        ...prev,
        renter: { ...prev.renter, id: renter.id }
      }));
    } else {
      setFoundRenter(null);
      setMessage('Không tìm thấy khách thuê');
      setMessageType('error');
    }
  };
  

  return (
    <Box sx={{ bgcolor: '#f9fafb', minHeight: '100vh', py: 4 }}>
      <Box sx={{ mx: 'auto', bgcolor: 'white', borderRadius: 2, boxShadow: 3, p: 4 }}>
        <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
          Tạo Hợp Đồng Thuê Phòng
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
          Điền đầy đủ thông tin để tạo hợp đồng mới
        </Typography>

        {message && (
          <Alert
            severity={messageType === 'success' ? 'success' : 'error'}
            action={
              <IconButton color="inherit" size="small" onClick={clearMessage}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 3 }}
          >
            {message}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={6} md={6}>
          <TextField
              label="Nhập CMND/CCCD của khách thuê"
              value={renterIdentification || ''}
              onChange={(e) => setRenterIdentification(e.target.value)}
              fullWidth
              margin="normal"
            />


            <Button variant="contained" color="primary" onClick={handleSearch}>
              Tìm kiếm
            </Button>

            {foundRenter ? (
              <Box>
                <TextField label="Họ và tên người thuê" value={foundRenter?.fullName} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                <TextField label="Giới tính" value={foundRenter?.gender === "MALE" ? "Nam" : "Nữ"} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                <TextField label="Ngày sinh" value={foundRenter?.dob} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                <TextField label="Số điện thoại" value={foundRenter?.phone} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                <TextField label="CMND/CCCD" value={foundRenter?.identification} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                <TextField label="Quê quán" value={foundRenter?.placeOfOrigin} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                <TextField label="Nơi thường trú" value={foundRenter?.address} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                <TextField label="Số điện thoại gia đình" value={foundRenter?.familyPhone} fullWidth margin="normal" InputProps={{ readOnly: true }} />
              </Box>
            ) : (
                <Typography variant="body2" color="error" mt={2}>
                  Không tìm thấy khách thuê với ID: {formData?.renter?.id||''}
                </Typography>
            )}
          </Grid>
          <Grid item xs={6} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Chọn phòng</InputLabel>
              <Select
                label="Chọn phòng"
                name="roomSelect"
                required
                onChange={handleRoomChange}
                value={formData?.room?.id||""}
              >
                {rooms.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    {room.roomNumber} - {room.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedRoom && (
              <Box marginTop={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Mã phòng"
                      value={selectedRoom.roomNumber}
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Số người đang ở trong phòng"
                      value={selectedRoom.number}
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Nội thất"
                  value={selectedRoom.funiture.join(", ")}
                  fullWidth
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />

                <TextField
                  label="Gía thuê"
                  value={selectedRoom.cost}
                  fullWidth
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />

                <TextField
                  label="Mô tả"
                  value={selectedRoom.description}
                  fullWidth
                  margin="normal"
                  InputProps={{ readOnly: true }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Số tháng" name="month" type="number" value={formData.month} onChange={handleChange} fullWidth />
          </Grid>

          {["startDate", "endDate", 
          // "realEndDate",
           "signatureDate"].map((field, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <TextField
                label={{
                  startDate: 'Ngày bắt đầu',
                  endDate: 'Ngày kết thúc dự kiến',
                  // realEndDate: 'Ngày kết thúc thực tế',
                  signatureDate: 'Ngày ký'
                }[field]}
                name={field}
                type="date"
                value={formData[field]}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          ))}

          <Grid item xs={12} md={6}>
            <TextField label="Giá thuê (VNĐ)" name="rentalPrice" type="number" value={formData.rentalPrice} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Tiền đặt cọc (VNĐ)" name="deposit" type="number" value={formData.deposit} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={formData.isDeposit} name="isDeposit" onChange={handleChange} />}
              label="Đã đặt cọc"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select name="status" value={formData.status} onChange={handleChange} label="Trạng thái">
                <MenuItem value="pending">Đang chờ xử lý</MenuItem>
                <MenuItem value="active">Đang hoạt động</MenuItem>
                <MenuItem value="terminated">Đã chấm dứt</MenuItem>
                <MenuItem value="completed">Hoàn thành</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
          <Button variant="outlined" onClick={handleRefresh}>
            Đặt lại
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Tạo hợp đồng
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />
      </Box>
    </Box>
  );
}
