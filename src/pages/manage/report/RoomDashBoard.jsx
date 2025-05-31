import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, TableContainer, Paper, Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField} from '@mui/material';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import MainCard from 'components/MainCard';
const roomStatusData = [
  { name: 'Đã cho thuê', value: 40 },
  { name: 'Phòng trống', value: 15 },
  { name: 'Đang sửa chữa', value: 3 },
  { name: 'Tạm ngưng', value: 2 },
];
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};
const occupancyRate = [
  { month: 'Tháng 1', rate: 60 },
  { month: 'Tháng 2', rate: 65 },
  { month: 'Tháng 3', rate: 70 },
  { month: 'Tháng 4', rate: 80 },
  { month: 'Tháng 5', rate: 85 },
];

const sampleData = {
  roomTypeSummary: [
    {
      roomType: 'Phòng đơn',
      revenue: 5000000,
      expense: 2000000,
      profit: 3000000,
      occupancyRate: 90,
    },
    {
      roomType: 'Phòng đôi',
      revenue: 7000000,
      expense: 2500000,
      profit: 4500000,
      occupancyRate: 80,
    }
  ]
}

const COLORS = ['#4caf50', '#2196f3', '#ff9800', '#f44336'];

const RoomDashboard = () => {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-05-28');
  return (
    <MainCard title = "Thống kê phòng">
<Box my={4}>


        <Box mt={2} display="flex" gap={2}>
          <TextField
            label="Từ ngày"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Đến ngày"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Box>
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3}>
        {/* Thống kê tổng quan */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Tổng số phòng</Typography>
              <Typography variant="h4">60</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Đã cho thuê</Typography>
              <Typography variant="h4">40</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Phòng trống</Typography>
              <Typography variant="h4">15</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Đang sửa chữa</Typography>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Biểu đồ trạng thái phòng */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tình trạng phòng
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={roomStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {roomStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Biểu đồ lấp đầy */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tỷ lệ lấp đầy theo tháng
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={occupancyRate}>
                  <XAxis dataKey="month" />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#1976d2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>Thống kê theo loại phòng</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Loại phòng</TableCell>
                <TableCell>Doanh thu</TableCell>
                <TableCell>Chi phí</TableCell>
                <TableCell>Lợi nhuận</TableCell>
                <TableCell>Tỷ lệ lấp đầy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleData.roomTypeSummary.map((room, index) => (
                <TableRow key={index}>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>{formatCurrency(room.revenue)}</TableCell>
                  <TableCell>{formatCurrency(room.expense)}</TableCell>
                  <TableCell>{formatCurrency(room.profit)}</TableCell>
                  <TableCell>{room.occupancyRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    </MainCard>
  );
};

export default RoomDashboard;
