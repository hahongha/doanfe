import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Tab,
  Tabs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const incomeData = [
  {
    id: 1,
    room: "P101",
    tenant: "Nguyễn Văn A",
    amount: 2500000,
    type: "Tiền thuê phòng",
    date: "2025-05-01",
    method: "Tiền mặt",
    note: "Đã thanh toán đầy đủ",
  },
  {
    id: 2,
    room: "P101",
    tenant: "Nguyễn Văn A",
    amount: 300000,
    type: "Tiền điện",
    date: "2025-05-01",
    method: "Chuyển khoản",
    note: "",
  },
  {
    id: 3,
    room: "P102",
    tenant: "Trần Thị B",
    amount: 200000,
    type: "Internet",
    date: "2025-05-03",
    method: "Ví điện tử",
    note: "Đóng trễ 1 ngày",
  },
];

const expenseData = [
  {
    id: 1,
    content: "Sửa ống nước tầng 2",
    amount: 500000,
    date: "2025-05-02",
    person: "Quản lý nhà trọ",
    method: "Tiền mặt",
    note: "Đơn giá đã bao gồm công",
  },
  {
    id: 2,
    content: "Vệ sinh chung tháng 5",
    amount: 300000,
    date: "2025-05-04",
    person: "Nhân viên vệ sinh",
    method: "Chuyển khoản",
    note: "",
  },
];

const trendData = [
  { period: "T1", income: 8000000, expense: 2000000 },
  { period: "T2", income: 8500000, expense: 2500000 },
  { period: "T3", income: 9000000, expense: 3200000 },
  { period: "T4", income: 8800000, expense: 2800000 },
  { period: "T5", income: 9200000, expense: 3000000 },
];

export default function IncomeExpenseStats() {
  const [tab, setTab] = React.useState(0);
  const [dateRange, setDateRange] = React.useState({ from: "2025-05-01", to: "2025-05-31" });

  const filterByDate = (data) => {
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      return itemDate >= fromDate && itemDate <= toDate;
    });
  };

  const filteredIncome = filterByDate(incomeData);
  const filteredExpense = filterByDate(expenseData);

  return (
    <Box sx={{ p: 2 }}>
      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} aria-label="tabs">
        <Tab label="Các khoản thu" />
        <Tab label="Các khoản chi" />
        <Tab label="Biểu đồ xu hướng" />
        <Tab label="Báo cáo tổng hợp" />
      </Tabs>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="date"
            label="Từ ngày"
            InputLabelProps={{ shrink: true }}
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="date"
            label="Đến ngày"
            InputLabelProps={{ shrink: true }}
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
          />
        </Grid>
      </Grid>

      {tab === 0 && (
        <Card sx={{ mt: 2 }}>
          <CardHeader title="Danh sách các khoản thu" />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Phòng / Người thuê</TableCell>
                    <TableCell>Số tiền</TableCell>
                    <TableCell>Loại</TableCell>
                    <TableCell>Ngày thu</TableCell>
                    <TableCell>Hình thức</TableCell>
                    <TableCell>Ghi chú</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredIncome.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.room} / {row.tenant}</TableCell>
                      <TableCell>{row.amount.toLocaleString()} đ</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.method}</TableCell>
                      <TableCell>{row.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {tab === 1 && (
        <Card sx={{ mt: 2 }}>
          <CardHeader title="Danh sách các khoản chi" />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nội dung</TableCell>
                    <TableCell>Số tiền</TableCell>
                    <TableCell>Ngày chi</TableCell>
                    <TableCell>Người chi</TableCell>
                    <TableCell>Hình thức</TableCell>
                    <TableCell>Ghi chú</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredExpense.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.content}</TableCell>
                      <TableCell>{row.amount.toLocaleString()} đ</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.person}</TableCell>
                      <TableCell>{row.method}</TableCell>
                      <TableCell>{row.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {tab === 2 && (
        <Card sx={{ mt: 2 }}>
          <CardHeader title="Biểu đồ xu hướng thu - chi" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#4caf50" name="Thu" />
                <Line type="monotone" dataKey="expense" stroke="#f44336" name="Chi" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {tab === 3 && (
        <Card sx={{ mt: 2 }}>
          <CardHeader title="Báo cáo tổng hợp" />
          <CardContent>
            <Typography>✅ Tổng thu: <strong>9.200.000 đ</strong></Typography>
            <Typography>💸 Tổng chi: <strong>800.000 đ</strong></Typography>
            <Typography>📈 Lợi nhuận ròng: <strong>8.400.000 đ</strong></Typography>
            <Typography>🏠 Thu theo phòng: P101: 2.800.000 đ, P102: 200.000 đ</Typography>
            <Typography>🧍 Theo người thuê: Nguyễn Văn A: 2.800.000 đ, Trần Thị B: 200.000 đ</Typography>
            <Typography>📊 Chi phí theo loại: Sửa chữa: 500.000 đ, Vệ sinh: 300.000 đ</Typography>
            <Typography>💼 Công nợ còn lại: 0 đ</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}