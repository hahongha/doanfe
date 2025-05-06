import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, InputLabel, MenuItem, Select, TextField, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton,
  TablePagination,
  Grid
} from '@mui/material';
import dayjs from 'dayjs';
import { DeleteIcon, EditIcon } from 'lucide-react';
import RoomReturnDetail from './RoomReturnDetail';
import { useDispatch, useSelector } from 'react-redux';
import { searchRoomReturnRequest } from 'redux/actions/roomReturnAction';
import { getAllRoomRequest } from 'redux/actions/roomAction';
import { getAllContractRequest } from 'redux/actions/contractAction';
import { deleteRoomReturnRequest } from 'redux/actions/roomReturnAction';
import MainCard from 'components/MainCard';
const RoomReturn = () => {
  const [roomReturns, setRoomReturns] = useState([]);

  const [keyword, setKeyword] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [contractId, setContractId] = useState(null);
  const rooms = useSelector((state) => state.room.all_rooms);
  const contracts = useSelector((state) => state.contract.all_contract);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const datas = useSelector((state) => state.roomReturn.roomReturns);
  const totalRecords = useSelector((state) => state.roomService.totalRecords);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchRoomReturnRequest({
        searchDTO: { 
          page: page,
          size: rowsPerPage,
          value: `%${keyword}%`
        },
        roomId: roomId,
        contractId: contractId,
        status: status
      })
    );
    dispatch(getAllRoomRequest());
    dispatch(getAllContractRequest())
  }, [dispatch, page, rowsPerPage, keyword, roomId, contractId, status]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
    const handleOpen = (row) => {
      setSelectedIndex(row);
      setOpen(true);
    };
  
    const handleClose = () => {
      setSelectedIndex(null);
      setOpen(false);
    };
  
    const handleDelete = (id) => {
      console.log("Delete", id);
      dispatch(deleteRoomReturnRequest(id));
    };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const newReturn = {
      ...formData,
      id: `rm_${Date.now()}` // tạo ID giả
    };
    setRoomReturns([...roomReturns, newReturn]);
    handleClose();
  };

  return (
    <MainCard title = "Danh sách trả phòng">
      <Grid container justifyContent="space-between" alignItems="center" mb={2} spacing={2}>
        <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
                    <InputLabel>Chọn phòng</InputLabel>
                    <Select
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      label="Chọn phòng"
                    >
                      <MenuItem value={null}>Tất cả</MenuItem>
                      {Array.isArray(rooms) && rooms.map((room) => (
                        <MenuItem key={room.id} value={room.id}>
                          {room.roomNumber}
                        </MenuItem>
                      ))}
                                </Select>
                        </FormControl>
                    </Grid>
        <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
                <InputLabel>Chọn hợp đồng</InputLabel>
                <Select
                      value={contractId}
                      onChange={(e) => setContractId(e.target.value)}
                      label="Chọn dịch vụ"
                    >
                      <MenuItem value={null}>Tất cả</MenuItem>
                      {Array.isArray(contracts) && contracts.map((c) => (
                        <MenuItem key={c.id} value={c.id}>{c.id} - {c?.renter?.fullName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
          <Grid item xs={12} sm={3}>
          <FormControl fullWidth margin="normal">
  <InputLabel id="status-label">Trạng thái</InputLabel>
  <Select
    labelId="status-label"
    id="status"
    name="status"
    value={status||null}
    label="Trạng thái"
    onChange={(e) => setStatus(e.target.value)}
  >
    <MenuItem value="PENDING">Chờ duyệt</MenuItem>
    <MenuItem value="APPROVED">Đã duyệt</MenuItem>
    <MenuItem value="REJECTED">Từ chối</MenuItem>
    <MenuItem value="IN_PROGRESS">Đang xử lý</MenuItem>
    <MenuItem value="COMPLETED">Hoàn tất</MenuItem>
  </Select>
</FormControl>
          </Grid>
      <Button variant="contained" onClick={handleOpen}>Thêm trả phòng</Button>
</Grid>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Hợp đồng</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Ngày trả</TableCell>
              <TableCell>Lý do</TableCell>
              <TableCell>Ghi chú</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.contractId}</TableCell>
                <TableCell>{r.roomId}</TableCell>
                <TableCell>{dayjs(r.returnDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{r.reason}</TableCell>
                <TableCell>{r.note}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(r)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(r?.id)}>
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
        <RoomReturnDetail rooms={rooms} contracts={contracts} open={open} handleClose={handleClose} data={selectedIndex}/>
      </TableContainer>

      
    </MainCard>
  );
};

export default RoomReturn;
