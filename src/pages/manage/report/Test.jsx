import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Card, Typography, Grid, Paper } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import StatisticsButtons from './StatisticsButtons';
import MonthlyStatsLineChart from './MonthlyStatsLineChart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const Report = () => {
    const data = {
  "totalIncome": 100000000,
  "totalExpenses": 75000000,
  "profit": 25000000,
  "monthlyStats": [
    {
      "month": "Tháng 1",
      "income": 8000000,
      "expenses": 5000000,
      "profit": 3000000
    },
    {
      "month": "Tháng 2",
      "income": 12000000,
      "expenses": 7000000,
      "profit": 5000000
    },
    {
      "month": "Tháng 3",
      "income": 15000000,
      "expenses": 10000000,
      "profit": 5000000
    },
    {
      "month": "Tháng 4",
      "income": 20000000,
      "expenses": 15000000,
      "profit": 5000000
    },
    {
      "month": "Tháng 5",
      "income": 20000000,
      "expenses": 15000000,
      "profit": 5000000
    },
    {
      "month": "Tháng 6",
      "income": 20000000,
      "expenses": 15000000,
      "profit": 5000000
    },{
      "month": "Tháng 7",
      "income": 20000000,
      "expenses": 15000000,
      "profit": 5000000
    },{
      "month": "Tháng 8",
      "income": 20000000,
      "expenses": 15000000,
      "profit": 5000000
    },{
      "month": "Tháng 9",
      "income": 20000000,
      "expenses": 15000000,
      "profit": 5000000
    },{
      "month": "Tháng 10",
      "income": 20000000,
      "expenses": 15000000,
      "profit": 5000000
    },{
      "month": "Tháng 11",
      "income": 20000000,
      "expenses": 15000000,
      "profit": 5000000
    }
  ],
  "expensesBreakdown": [
    {
      "category": "Tiền điện",
      "amount": 2000000
    },
    {
      "category": "Tiền nước",
      "amount": 1500000
    },
    {
      "category": "Bảo trì",
      "amount": 1000000
    },
    {
      "category": "Phí quản lý",
      "amount": 500000
    }
  ]
};
  const { totalIncome, totalExpenses, profit, monthlyStats, expensesBreakdown } = data;
  const [year, setYear] = useState(new Date().getFullYear());
  const years = [];

  // Tạo danh sách năm từ 2020 đến năm hiện tại + 1
  for (let i = 2020; i <= new Date().getFullYear() + 1; i++) {
    years.push(i);
  }

  const handleChange = (event) => {
    setYear(event.target.value);
    // Xử lý thống kê theo năm tại đây
    console.log("Selected year:", event.target.value);
  };
  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
        <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="year-select-label">Chọn năm</InputLabel>
      <Select
        labelId="year-select-label"
        value={year}
        label="Chọn năm"
        onChange={handleChange}
      >
        {years.map((y) => (
          <MenuItem key={y} value={y}>
            {y}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Tổng thu nhập</Typography>
            <Typography variant="h4">{totalIncome.toLocaleString()} VND</Typography>
          </Paper>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Tổng chi phí</Typography>
            <Typography variant="h4">{totalExpenses.toLocaleString()} VND</Typography>
          </Paper>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Lợi nhuận</Typography>
            <Typography variant="h4">{profit.toLocaleString()} VND</Typography>
          </Paper>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <MonthlyStatsLineChart/>
      </Grid>
        {/* <Grid item xs={12}>
           <StatisticsButtons/>
        </Grid> */}
    </Grid>
    
  );
};

export default Report;
import React from 'react';
import {
  Grid, Card, CardContent, Typography, Box
} from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#4caf50', '#ff9800', '#f44336'];

const contractByMonth = [
  { month: '1', count: 10 },
  { month: '2', count: 12 },
  { month: '3', count: 8 },
  { month: '4', count: 15 },
  { month: '5', count: 18 },
  { month: '6', count: 10 },
  { month: '7', count: 12 },
  { month: '8', count: 8 },
  { month: '9', count: 15 },
  { month: '10', count: 18 },
  { month: '11', count: 15 },
  { month: '12', count: 18 },
];

const paymentStatus = [
  { name: 'Đã thanh toán', value: 40 },
  { name: 'Còn nợ', value: 10 },
  { name: 'Trễ hạn', value: 5 },
];

const durationStats = [
  { name: 'Ngắn hạn (<6 tháng)', value: 10 },
  { name: 'Trung hạn (6-12 tháng)', value: 25 },
  { name: 'Dài hạn (>12 tháng)', value: 20 },
];

const ContractStats = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        📄 Thống kê hợp đồng thuê phòng
      </Typography>

      <Grid container spacing={3}>
        {/* Tổng quan hợp đồng */}
        {[
          { label: 'Tổng hợp đồng đang hiệu lực', value: 55 },
          { label: 'Hợp đồng sắp hết hạn', value: 5 },
          { label: 'Hợp đồng mới tháng này', value: 12 },
          { label: 'Hợp đồng đã kết thúc', value: 20 },
        ].map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">{item.label}</Typography>
                <Typography variant="h5" color="primary">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Biểu đồ số lượng hợp đồng theo tháng */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📈 Hợp đồng mới theo từng tháng
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                Biểu đồ đường thể hiện số lượng hợp đồng mới được ký theo từng tháng.
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={contractByMonth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" name="Số hợp đồng" stroke="#1976d2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Biểu đồ tình trạng thanh toán */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                💰 Tình trạng thanh toán
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                Biểu đồ tròn thể hiện tỷ lệ hợp đồng đã thanh toán, còn nợ hoặc trễ hạn.
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={paymentStatus}
                    cx="50%" cy="50%" outerRadius={80}
                    dataKey="value" label
                  >
                    {paymentStatus.map((entry, index) => (
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

        {/* Biểu đồ thời hạn hợp đồng */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ⏳ Phân loại theo thời hạn hợp đồng
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                Biểu đồ tròn thể hiện số lượng hợp đồng theo thời hạn: ngắn, trung và dài hạn.
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={durationStats}
                    cx="50%" cy="50%" outerRadius={80}
                    dataKey="value" label
                  >
                    {durationStats.map((entry, index) => (
                      <Cell key={`cell-dur-${index}`} fill={COLORS[index % COLORS.length]} />
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

export default ContractStats;
