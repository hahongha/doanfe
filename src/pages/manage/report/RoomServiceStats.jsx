import React, { useState } from 'react';
import {
  Grid, Card, CardContent, Typography, Box,
  TextField
} from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#4caf50', '#ff9800', '#f44336', '#1976d2'];

const serviceData = [
  { month: 'Tháng 1', income: 3000000, expenses: 2000000, profit: 1000000 },
  { month: 'Tháng 2', income: 3500000, expenses: 2200000, profit: 1300000 },
  { month: 'Tháng 3', income: 4000000, expenses: 2500000, profit: 1500000 },
  { month: 'Tháng 4', income: 5000000, expenses: 2800000, profit: 2200000 },
  { month: 'Tháng 5', income: 5500000, expenses: 3000000, profit: 2500000 },
];

const serviceUsage = [
  { name: 'Điện', value: 60 },
  { name: 'Nước', value: 50 },
  { name: 'Internet', value: 40 },
  { name: 'Rác', value: 30 },
];

const roomCount = [
  { name: 'Phòng đã sử dụng dịch vụ', value: 80 },
  { name: 'Phòng chưa sử dụng dịch vụ', value: 20 },
];

const RoomServiceStats = () => {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-05-28');
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" gutterBottom>
        🏠 Thống kê dịch vụ phòng
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

      <Box marginBottom={4}>
          {/* Tổng doanh thu từ dịch vụ */}
          <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {[
              { label: 'Tổng doanh thu dịch vụ', value: 25000000 },
              { label: 'Doanh thu trong thời gian này', value: 5500000 },
            ].map((item, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1">{item.label}</Typography>
                    <Typography variant="h4" color="primary">
                      {item.value.toLocaleString()} VND
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3}>
        {/* Biểu đồ doanh thu dịch vụ theo tháng */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                📈 Doanh thu dịch vụ theo tháng
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                Biểu đồ đường thể hiện doanh thu dịch vụ theo tháng.
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={serviceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="income" name="Doanh thu" stroke="#1976d2" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" name="Chi phí" stroke="#ff9800" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" name="Lợi nhuận" stroke="#4caf50" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Biểu đồ sử dụng dịch vụ */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                🔌 Tỷ lệ phòng sử dụng dịch vụ
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                Biểu đồ tròn thể hiện tỷ lệ phòng sử dụng các dịch vụ như điện, nước, internet, rác.
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={serviceUsage}
                    cx="50%" cy="50%" outerRadius={80}
                    dataKey="value" label
                  >
                    {serviceUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Biểu đồ số lượng phòng sử dụng dịch vụ */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                🏠 Tỷ lệ phòng sử dụng dịch vụ
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                Biểu đồ tròn thể hiện tỷ lệ phòng có hoặc không sử dụng các dịch vụ.
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={roomCount}
                    cx="50%" cy="50%" outerRadius={80}
                    dataKey="value" label
                  >
                    {roomCount.map((entry, index) => (
                      <Cell key={`cell-room-${index}`} fill={COLORS[index % COLORS.length]} />
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
    </Box>
  );
};

export default RoomServiceStats;
