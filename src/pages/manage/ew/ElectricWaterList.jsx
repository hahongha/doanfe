import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
  IconButton,
  TablePagination
} from "@mui/material";
import MainCard from 'components/MainCard';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { searchEWRequest } from "redux/actions/ewActions";
import EWDetail from "./EWDetail";
import { deleteEWRequest } from "redux/actions/ewActions";

const ElectricWaterList = () => {
  const [keyword, setKeyword] = useState(null);
  const [status, setStatus] = useState(null);
  const [roomNumber, setRoomNumber] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const datas = useSelector((state) => state.ew.EWs);
  const totalRecords = useSelector((state) => state.ew.totalRecords);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchEWRequest({
          page: page,
          size: rowsPerPage,
          value: keyword
      })
    );
  }, [dispatch, page, rowsPerPage, keyword, status]);

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
    setSelectedRenter(row);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setSelectedIndex(null);
    setOpenDelete(false);
    setOpen(false);
  };

  const handleAdd = () => {
    console.log("Add button clicked");
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
    dispatch(deleteEWRequest(id));
  };

  return (
    <MainCard>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>
          Danh Sách Chỉ Số Điện Nước
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          Thêm mới
        </Button>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Mã phiếu</strong></TableCell>
              <TableCell><strong>Phòng</strong></TableCell>
              <TableCell><strong>Loại</strong></TableCell>
              <TableCell><strong>Tháng/Năm</strong></TableCell>
              <TableCell><strong>Chỉ số cũ</strong></TableCell>
              <TableCell><strong>Chỉ số mới</strong></TableCell>
              <TableCell><strong>Tiêu thụ</strong></TableCell>
              <TableCell><strong>Đơn giá</strong></TableCell>
              <TableCell><strong>Thành tiền</strong></TableCell>
              <TableCell><strong>Ngày ghi</strong></TableCell>
              <TableCell><strong>Hành động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.room.roomNumber}</TableCell>
                <TableCell>{item.type === 'ELECTRIC' ? 'Điện' : 'Nước'}</TableCell>
                <TableCell>{`${item.month.toString().padStart(2, '0')}/${item.year}`}</TableCell>
                <TableCell>{item.previousIndex}</TableCell>
                <TableCell>{item.currentIndex}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.pricePerUnit.toLocaleString()} VNĐ</TableCell>
                <TableCell>{item.totalAmount.toLocaleString()} VNĐ</TableCell>
                <TableCell>{new Date(item.recordDate).toLocaleDateString("vi-VN")}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(item?.id)}>
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
        rowsPerPageOptions={[1, 2, 3, 5, 10, 25, 50, 100]}
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
      </TableContainer>
      <EWDetail open={open} onClose={handleClose} index={selectedIndex} />
    </MainCard>
  );
};

export default ElectricWaterList;
