import { useState, useEffect } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack,
  Calculate,
  FlashOn,
  WaterDrop,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllRoomRequest } from 'src/redux/actions/roomAction';
import { addEWRequest, updateEWRequest } from 'src/redux/actions/ewActions';
import { toast } from 'react-toastify';
import http from 'redux/api/http';
export default function EWDetail({ open, index, onClose }) {
  const rooms = useSelector((state) => state.room.all_rooms || []);
  const loading = useSelector((state) => state.room.loading || state.ew.loading || false);
  const [eP, setEP] = useState(3000);
  const [wP, setWP] = useState(3000);
  const dispatch = useDispatch();

  // Fetch rooms on component mount
  useEffect(() => {
    dispatch(getAllRoomRequest());
    handlePrices();
  }, [dispatch]);

  const handlePrices = async () =>{     
    try {
      const response = await http.get(`/service/${1}`);
      if (response.data.code === "200") {
        setEP(response.data.data.value)
      } else {
        toast.error({
          message: "Lỗi",
          description:
            "Không thể tải thông tin tiền điện",
        });
      }

      const response2 = await http.get(`/service/${2}`);
      if (response2.data.code === "200") {
        setWP(response2.data.data.value)
      } else {
        toast.error({
          message: "Lỗi",
          description:
            "Không thể tải thông tin tiền điện",
        });
      }
      } catch (error) {
      toast.error({
        message: "Lỗi kết nối",
        description: "Không thể kết nối đến máy chủ",
      });
    }
  }

  const [formData, setFormData] = useState({
    type: 'ELECTRIC',
    roomId: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    previousIndex: 0,
    currentIndex: 0,
    pricePerUnit: eP,
    recordDate: new Date().toISOString().split('T')[0]
  });

  const [calculatedData, setCalculatedData] = useState({
    value: 0,
    totalAmount: 0,
  });

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  // Populate form with existing data when editing
  useEffect(() => {
    if (index) {
      setFormData({
        id: index.id || null,
        type: index.type || 'ELECTRIC',
        roomId: index.room?.id ? index.room.id.toString() : '',
        month: index.month || new Date().getMonth() + 1,
        year: index.year || new Date().getFullYear(),
        previousIndex: index.previousIndex || 0,
        currentIndex: index.currentIndex || 0,
        recordDate: index.recordDate || new Date().toISOString().split('T')[0],
        pricePerUnit: index.pricePerUnit || eP,
      });
    } else {
      setFormData({
        type: 'ELECTRIC',
        roomId: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        previousIndex: 0,
        currentIndex: 0,
        recordDate: new Date().toISOString().split('T')[0],
        pricePerUnit: eP,
      });
    }
  }, [index]);

  // Calculate usage and total amount
  useEffect(() => {
    const value = Math.max(0, formData.currentIndex - formData.previousIndex);
    const totalAmount = value * formData.pricePerUnit;
    setCalculatedData({
      value: parseFloat(value.toFixed(2)),
      totalAmount: Math.round(totalAmount),
    });
  }, [formData.currentIndex, formData.previousIndex, formData.pricePerUnit]);

  // Handle utility type change (Electric/Water)
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    console.log(newType);
    
    const selectedRoom = rooms.find((room) => room.id.toString() === formData.roomId.toString());

    const previousIndex = selectedRoom
      ? newType === 'ELECTRIC'
        ? selectedRoom.electricIndex || 0
        : selectedRoom.waterIndex || 0
      : 0;
    
      const prePrice = newType === 'ELECTRIC'? eP :wP;

    setFormData((prev) => ({
      ...prev,
      type: newType,
      pricePerUnit: prePrice,
      previousIndex,
      currentIndex: previousIndex,
    }));
    console.log(formData);
    
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        ['currentIndex', 'previousIndex', 'pricePerUnit', 'month', 'year'].includes(name)
          ? parseFloat(value) || 0
          : value,
    }));
    console.log(formData);
    
  };

  // Validate form inputs
  const validateForm = () => {
    if (!formData.roomId) return 'Vui lòng chọn phòng';
    if (formData.currentIndex <= formData.previousIndex) return 'Chỉ số mới phải lớn hơn chỉ số cũ';
    if (formData.year < 2000 || formData.year > new Date().getFullYear() + 1) return 'Năm không hợp lệ';
    if (!formData.recordDate) return 'Vui lòng chọn ngày ghi nhận';
    if (formData.month < 1 || formData.month > 12) return 'Tháng không hợp lệ';
    return null;
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Form Data:', formData); // Log formData to console

    const error = validateForm();
    if (error) {
      showNotification(error, 'error');
      return;
    }

    const newRecord = {
      ...formData,
      value: calculatedData.value,
      totalAmount: calculatedData.totalAmount,
      room: { id: parseInt(formData.roomId, 10) },
    };
    if(formData.id){
      dispatch(updateEWRequest(newRecord));
    }else{
      dispatch(addEWRequest(newRecord));
    }
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type,
    });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth aria-labelledby="ew-dialog-title">
      <DialogContent>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
          <Box sx={{ backgroundColor: 'primary.main', padding: 2, color: 'white', display: 'flex', alignItems: 'center' }}>
            <Button variant="text" color="inherit" sx={{ marginRight: 2 }} onClick={onClose} aria-label="Quay lại">
              <ArrowBack />
            </Button>
            <Box>
              <Typography id="ew-dialog-title" variant="h5">Tạo Chỉ Số Tiện Ích Mới</Typography>
              <Typography variant="body2">Nhập thông tin để ghi nhận chỉ số mới</Typography>
            </Box>
          </Box>

          <Snackbar open={notification.show} autoHideDuration={3000} onClose={() => setNotification((prev) => ({ ...prev, show: false }))}>
            <Alert severity={notification.type} sx={{ width: '100%' }} onClose={() => setNotification((prev) => ({ ...prev, show: false }))}>
              {notification.message}
            </Alert>
          </Snackbar>

          <Box sx={{ padding: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" id="utility-type-label">Loại tiện ích</FormLabel>
                <RadioGroup
                  row
                  name="type"
                  value={formData.type}
                  onChange={handleTypeChange}
                  aria-labelledby="utility-type-label"
                >
                  <FormControlLabel
                    value="ELECTRIC"
                    control={<Radio />}
                    label={
                      <>
                        <FlashOn sx={{ marginRight: 1 }} />
                        Điện
                      </>
                    }
                  />
                  <FormControlLabel
                    value="WATER"
                    control={<Radio />}
                    label={
                      <>
                        <WaterDrop sx={{ marginRight: 1 }} />
                        Nước
                      </>
                    }
                  />
                </RadioGroup>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="room-select-label">Chọn phòng</InputLabel>
                <Select
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  label="Chọn phòng"
                  labelId="room-select-label"
                >
                  <MenuItem value="">-- Chọn phòng --</MenuItem>
                  {rooms.map((room) => (
                    <MenuItem key={room.id} value={room.id.toString()}>
                      {room.roomNumber}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="month-select-label">Tháng</InputLabel>
                <Select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  label="Tháng"
                  labelId="month-select-label"
                >
                  {[...Array(12)].map((_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>Tháng {i + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Năm"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                inputProps={{ min: 2000, max: new Date().getFullYear() + 1 }}
                InputLabelProps={{ shrink: true }}
                fullWidth
                aria-describedby="year-input-description"
              />

              <TextField
                label="Đơn giá"
                name="pricePerUnit"
                type="number"
                value={formData.pricePerUnit}
                onChange={handleChange}
                inputProps={{ min: 2000, max: new Date().getFullYear() + 1 }}
                InputLabelProps={{ shrink: true }}
                fullWidth
                aria-describedby="year-input-description"
              />

              <TextField
                fullWidth
                name="recordDate"
                label="Ngày ghi nhận"
                type="date"
                value={formData.recordDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                aria-describedby="record-date-description"
              />
            </Box>

            <Box sx={{ paddingTop: 2 }}>
              <TextField
                fullWidth
                label="Chỉ số cũ"
                name="previousIndex"
                type="number"
                value={formData.previousIndex}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
                inputProps={{ min: 0 }}
                aria-describedby="previous-index-description"
              />
              <TextField
                fullWidth
                label="Chỉ số mới"
                name="currentIndex"
                type="number"
                value={formData.currentIndex}
                onChange={handleChange}
                inputProps={{ min: 0 }}
                aria-describedby="current-index-description"
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            startIcon={<Calculate />}
            disabled={loading}
            aria-label="Lưu chỉ số tiện ích"
          >
            Lưu Chỉ Số
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={onClose}
            disabled={loading}
            aria-label="Đóng biểu mẫu"
          >
            Đóng
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

EWDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  index: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.oneOf(['ELECTRIC', 'WATER']),
    room: PropTypes.shape({
      id: PropTypes.number,
    }),
    month: PropTypes.number,
    year: PropTypes.number,
    previousIndex: PropTypes.number,
    currentIndex: PropTypes.number,
    recordDate: PropTypes.string,
    pricePerUnit: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
};