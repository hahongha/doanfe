// ContractStatsDashboard.tsx
import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const contractSummary = [
  { label: "Tổng hợp đồng", value: 120 },
  { label: "Đang hoạt động", value: 85 },
  { label: "Sắp hết hạn", value: 10 },
  { label: "Đã kết thúc", value: 25 },
];

const contractByMonth = [
  { month: "Th1", contracts: 5 },
  { month: "Th2", contracts: 12 },
  { month: "Th3", contracts: 20 },
  { month: "Th4", contracts: 18 },
  { month: "Th5", contracts: 10 },
];

const contractStatusData = [
  { name: "Đang hoạt động", value: 85 },
  { name: "Sắp hết hạn", value: 10 },
  { name: "Đã kết thúc", value: 25 },
];

const upcomingContracts = [
  { id: "CT001", tenant: "Nguyễn Văn A", room: "P101", endDate: "2025-06-15" },
  { id: "CT002", tenant: "Trần Thị B", room: "P202", endDate: "2025-06-20" },
];

const COLORS = ["#4caf50", "#ff9800", "#f44336"];

export default function ContractStats() {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-05-28');
  return (
    <Box p={2}>
      <Typography variant="h3" gutterBottom>
        Thống kê Hợp đồng Thuê trọ
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
      {/* Thẻ thống kê */}
      <Grid container spacing={2}>
        {contractSummary.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.label}</Typography>
                <Typography variant="h4" color="primary">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} mt={1}>
        {/* Biểu đồ cột */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                Hợp đồng theo tháng
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={contractByMonth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="contracts" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Biểu đồ tròn */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                Phân bố theo trạng thái
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={contractStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {contractStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Bảng hợp đồng sắp hết hạn */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                Hợp đồng sắp hết hạn
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã HĐ</TableCell>
                    <TableCell>Người thuê</TableCell>
                    <TableCell>Phòng</TableCell>
                    <TableCell>Ngày kết thúc</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell>{contract.id}</TableCell>
                      <TableCell>{contract.tenant}</TableCell>
                      <TableCell>{contract.room}</TableCell>
                      <TableCell>{contract.endDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
