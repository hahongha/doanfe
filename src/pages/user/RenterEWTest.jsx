// import { useState } from 'react';
// import { Zap, Droplets, Calendar, BarChart3, Calculator, Home } from 'lucide-react';
// import {
//   Box,
//   Typography,
//   Button,
//   Tabs,
//   Tab,
//   Paper,
//   Chip,
//   LinearProgress,
//   Grid,
//   Divider,
// } from '@mui/material';

// export default function RenterEW() {
//   const [utilityType, setUtilityType] = useState('Electric');

//   const electricData = {
//     id: 'e1',
//     type: 'Electric',
//     month: 1,
//     year: 2025,
//     previousIndex: 50.0,
//     currentIndex: 100.0,
//     value: 50.0,
//     pricePerUnit: 2000,
//     totalAmount: 100000,
//     room: {
//       id: 19,
//       roomNumber: 'R301',
//       status: 'ACTIVE',
//       cost: 3500000,
//       isActive: true,
//       funiture: ['Giường cao cấp', ' TV', ' tủ lạnh'],
//       description: 'Phòng VIP, đầy đủ nội thất cao cấp',
//       number: 301,
//       electricIndex: 0.0,
//       waterIndex: 0.0,
//       room_Type: {
//         id: 7,
//         name: 'Phòng VIP',
//         size: 25,
//         description: 'Phòng cao cấp, nội thất đầy đủ, máy giặt riêng',
//         imageList: [
//           'https://res.cloudinary.com/dlyprrqnn/image/upload/v1743004321/TEST/wsyqk6znjakexow6a5pc.jpg',
//         ],
//       },
//       images: [
//         'https://res.cloudinary.com/dlyprrqnn/image/upload/v1743047370/ig5sbtqsljs0tbsan2ru.jpg',
//       ],
//       contractId: null,
//     },
//   };

//   const waterData = {
//     id: 'w1',
//     type: 'Water',
//     month: 1,
//     year: 2025,
//     previousIndex: 10.0,
//     currentIndex: 18.0,
//     value: 8.0,
//     pricePerUnit: 15000,
//     totalAmount: 120000,
//     room: electricData.room,
//   };

//   const currentData = utilityType === 'Electric' ? electricData : waterData;

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

//   const getMonthName = (month) => {
//     const monthNames = [
//       'Tháng 1',
//       'Tháng 2',
//       'Tháng 3',
//       'Tháng 4',
//       'Tháng 5',
//       'Tháng 6',
//       'Tháng 7',
//       'Tháng 8',
//       'Tháng 9',
//       'Tháng 10',
//       'Tháng 11',
//       'Tháng 12',
//     ];
//     return monthNames[month - 1];
//   };

//   const getPercentage = () => {
//     const maxValue = utilityType === 'Electric' ? 100 : 20;
//     return Math.min(100, (currentData.value / maxValue) * 100);
//   };

//   return (
//     <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
//       <Box maxWidth="md" mx="auto">
//         <Paper elevation={2} sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
//           <Box display="flex" alignItems="center">
//             <Home size={24} color="#1976d2" style={{ marginRight: 8 }} />
//             <Typography variant="h6">
//               Phòng {currentData.room.roomNumber} - {currentData.room.room_Type.name}
//             </Typography>
//           </Box>
//           <Typography variant="body2" color="text.secondary" mt={1}>
//             {currentData.room.description}
//           </Typography>
//         </Paper>

//         <Paper square>
//           <Tabs
//             value={utilityType}
//             onChange={(e, newValue) => setUtilityType(newValue)}
//             indicatorColor="primary"
//             textColor="primary"
//             variant="fullWidth"
//           >
//             <Tab
//               label={
//                 <Box display="flex" alignItems="center">
//                   <Zap size={18} style={{ marginRight: 6 }} /> Điện
//                 </Box>
//               }
//               value="Electric"
//             />
//             <Tab
//               label={
//                 <Box display="flex" alignItems="center">
//                   <Droplets size={18} style={{ marginRight: 6 }} /> Nước
//                 </Box>
//               }
//               value="Water"
//             />
//           </Tabs>
//         </Paper>

