import React, { useState, useEffect } from "react";
import MainCard from 'components/MainCard';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBillRequest } from "redux/actions/billAction";
import PaymentQRCode from "./PaymentQRCode";
import { update } from "immutable";
import { addPaymentRequest, updatePaymentRequest } from "../../../redux/actions/paymentAction";

const PaymentForm = () => {
  // Lấy billId từ URL params
  const { billId } = useParams();
  const billData = useSelector((state) => state.bill.bill);
  const dispatch = useDispatch();
  const [va, setVa] = useState(0);

  const navigate = useNavigate();
  // const history = useHistory();

  // Dữ liệu form
  const [formData, setFormData] = useState({
    billId: billId,
    note: "",
    payment_date: "",
    payment_method: "",
    value: 0,
    id:null
  });

    useEffect(() => {
    if (billId) {
      dispatch(getBillRequest(billId));
    }
  }, [billId, dispatch]);

    useEffect(() => {
      if (billData && billData.id === billId) {
        setFormData((prev) => ({
          ...prev,
          value: billData.totalAmount - billData.discount - billData.paid
        }));
      }
    }, [billData, billId]);


  const handleSubmit = () => {
    // Thực hiện lưu hoặc sửa thông tin thanh toán ở đây
    alert("Thông tin thanh toán đã được lưu!");
    console.log(formData);

    {formData.id ? dispatch(updatePaymentRequest(formData)) : dispatch(addPaymentRequest(formData))}
    navigate(-1);
    // history.push("/payment-history"); // Chuyển về trang danh sách thanh toán
  };

  return (
    <MainCard title = "Thanh toán hóa đơn">
    <Box sx={{display:"flex", justifyContent:"space-between"}}>
      <form>
        {formData.id && 
        <TextField
          label="Mã thanh toán"
          fullWidth
          margin="normal"
          value={formData?.id}
          InputProps={{
          readOnly: true
        }}
           InputLabelProps={{ shrink: true }}
        />
      }
        <TextField
          label="Mã hóa đơn"
          fullWidth
          margin="normal"
          value={billData?.id}
          InputProps={{
          readOnly: true
        }}
           InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Mã hóa đơn"
          fullWidth
          margin="normal"
          value={billData?.name}
          InputProps={{
          readOnly: true
        }}
         InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Ghi chú"
          fullWidth
          margin="normal"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        />
        <TextField
          label="Ngày thanh toán"
          type="date"
          fullWidth
          margin="normal"
           value={
            formData.payment_date ||
            new Date().toISOString().split("T")[0] // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
          }
          onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Hình thức thanh toán</InputLabel>
          <Select
            value={formData.payment_method}
            onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
          >
            <MenuItem value="BANK_TRANSFER">Chuyển khoản ngân hàng</MenuItem>
            <MenuItem value="CASH">Tiền mặt</MenuItem>
            <MenuItem value="VNPAY">VNPAY</MenuItem>
            <MenuItem value="MOMO">MOMO</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Số tiền"
          fullWidth
          margin="normal"
          type="number"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
        />

      {/* Box chứa các nút theo dạng ngang */}
      <Box
        sx={{
          display: "flex",        // Đặt các phần tử con trong một hàng ngang
          gap: 2,                 // Khoảng cách giữa các nút
          marginTop: 2,           // Khoảng cách phía trên Box
        }}
      >
        {/* Nút Lưu */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit} // Gọi handleSubmit khi người dùng nhấn vào nút Lưu
        >
          Lưu
        </Button>

        {/* Nút Back */}
        <Button
          variant="contained"
          color="secondary" // Màu nút Back
          fullWidth
          onClick={() => navigate(-1)} // Quay lại trang trước đó
        >
          Back
        </Button>
      </Box>
      </form>
      <PaymentQRCode
          bankCode="MB"
          accountNumber="0388580312"
          accountName="PHAM THI HA"
          amount={formData?.value}
          description={formData?.billId}
        />
    </Box>
    </MainCard>
  );
};

export default PaymentForm;
