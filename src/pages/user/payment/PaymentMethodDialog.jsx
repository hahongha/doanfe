import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography
} from '@mui/material';
import http from "redux/api/http";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const PaymentMethodDialog = ({ open, onClose, onConfirm, data }) => {
const [selectedMethod, setSelectedMethod] = useState('');
const paymentMethods = [
  { value: 'CASH', label: 'Tiền mặt', disabled:true },
  { value: 'BANK_TRANSFER', label: 'Chuyển khoản ngân hàng', disabled:true },
  { value: 'MOMO', label: 'Ví MoMo', disabled:true },
  { value: 'VN_PAY', label: 'VNPAY'}
];

  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handleConfirm = () => {
    if (selectedMethod) {
      onConfirm?.(selectedMethod);
      onClose();
    }
    fetchPaymentInfo();
  };

  const handleCancel = () => {
    setSelectedMethod('');
    onClose();
  };


  const fetchPaymentInfo = async () => {
    try {
      setLoading(true);
      console.log(data);
  
      const response = await http.get('/paymentVNPAY/create-payment', {
          params: {
              amount: data?.totalAmount,
              billId: data?.id
          },
      });
      if (response.data.code === "00") {
        window.location.href = response.data.data; // Chuyển hướng đến trang thanh toán
      } else {
        toast.error({
          message: "Lỗi",
          description:
            response.message || "Thanh toán thất bại",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error({
        message: "Lỗi kết nối",
        description: "Không thể kết nối đến máy chủ",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
      <DialogContent dividers>
        <Typography>Hóa đơn: {data?.name}</Typography>
        <Typography>Tổng số tiền: {data?.value}</Typography>
        <Typography>Số tiền phải đóng: {data?.totalAmount}</Typography>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Phương thức</FormLabel>
          <RadioGroup value={selectedMethod} onChange={handleChange}>
            {paymentMethods.map((method) => (
              <FormControlLabel
                key={method.value}
                value={method.value}
                control={<Radio />}
                label={method.label}
                disabled={method.disabled}
              />
            ))}
          </RadioGroup>
        </FormControl>
        {selectedMethod && (
          <Typography mt={2} color="text.secondary">
            Bạn đã chọn: <strong>{paymentMethods.find(m => m.value === selectedMethod)?.label}</strong>
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Hủy</Button>
        <Button onClick={handleConfirm} disabled={!selectedMethod} variant="contained" color="primary">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentMethodDialog;
