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
} from '@mui/material';
import { CalendarToday, Home, FlashOn, WaterDrop, Calculate, ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomRequest } from 'src/redux/actions/roomAction';
import { addEWRequest, updateEWRequest } from 'redux/actions/ewActions';
export default function CreateUtilityRecord({open, index, onClose}) {
  const rooms = useSelector((state) => state.room.all_rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoomRequest());
  }, [dispatch]);
  

  const defaultPrices = {
    ELECTRIC: 3500,
    WATER: 15000,
  };

  const [formData, setFormData] = useState(index ? index :{
    type: 'ELECTRIC',
    room: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    previousIndex: 0,
    currentIndex: 0,
    recordDate: new Date().toISOString().split('T')[0],
    pricePerUnit: defaultPrices.ELECTRIC,
  });

  const [calculatedData, setCalculatedData] = useState({
    value: 0,
    totalAmount: 0,
  });

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success', // 'success' or 'error'
  });

  useEffect(() => {
    if (index) {
      setFormData({
        ...index,
        room:
        {
            id: index.room?.id?.toString() ?? '',
        }
      });
    } else {
      setFormData({
        type: 'ELECTRIC',
        room: {
            id:''
        },
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        previousIndex: 0,
        currentIndex: 0,
        recordDate: new Date().toISOString().split('T')[0],
        pricePerUnit: defaultPrices.ELECTRIC,
      });
    }
  }, [index]);

  useEffect(() => {
    const value = Math.max(0, formData.currentIndex - formData.previousIndex);
    const totalAmount = value * formData.pricePerUnit;

    setCalculatedData({
      value: parseFloat(value.toFixed(2)),
      totalAmount: Math.round(totalAmount),
    });
  }, [formData.currentIndex, formData.previousIndex, formData.pricePerUnit]);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData((prev) => ({
      ...prev,
      type: newType,
      pricePerUnit: defaultPrices[newType],
    }));

    if (formData.room) {
      const selectedRoom = rooms.find((room) => room.id.toString() === formData.room.id);
      if (selectedRoom) {
        const previousIndex = newType === 'ELECTRIC'
          ? selectedRoom.electricIndex
          : selectedRoom.waterIndex;

        setFormData((prev) => ({
          ...prev,
          previousIndex: previousIndex,
          currentIndex: previousIndex,
        }));
      }
    }
  };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === 'currentIndex' || name === 'previousIndex' || name === 'pricePerUnit'
//         ? parseFloat(value) || 0
//         : value,
//     }));
//   };
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'room.id') {
            setFormData((prev) => ({
                ...prev,
                room: {
                ...prev.room,
                id: value
                }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]:
                name === 'currentIndex' || name === 'previousIndex' || name === 'pricePerUnit'
                    ? parseFloat(value) || 0
                    : value,
            }));
        }
    };
  

  const handleSubmit = () => {
    if (!formData.room) {
      showNotification('Vui lòng chọn phòng', 'error');
      return;
    }

    if (formData.currentIndex <= formData.previousIndex) {
      showNotification('Chỉ số mới phải lớn hơn chỉ số cũ', 'error');
      return;
    }

    const newRecord = {
      id: formData.id,
      type: formData.type,
      month: formData.month,
      year: formData.year,
      previousIndex: formData.previousIndex,
      currentIndex: formData.currentIndex,
      recordDate: formData.recordDate,
      value: calculatedData.value,
      pricePerUnit: formData.pricePerUnit,
      totalAmount: calculatedData.totalAmount,
      room:
      {
        id: rooms.find((room) => room.id.toString() === formData.room)
      }
    };

    // console.log('Chỉ số mới đã tạo:', newRecord);
    // showNotification('Tạo chỉ số mới thành công!', 'success');
    console.log(formData);

    {formData.id ? dispatch(updateEWRequest(formData)): dispatch(addEWRequest(formData))}
    
    setTimeout(() => {
      setFormData({
        id:null,
        type: 'ELECTRIC',
        room:
        {
            id:  0,
        },
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        previousIndex: 0,
        currentIndex: 0,
        recordDate: new Date().toISOString().split('T')[0],
        pricePerUnit: defaultPrices.ELECTRIC,
      });
    }, 1500);
    onClose();
  };

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
          <Box sx={{ backgroundColor: 'primary.main', padding: 2, color: 'white', display: 'flex', alignItems: 'center' }}>
            <Button variant="text" color="inherit" sx={{ marginRight: 2 }}>
              <ArrowBack />
            </Button>
            <Box>
              <Typography variant="h5">Tạo Chỉ Số Tiện Ích Mới</Typography>
              <Typography variant="body2">Nhập thông tin để ghi nhận chỉ số mới</Typography>
            </Box>
          </Box>

          <Snackbar open={notification.show} autoHideDuration={3000}>
            <Alert severity={notification.type} sx={{ width: '100%' }}>
              {notification.message}
            </Alert>
          </Snackbar>

          <Box sx={{ padding: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Loại tiện ích</FormLabel>
                <RadioGroup
                  row
                  name="type"
                  value={formData.type}
                  onChange={handleTypeChange}
                >
                  <FormControlLabel value="ELECTRIC" control={<Radio />} label={<><FlashOn sx={{ marginRight: 1 }} />Điện</>} />
                  <FormControlLabel value="WATER" control={<Radio />} label={<><WaterDrop sx={{ marginRight: 1 }} />Nước</>} />
                </RadioGroup>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Chọn phòng</InputLabel>
                <Select
                  name="room.id"
                  value={formData?.room?.id || ''}
                  onChange={handleChange}
                  label="Chọn phòng"
                >
                  <MenuItem value="">-- Chọn phòng --</MenuItem>
                  {rooms.map((room) => (
                    <MenuItem key={room.id} value={room?.id}>
                      {room?.roomNumber}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Tháng</InputLabel>
                <Select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  label="Tháng"
                >
                  {[...Array(12)].map((_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      Tháng {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
              <TextField
                label="Năm"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                inputProps={{ min: 2020, max: new Date().getFullYear() }} // Giới hạn năm từ 2020 đến năm hiện tại
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>


              <TextField
                fullWidth
                name="recordDate"
                label="Ngày ghi nhận"
                type="date"
                value={formData.recordDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box sx={{ paddingTop: 2 }}>
            <TextField
                fullWidth
                label="Chỉ số cũ"
                name="previousIndex"
                type="number"
                value={formData?.previousIndex}
                onChange={handleChange}
                sx={{marginBottom:2}}
              />
              <TextField
                fullWidth
                label="Chỉ số mới"
                name="currentIndex"
                type="number"
                value={formData.currentIndex}
                onChange={handleChange}
              />
              <Typography variant="body1">Giá điện: {formatCurrency(formData.pricePerUnit)}</Typography>
              <Typography variant="body1">Giá trị: {calculatedData.value} kWh</Typography>
              <Typography variant="body1">Số tiền: {formatCurrency(calculatedData.totalAmount)}</Typography>
            </Box>
          </Box>
        </Box>
        </DialogContent>
        <DialogActions>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, gap:5 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                startIcon={<Calculate />}
              >
                Lưu Chỉ Số
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={onClose}
                startIcon={<Calculate />}
              >
                Đóng
              </Button>
            </Box>
        </DialogActions>
    </Dialog>

  );
}
