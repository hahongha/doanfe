import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  TablePagination,
  Grid,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { searchPaymentRequest } from "redux/actions/paymentAction";
import RefreshIcon from "@mui/icons-material/Refresh";
const formatCurrency = (value) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const PaymentHistory = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [paymentToEdit, setPaymentToEdit] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const paymentData = useSelector((state) => state.payment.payments);
  const totalRecords = useSelector((state) => state.payment.totalRecords);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [status, setStatus] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState("");
  
    // Hàm reset tìm kiếm
    const handleReset = () => {
      setPaymentMethod(null);
      setPaymentDate(null);
      setStatus(null);
      setMinAmount(null);
      setMaxAmount(null);
    };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchPaymentRequest({
        searchDTO: { 
          page: page,
          size: rowsPerPage,
          value: `%${keyword}%`
        }})
    );
  }, [dispatch, page, rowsPerPage, keyword]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
  };

  // Handle Open/Close Dialogs
  const handleEditClick = (payment) => {
    setPaymentToEdit(payment);
    setOpenEditDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveEdit = () => {
    // Save edit logic (mocked)
    setSnackbarOpen(true);
    handleCloseDialog();
    console.log(paymentToEdit);
    
  };

  return (
    <MainCard title = "Lịch sử thanh toán">
       <Grid container spacing={2} alignItems="center" sx={{mb:2}}>
  {/* Phương thức thanh toán */}
  <Grid item xs={12} sm={4} md={3}>
    <FormControl fullWidth>
      <InputLabel>Phương thức thanh toán</InputLabel>
      <Select
        value={paymentMethod || ""}
        onChange={(e) => setPaymentMethod(e.target.value)}
        label="Phương thức thanh toán"
      >
        <MenuItem value="">Tất cả</MenuItem>
        <MenuItem value="CASH">Tiền mặt</MenuItem>
        <MenuItem value="BANK_TRANSFER">Chuyển khoản ngân hàng</MenuItem>
        <MenuItem value="MOMO">MOMO</MenuItem>
        <MenuItem value="VNPAY">VNPAY</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Ngày thanh toán */}
  <Grid item xs={12} sm={4} md={3}>
    <TextField
      type="date"
      label="Ngày thanh toán"
      fullWidth
      value={paymentDate}
      onChange={(e) => setPaymentDate(e.target.value)}
      InputLabelProps={{ shrink: true }}
    />
  </Grid>

  {/* Khoảng giá trị thanh toán */}
  <Grid item xs={6} sm={2} md={2}>
    <TextField
      label="Từ (VND)"
      type="number"
      fullWidth
      value={minAmount}
      onChange={(e) => setMinAmount(e.target.value)}
    />
  </Grid>

  <Grid item xs={6} sm={2} md={2}>
    <TextField
      label="Đến (VND)"
      type="number"
      fullWidth
      value={maxAmount}
      onChange={(e) => setMaxAmount(e.target.value)}
    />
  </Grid>

  {/* Nút làm mới */}
  <Grid item xs={12} sm={12} md={2} textAlign="center">
    <Button variant="outlined" onClick={handleReset}>Làm mới</Button>
  </Grid>
</Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mã thanh toán</TableCell>
            <TableCell>Mã hóa đơn</TableCell>
            <TableCell>Tên hóa đơn</TableCell>
            <TableCell>Ngày thanh toán</TableCell>
            <TableCell>Phương thức</TableCell>
            <TableCell>Số tiền</TableCell>
            <TableCell>Ghi chú</TableCell>
            <TableCell align="center">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentData.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.id}</TableCell>
              <TableCell>{payment.bill?.id}</TableCell>
              <TableCell>{payment.bill?.name}</TableCell>
              <TableCell>{payment.paymentDate}</TableCell>
              <TableCell>{payment.paymentMethod}</TableCell>
              <TableCell>{formatCurrency(payment.value)}</TableCell>
              <TableCell>{payment.note}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={() => handleEditClick(payment)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => alert("Xóa")}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        page={page}
        component="div"
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[1, 2, 4, 6, 8, 10, 20, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${`trong`} ${count !== -1 ? count : `more than ${to}`}`}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
      />

      {/* Edit Payment Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <DialogTitle>Sửa thông tin thanh toán</DialogTitle>
        <DialogContent>
          {/* Không cho phép chỉnh sửa ID và Bill ID */}
          <TextField
            label="Mã thanh toán"
            variant="outlined"
            fullWidth
            value={paymentToEdit?.id || ""}
            disabled
            margin="normal"
          />
          <TextField
            label="Mã hóa đơn"
            variant="outlined"
            fullWidth
            value={paymentToEdit?.billId || ""}
            disabled
            margin="normal"
          />

          {/* Các trường có thể chỉnh sửa */}
          <TextField
            label="Số tiền"
            variant="outlined"
            fullWidth
            type="number"
            value={paymentToEdit?.value || ""}
            onChange={(e) =>
              setPaymentToEdit({
                ...paymentToEdit,
                value: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            label="Ngày thanh toán"
            variant="outlined"
            fullWidth
            type="date"
            value={paymentToEdit?.paymentDate || ""}
            onChange={(e) =>
              setPaymentToEdit({
                ...paymentToEdit,
                paymentDate: e.target.value,
              })
            }
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Phương thức thanh toán</InputLabel>
            <Select
              value={paymentToEdit?.paymentMethod || ""}
              onChange={(e) =>
                setPaymentToEdit({
                  ...paymentToEdit,
                  paymentMethod: e.target.value,
                })
              }
            >
              <MenuItem value="CASH">Tiền mặt</MenuItem>
              <MenuItem value="BANK-TRANSFER">Chuyển khoản ngân hàng</MenuItem>
              <MenuItem value="MOMO">MOMO</MenuItem>
              <MenuItem value="VNPAY">VNPAY</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Ghi chú"
            variant="outlined"
            fullWidth
            value={paymentToEdit?.note || ""}
            onChange={(e) =>
              setPaymentToEdit({
                ...paymentToEdit,
                note: e.target.value,
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveEdit}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default PaymentHistory;
