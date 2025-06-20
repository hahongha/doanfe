import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Chip, CardActions, Button, TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { searchBillRequest } from "redux/actions/billAction";
import MainCard from 'components/MainCard';
import InvoicePage from "./InvoicePage";
import { useNavigate } from "react-router";
const Bill = () => {
  const [keyword, setKeyword] = useState('');
  const [roomNumber, setRoomNumber] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const billData = useSelector((state) => state.bill.bills);
  const totalRecords = useSelector((state) => state.bill.totalRecords);
  const navigate = useNavigate();
  const invoiceStatusMap = {
    PAID: {
      label: "Đã thanh toán",
      color: "success",
    },
    UNPAID: {
      label: "Chưa thanh toán",
      color: "error",
    },
    PARTIAL: {
      label: "Thanh toán một phần",
      color: "warning",
    },
    OVERDUE: {
      label: "Quá hạn",
      color: "error",
    },
    CANCELED: {
      label: "Đã hủy",
      color: "default",
    },
  };
  const getStatusChip = (statusValue) => {
    const status = invoiceStatusMap[statusValue];
  
    if (!status) {
      return <Chip label="Không xác định" color="default" size="small" />;
    }
  
    return <Chip label={status.label} color={status.color} size="small" />;
  };
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchBillRequest({
        searchDTO: { 
          page: page,
          size: rowsPerPage,
          value: `%${keyword}%`
        }
      })
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

  const handleOpen = (row) => {
    setSelectedIndex(row);
    setOpen(true);
  };

  const handleOpenDelete = (row) => {
    setSelectedIndex(row);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setSelectedIndex(null);
    setOpenDelete(false);
    setOpen(false);
  };

  const handleDelete = (row) => {
    {
      row ? dispatch(deleteRenterRequest(row.id)) : '';
    }
    handleClose();
  };
  return (
    <MainCard title = "Danh sách hóa đơn">
      <Grid container spacing={2}>
        {billData.map((invoice, idx) => (
          <Grid item xs={12} sm={6} md={6} key={idx}>
            <Card sx={{ borderLeft: "6px solid #4f46e5" }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phòng: <strong>{invoice?.room?.roomNumber}</strong>
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">{invoice?.id}</Typography>
                  <Typography color="text.secondary">Khách thuê: {invoice?.renter?.fullName}</Typography>
                  <Typography color="text.secondary">Hạn thanh toán: {invoice?.dueDate}</Typography>
                  {getStatusChip(invoice?.status)}
                  {/* <PaymentQRCode/> */}
                </CardContent>
                <CardActions>
                  <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
                    <Button variant="contained" color="primary" onClick={()=>handleOpen(invoice)}>Chi tiết</Button>
                    {invoice?.status !== 'PAID' && (
                      <>
                      <Button variant="outlined" color="success" onClick={()=>navigate(`/manager/create-payment/${invoice?.id}`)}>Thanh toán ngay</Button>
                      <Button variant="contained" color="primary" onClick={()=>navigate(`/manager/billDetail/bill/${invoice?.id}`)}>Chỉnh sửa</Button>
                      </>
                      
                   )}
                  </Box>
            </CardActions>
              </Card>
          </Grid>
        ))}
        <InvoicePage open={open} onClose = {handleClose} data ={selectedIndex}/>
      </Grid>
      <TablePagination
          page={page}
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[1, 2, 3, 6, 9, 12, 18, 30]}
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
      
    </MainCard>
  );
};

export default Bill;
