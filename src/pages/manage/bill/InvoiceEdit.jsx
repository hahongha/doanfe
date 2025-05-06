import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const InvoiceEdit = ({ invoice, onSave }) => {
  const [discount, setDiscount] = useState(invoice.discount || 0);
  const [status, setStatus] = useState(invoice.status || '');
  const [dueDate, setDueDate] = useState(invoice.dueDate || '');
  const [paymentDate, setPaymentDate] = useState(invoice.paymentDate || '');
  const [paid, setPaid] = useState(invoice.paid || 0);
  const [billDetails, setBillDetails] = useState(invoice.billDetails || []);

  const handleChange = (e, field) => {
    const { value } = e.target;
    if (field === 'discount') {
      setDiscount(value);
    } else if (field === 'status') {
      setStatus(value);
    } else if (field === 'dueDate') {
      setDueDate(value);
    } else if (field === 'paymentDate') {
      setPaymentDate(value);
    } else if (field === 'paid') {
      setPaid(value);
    }
  };

  const handleSave = () => {
    const updatedInvoice = {
      ...invoice,
      discount,
      status,
      dueDate,
      paymentDate,
      paid,
      billDetails,
    };
    onSave(updatedInvoice); // Call save callback with updated invoice
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Chỉnh sửa thông tin hóa đơn
      </Typography>
      
      <Grid container spacing={3}>
        {/* Discount */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Giảm giá (%)"
            type="number"
            value={discount}
            onChange={(e) => handleChange(e, 'discount')}
            fullWidth
            variant="outlined"
          />
        </Grid>

        {/* Status */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={status}
              onChange={(e) => handleChange(e, 'status')}
              label="Trạng thái"
            >
              <MenuItem value="ACTIVE">Có hiệu lực</MenuItem>
              <MenuItem value="INACTIVE">Không có hiệu lực</MenuItem>
              <MenuItem value="WAITING">Chờ duyệt</MenuItem>
              <MenuItem value="PENDING">Đang xử lý</MenuItem>
              <MenuItem value="EXPIRED">Hết hạn</MenuItem>
              <MenuItem value="TERMINATED">Chấm dứt</MenuItem>
              <MenuItem value="CANCELED">Đã hủy</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Due Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Ngày đến hạn"
            type="date"
            value={dueDate}
            onChange={(e) => handleChange(e, 'dueDate')}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Payment Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Ngày thanh toán"
            type="date"
            value={paymentDate}
            onChange={(e) => handleChange(e, 'paymentDate')}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Paid */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Số tiền đã thanh toán"
            type="number"
            value={paid}
            onChange={(e) => handleChange(e, 'paid')}
            fullWidth
            variant="outlined"
          />
        </Grid>

        {/* Bill Details */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Chi tiết hóa đơn
          </Typography>
          {billDetails.map((detail, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={4}>
                <TextField
                  label="Tên dịch vụ"
                  value={detail.name}
                  onChange={(e) => {
                    const updatedDetails = [...billDetails];
                    updatedDetails[index].name = e.target.value;
                    setBillDetails(updatedDetails);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Đơn giá"
                  type="number"
                  value={detail.value}
                  onChange={(e) => {
                    const updatedDetails = [...billDetails];
                    updatedDetails[index].value = e.target.value;
                    setBillDetails(updatedDetails);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Số lượng"
                  type="number"
                  value={detail.quantity}
                  onChange={(e) => {
                    const updatedDetails = [...billDetails];
                    updatedDetails[index].quantity = e.target.value;
                    setBillDetails(updatedDetails);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Thành tiền"
                  type="number"
                  value={detail.totalValue}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    const updatedDetails = billDetails.filter((_, i) => i !== index);
                    setBillDetails(updatedDetails);
                  }}
                >
                  Xóa
                </Button>
              </Grid>
            </Grid>
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setBillDetails([
                ...billDetails,
                { name: '', value: 0, quantity: 0, totalValue: 0 },
              ]);
            }}
          >
            Thêm dịch vụ
          </Button>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Lưu thay đổi
        </Button>
      </Box>
    </Box>
  );
};

export default InvoiceEdit;
