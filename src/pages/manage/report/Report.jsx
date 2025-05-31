import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent
} from '@mui/material';
import { format } from 'date-fns';
import MainCard from 'components/MainCard';
import { DollarSign, TrendingUp, Home } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

const sampleData = {
  summary: {
    totalRevenue: 15000000,
    totalExpense: 5000000,
    totalProfit: 10000000,
    occupancyRate: 85,
  },
  chartData: [
    { month: '1', revenue: 3000000, profit: 2000000 },
    { month: '2', revenue: 4000000, profit: 2500000 },
    { month: '3', revenue: 5000000, profit: 3000000 },
    { month: '4', revenue: 5000000, profit: 3000000 },
    { month: '5', revenue: 5000000, profit: 3000000 },
  ],
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
    },
  ],
};

const SummaryCard = ({ title, value, icon, color, bgColor }) => (
  <Paper elevation={3} sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Box>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      <Typography variant="h5" fontWeight="bold" sx={{ color }}>{value}</Typography>
    </Box>
    <Box sx={{ bgcolor: bgColor, p: 1.5, borderRadius: '50%' }}>{icon}</Box>
  </Paper>
);

const Report = () => {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-05-28');

  return (
    <MainCard title = "Thống kê thu chi">

    <Container maxWidth="lg">
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

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Tổng doanh thu"
            value={formatCurrency(sampleData.summary.totalRevenue)}
            icon={<DollarSign size={24} color="green" />}
            color="green"
            bgColor="#d1fae5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Tổng chi phí"
            value={formatCurrency(sampleData.summary.totalExpense)}
            icon={<TrendingUp size={24} color="red" />}
            color="red"
            bgColor="#fee2e2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Lợi nhuận ròng"
            value={formatCurrency(sampleData.summary.totalProfit)}
            icon={<TrendingUp size={24} color="blue" />}
            color="blue"
            bgColor="#dbeafe"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Tỷ lệ lấp đầy"
            value={`${sampleData.summary.occupancyRate}%`}
            icon={<Home size={24} color="purple" />}
            color="purple"
            bgColor="#ede9fe"
          />
        </Grid>
      </Grid>

      {/* <Box mt={4}>
        <Typography variant="h6" gutterBottom>Lợi nhuận theo tháng</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sampleData.chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar dataKey="revenue" fill="#8884d8" name="Doanh thu" />
            <Bar dataKey="profit" fill="#82ca9d" name="Lợi nhuận" />
          </BarChart>
        </ResponsiveContainer>
      </Box> */}

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Lợi nhuận theo tháng</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sampleData.chartData} padding = {5} margin={{ top: 20, right: 30, left: 8, bottom: 5 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Doanh thu" strokeWidth={2} />
            <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Lợi nhuận" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      
    </Container>
    </MainCard>
  );
};

export default Report;
