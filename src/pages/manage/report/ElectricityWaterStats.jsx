import React, { useState } from 'react';
import {
  Grid, Card, CardContent, Typography, Box, Divider,
  TextField
} from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#4caf50', '#ff9800', '#f44336', '#1976d2'];

// Dữ liệu giả lập
const roomData = [
  { roomId: '101', electricity: 150, water: 300, electricityCost: 50000, waterCost: 30000 },
  { roomId: '102', electricity: 180, water: 350, electricityCost: 60000, waterCost: 35000 },
  { roomId: '103', electricity: 200, water: 400, electricityCost: 70000, waterCost: 40000 },
];

const totalConsumption = {
  electricity: 530,
  water: 1050,
  electricityCost: 180000,
  waterCost: 105000
};

const monthlyStats = [
  { month: 'Tháng 1', electricity: 150, water: 300 },
  { month: 'Tháng 2', electricity: 180, water: 350 },
  { month: 'Tháng 3', electricity: 200, water: 400 },
  { month: 'Tháng 4', electricity: 220, water: 450 },
  { month: 'Tháng 5', electricity: 250, water: 500 },
];

const ElectricityWaterStats = () => {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-05-28');
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        🔌💧 Thống kê tiêu thụ điện và nước
      </Typography>
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
      {/* Tổng quan */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Tổng tiêu thụ điện</Typography>
              <Typography variant="h3" color="primary">{totalConsumption.electricity} kWh</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Tổng tiêu thụ nước</Typography>
              <Typography variant="h3" color="primary">{totalConsumption.water} m³</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Tổng chi phí điện</Typography>
              <Typography variant="h3" color="primary">{totalConsumption.electricityCost} VND</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Tổng chi phí nước</Typography>
              <Typography variant="h3" color="primary">{totalConsumption.waterCost} VND</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Biểu đồ tiêu thụ điện và nước theo tháng */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                📊 Tiêu thụ điện và nước theo tháng
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                Biểu đồ đường thể hiện tiêu thụ điện và nước qua các tháng.
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyStats}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="electricity" name="Điện (kWh)" stroke="#1976d2" strokeWidth={2} />
                  <Line type="monotone" dataKey="water" name="Nước (m³)" stroke="#ff9800" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Biểu đồ phân bổ chi phí điện và nước */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                💰 Chi phí điện và nước
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                Biểu đồ tròn thể hiện chi phí điện và nước trong tổng chi phí.
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Điện', value: totalConsumption.electricityCost },
                      { name: 'Nước', value: totalConsumption.waterCost },
                    ]}
                    cx="50%" cy="50%" outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {[
                      { fill: COLORS[0] },
                      { fill: COLORS[1] },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} {...entry} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Danh sách phòng và tiêu thụ */}
      <Typography variant="h3" gutterBottom>
        🏠 Danh sách phòng và tiêu thụ
      </Typography>
      <Grid container spacing={3}>
        {roomData.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.roomId}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">Phòng {room.roomId}</Typography>
                <Typography variant="body2" color="text.secondary">Điện: {room.electricity} kWh</Typography>
                <Typography variant="body2" color="text.secondary">Nước: {room.water} m³</Typography>
                <Typography variant="body2" color="text.secondary">Chi phí điện: {room.electricityCost} VND</Typography>
                <Typography variant="body2" color="text.secondary">Chi phí nước: {room.waterCost} VND</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ElectricityWaterStats;
