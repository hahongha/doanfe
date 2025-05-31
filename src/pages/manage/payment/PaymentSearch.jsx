import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Stack,
} from "@mui/material";

const PaymentSearch = ({ onSearch }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [status, setStatus] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    if (minAmount && maxAmount && parseFloat(minAmount) > parseFloat(maxAmount)) {
      alert("Giá trị 'Từ' không được lớn hơn giá trị 'Đến'");
      return;
    }

    const searchCriteria = {
      paymentMethod,
      paymentDate,
      status,
      minAmount,
      maxAmount,
    };
    onSearch(searchCriteria); // Truyền thông tin tìm kiếm cho parent component
  };

  // Hàm reset tìm kiếm
  const handleReset = () => {
    setPaymentMethod("");
    setPaymentDate("");
    setStatus("");
    setMinAmount("");
    setMaxAmount("");
    onSearch({}); // Truyền lại dữ liệu tìm kiếm trống cho parent component
  };

  return (
    <Grid container spacing={2}>
      {/* Phương thức thanh toán */}
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel>Phương thức thanh toán</InputLabel>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            label="Phương thức thanh toán"
          >
            <MenuItem value={null}>Tất cả</MenuItem>
            <MenuItem value="CASH">Tiền mặt</MenuItem>
            <MenuItem value="BANK-TRANSFER">Chuyển khoản ngân hàng</MenuItem>
            <MenuItem value="MOMO">MOMO</MenuItem>
            <MenuItem value="VNPAY">VNPAY</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Ngày thanh toán */}
      <Grid item xs={3}>
        <TextField
          type="date"
          label="Ngày thanh toán"
          fullWidth
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          InputLabelProps={{
            shrink: true, // Đảm bảo label luôn hiển thị ở trên
          }}
        />
      </Grid>

      {/* Khoảng giá trị thanh toán */}
      <Grid item xs={3}>
        <TextField
          label="Từ (VND)"
          type="number"
          fullWidth
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
      </Grid>

      <Grid item xs={3}>
        <TextField
          label="Đến (VND)"
          type="number"
          fullWidth
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />
      </Grid>

      {/* Nút tìm kiếm và reset */}
      <Grid item xs={4}>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSearch}
        >
            Tìm kiếm
        </Button>
        <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleReset}
            sx={{ marginTop: 2 }}
        >
            Làm mới
        </Button>
        </Stack>

      </Grid>
    </Grid>
  );
};

export default PaymentSearch; // Đây là nơi bạn xuất khẩu default
