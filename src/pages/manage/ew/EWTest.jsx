// import { useState, useEffect } from 'react';
// import {
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel,
//   Select,
//   MenuItem,
//   InputLabel,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import {
//   ArrowBack,
//   Calculate,
//   FlashOn,
//   WaterDrop,
// } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllRoomRequest } from 'src/redux/actions/roomAction';
// import { addEWRequest, updateEWRequest } from 'redux/actions/ewActions';

// export default function EWDetail({ open, index, onClose }) {
//   const rooms = useSelector((state) => state.room.all_rooms);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllRoomRequest());
//   }, [dispatch]);

//   const defaultPrices = {
//     ELECTRIC: 3500,
//     WATER: 15000,
//   };

//   const [formData, setFormData] = useState({
//     type: 'ELECTRIC',
//     roomId: '',
//     month: new Date().getMonth() + 1,
//     year: new Date().getFullYear(),
//     previousIndex: 0,
//     currentIndex: 0,
//     recordDate: new Date().toISOString().split('T')[0],
//     pricePerUnit: defaultPrices.ELECTRIC,
//   });

//   const [calculatedData, setCalculatedData] = useState({
//     value: 0,
//     totalAmount: 0,
//   });

//   const [notification, setNotification] = useState({
//     show: false,
//     message: '',
//     type: 'success',
//   });

//   useEffect(() => {
//     if (index) {
//       setFormData({
//         ...index,
//         roomId: index.room?.id ?? '',
//       });
//     } else {
//       setFormData({
//         type: 'ELECTRIC',
//         roomId: '',
//         month: new Date().getMonth() + 1,
//         year: new Date().getFullYear(),
//         previousIndex: 0,
//         currentIndex: 0,
//         recordDate: new Date().toISOString().split('T')[0],
//         pricePerUnit: defaultPrices.ELECTRIC,
//       });
//     }
//   }, [index]);

//   useEffect(() => {
//     const value = Math.max(0, formData.currentIndex - formData.previousIndex);
//     const totalAmount = value * formData.pricePerUnit;

//     setCalculatedData({
//       value: parseFloat(value.toFixed(2)),
//       totalAmount: Math.round(totalAmount),
//     });
//   }, [formData.currentIndex, formData.previousIndex, formData.pricePerUnit]);

//   const handleTypeChange = (e) => {
//     const newType = e.target.value;
//     const selectedRoom = rooms.find((room) => room.id.toString() === formData.roomId.toString());

//     const previousIndex = selectedRoom
//       ? newType === 'ELECTRIC'
//         ? selectedRoom.electricIndex
//         : selectedRoom.waterIndex
//       : 0;

//     setFormData((prev) => ({
//       ...prev,
//       type: newType,
//       pricePerUnit: defaultPrices[newType],
//       previousIndex,
//       currentIndex: previousIndex,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         ['currentIndex', 'previousIndex', 'pricePerUnit', 'month', 'year'].includes(name)
//           ? parseFloat(value) || 0
//           : value,
//     }));
//   };

//   const handleSubmit = () => {
    
//     console.log(formData);

//     if (!formData.roomId) {
//       showNotification('Vui lòng chọn phòng', 'error');
//       return;
//     }

//     if (formData.currentIndex <= formData.previousIndex) {
//       showNotification('Chỉ số mới phải lớn hơn chỉ số cũ', 'error');
//       return;
//     }

//     // const newRecord = {
//     //   ...formData,
//     //   value: calculatedData.value,
//     //   totalAmount: calculatedData.totalAmount,
//     //   room: {
//     //     id: formData.roomId,
//     //   },
//     // };

//     // console.log(newRecord);
    

//     // if (formData.id) {
//     //   dispatch(updateEWRequest(newRecord));
//     // } else {
//     //   dispatch(addEWRequest(newRecord));
//     // }

//     setTimeout(() => {
//       setFormData({
//         id: null,
//         type: 'ELECTRIC',
//         roomId: '',
//         month: new Date().getMonth() + 1,
//         year: new Date().getFullYear(),
//         previousIndex: 0,
//         currentIndex: 0,
//         recordDate: new Date().toISOString().split('T')[0],
//         pricePerUnit: defaultPrices.ELECTRIC,
//       });
//     }, 1500);

