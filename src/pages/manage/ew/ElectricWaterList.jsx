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
  TablePagination,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from "@mui/material";
import MainCard from 'components/MainCard';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { searchEWRequest } from "redux/actions/ewActions";
import EWDetail from "./EWDetail";
import { deleteEWRequest } from "redux/actions/ewActions";
import {getAllRoomRequest} from "redux/actions/roomAction"
const ElectricWaterList = () => {
  const [keyword, setKeyword] = useState(null);
  const [status, setStatus] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [type, setType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const datas = useSelector((state) => state.ew.EWs);
  const rooms = useSelector((state) => state.room.all_rooms);
  const totalRecords = useSelector((state) => state.ew.totalRecords);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchEWRequest({
        searchDTO:{
          page: page,
          size: rowsPerPage,
          value: keyword
        },
        type: type,
        startDate: startDate,
        endDate: endDate,
        roomId: roomId
      })
    );
    dispatch(getAllRoomRequest());
  }, [dispatch, page, rowsPerPage, keyword, status, startDate, endDate, roomId, type]);

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
    <MainCard title = "Danh sách chỉ số điện nước">
      <Grid container justifyContent="space-between" alignItems="center" spacing={2} mb={2}>
  <Grid item xs={12} md={10}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="Ngày bắt đầu"
          name="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="Ngày kết thúc"
          name="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel id="input_type">Loại chỉ số</InputLabel>
          <Select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Loại chỉ số"
          >
            <MenuItem value={null}>Tất cả</MenuItem>
            <MenuItem value="ELECTRIC">Điện</MenuItem>
            <MenuItem value="WATER">Nước</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel id="input_room">Số phòng</InputLabel>
          <Select
            name="room"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            label="Số phòng"
          >
            <MenuItem value={null}>Tất cả</MenuItem>
            {rooms?.map((room) => (
              <MenuItem key={room?.id} value={room?.id}>
                {room?.roomNumber}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  </Grid>

  <Grid item xs={12} md={2} display="flex" justifyContent="flex-end">
    <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
      Thêm mới
    </Button>
  </Grid>
</Grid>


      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell><strong>Mã phiếu</strong></TableCell> */}
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
                {/* <TableCell>{item.id}</TableCell> */}
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
        rowsPerPageOptions={[1, 2, 3, 5, 8, 16, 50, 100]}
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