//         <Paper elevation={2} sx={{ p: 3, borderTop: 0 }}>
//           {/* Thời gian */}
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//             <Box display="flex" alignItems="center">
//               <Calendar size={20} style={{ marginRight: 8, color: '#888' }} />
//               <Typography variant="subtitle1">
//                 {getMonthName(currentData.month)}, {currentData.year}
//               </Typography>
//             </Box>
//             <Chip
//               label={utilityType === 'Electric' ? 'Điện' : 'Nước'}
//               color={utilityType === 'Electric' ? 'warning' : 'info'}
//               size="small"
//             />
//           </Box>

//           {/* Progress */}
//           <Box mb={4}>
//             <Box display="flex" justifyContent="space-between" mb={1}>
//               <Typography variant="body2" color="text.secondary">
//                 Mức sử dụng
//               </Typography>
//               <Typography variant="body2" fontWeight="bold">
//                 {currentData.value} {utilityType === 'Electric' ? 'kWh' : 'm³'}
//               </Typography>
//             </Box>
//             <LinearProgress
//               variant="determinate"
//               value={getPercentage()}
//               sx={{
//                 height: 10,
//                 borderRadius: 5,
//                 '& .MuiLinearProgress-bar': {
//                   backgroundColor: utilityType === 'Electric' ? '#fbc02d' : '#0288d1',
//                 },
//               }}
//             />
//           </Box>

//           {/* Thông tin chỉ số */}
//           <Box bgcolor="#f9f9f9" borderRadius={2} p={3}>
//             <Typography variant="h6" mb={2} display="flex" alignItems="center">
//               <Calculator size={20} style={{ marginRight: 8, color: '#777' }} />
//               Thông tin chỉ số
//             </Typography>
//             {[
//               ['Chỉ số cũ', currentData.previousIndex],
//               ['Chỉ số mới', currentData.currentIndex],
//               ['Tiêu thụ', currentData.value],
//               ['Đơn giá', `${formatCurrency(currentData.pricePerUnit)}/${utilityType === 'Electric' ? 'kWh' : 'm³'}`],
//               ['Thành tiền', formatCurrency(currentData.totalAmount)],
//             ].map(([label, value], i) => (
//               <Box key={label}>
//                 <Box display="flex" justifyContent="space-between" py={1}>
//                   <Typography color="text.secondary">{label}</Typography>
//                   <Typography
//                     fontWeight={i === 4 ? 'bold' : 'medium'}
//                     color={i === 4 ? 'primary' : 'inherit'}
//                     fontSize={i === 4 ? '1.1rem' : '1rem'}
//                   >
//                     {value}
//                   </Typography>
//                 </Box>
//                 {i < 4 && <Divider />}
//               </Box>
//             ))}
//           </Box>
//         </Paper>

//         {/* Thống kê */}
//         <Paper sx={{ mt: 3, p: 3 }}>
//           <Typography variant="h6" mb={2} display="flex" alignItems="center">
//             <BarChart3 size={20} style={{ marginRight: 8, color: '#777' }} />
//             Thống kê gần đây
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Paper elevation={1} sx={{ p: 2 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Trung bình 3 tháng
//                 </Typography>
//                 <Typography fontWeight="medium" fontSize="1.1rem">
//                   {utilityType === 'Electric' ? '47 kWh' : '7.5 m³'}
//                 </Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={6}>
//               <Paper elevation={1} sx={{ p: 2 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   So với tháng trước
//                 </Typography>
//                 <Typography
//                   fontWeight="medium"
//                   fontSize="1.1rem"
//                   color={utilityType === 'Electric' ? 'error.main' : 'success.main'}
//                 >
//                   {utilityType === 'Electric' ? '+8%' : '-5%'}
//                 </Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Paper>

//         {/* Nút điều hướng */}
//         <Box display="flex" gap={2} mt={3}>
//           <Button fullWidth variant="outlined" color="inherit">
//             Lịch sử
//           </Button>
//           <Button fullWidth variant="contained" color="primary">
//             Cập nhật chỉ số
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

  