//     onClose();
//   };

//   const showNotification = (message, type = 'success') => {
//     setNotification({
//       show: true,
//       message,
//       type,
//     });

//     setTimeout(() => {
//       setNotification((prev) => ({ ...prev, show: false }));
//     }, 3000);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogContent>
//         <Box sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
//           <Box sx={{ backgroundColor: 'primary.main', padding: 2, color: 'white', display: 'flex', alignItems: 'center' }}>
//             <Button variant="text" color="inherit" sx={{ marginRight: 2 }} onClick={onClose}>
//               <ArrowBack />
//             </Button>
//             <Box>
//               <Typography variant="h5">Tạo Chỉ Số Tiện Ích Mới</Typography>
//               <Typography variant="body2">Nhập thông tin để ghi nhận chỉ số mới</Typography>
//             </Box>
//           </Box>

//           <Snackbar open={notification.show} autoHideDuration={3000}>
//             <Alert severity={notification.type} sx={{ width: '100%' }}>
//               {notification.message}
//             </Alert>
//           </Snackbar>

//           <Box sx={{ padding: 3 }}>
//             <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
//               <FormControl component="fieldset" fullWidth>
//                 <FormLabel component="legend">Loại tiện ích</FormLabel>
//                 <RadioGroup row name="type" value={formData.type} onChange={handleTypeChange}>
//                   <FormControlLabel value="ELECTRIC" control={<Radio />} label={<><FlashOn sx={{ marginRight: 1 }} />Điện</>} />
//                   <FormControlLabel value="WATER" control={<Radio />} label={<><WaterDrop sx={{ marginRight: 1 }} />Nước</>} />
//                 </RadioGroup>
//               </FormControl>

//               <FormControl fullWidth>
//                 <InputLabel>Chọn phòng</InputLabel>
//                 <Select
//                   name="roomId"
//                   value={formData.roomId}
//                   onChange={handleChange}
//                   label="Chọn phòng"
//                 >
//                   <MenuItem value="">-- Chọn phòng --</MenuItem>
//                   {rooms.map((room) => (
//                     <MenuItem key={room.id} value={room.id}>
//                       {room.roomNumber}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth>
//                 <InputLabel>Tháng</InputLabel>
//                 <Select
//                   name="month"
//                   value={formData.month}
//                   onChange={handleChange}
//                   label="Tháng"
//                 >
//                   {[...Array(12)].map((_, i) => (
//                     <MenuItem key={i + 1} value={i + 1}>Tháng {i + 1}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <TextField
//                 label="Năm"
//                 name="year"
//                 type="number"
//                 value={formData.year}
//                 onChange={handleChange}
//                 inputProps={{ min: 2020, max: new Date().getFullYear() }}
//                 InputLabelProps={{ shrink: true }}
//                 fullWidth
//               />

//               <TextField
//                 fullWidth
//                 name="recordDate"
//                 label="Ngày ghi nhận"
//                 type="date"
//                 value={formData.recordDate}
//                 onChange={handleChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Box>

//             <Box sx={{ paddingTop: 2 }}>
//               <TextField
//                 fullWidth
//                 label="Chỉ số cũ"
//                 name="previousIndex"
//                 type="number"
//                 value={formData.previousIndex}
//                 onChange={handleChange}
//                 sx={{ marginBottom: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Chỉ số mới"
//                 name="currentIndex"
//                 type="number"
//                 value={formData.currentIndex}
//                 onChange={handleChange}
//               />
//             </Box>
//           </Box>
//         </Box>
//       </DialogContent>

//       <DialogActions>
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, gap: 2 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             startIcon={<Calculate />}
//           >
//             Lưu Chỉ Số
//           </Button>

//           <Button
//             variant="outlined"
//             color="primary"
//             onClick={onClose}
//           >
//             Đóng
//           </Button>
//         </Box>
//       </DialogActions>
//     </Dialog>
//   );
// }
