import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    TablePagination,
    Button,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
  } from "@mui/material";
import { DeleteIcon, EditIcon } from "lucide-react";
import MainCard from 'components/MainCard';
import { AddCircleOutline, AddLocationAltOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { searchRoomServiceRequest } from "redux/actions/roomServiceAction";
import { getAllServiceRequest } from "redux/actions/serviceAction";
import { getAllRoomRequest } from "redux/actions/roomAction";
import RoomServiceEditForm from "./RoomServiceEditForm";
import { deleteRoomServiceRequest } from "redux/actions/roomServiceAction";
export default function DisplayServiceTable() {

  const [keyword, setKeyword] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [serviceId, setserviceId] = useState(null);
  const roomData = useSelector((state) => state.room.all_rooms);
  const serviceData = useSelector((state) => state.service.all_service);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const datas = useSelector((state) => state.roomService.roomServices);
  const totalRecords = useSelector((state) => state.roomService.totalRecords);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchRoomServiceRequest({
        searchDTO: { 
          page: page,
          size: rowsPerPage,
          value: `%${keyword}%`
        },
        roomId: roomId,
        serviceId: serviceId,
        status: status
      })
    );
    dispatch(getAllRoomRequest());
    dispatch(getAllServiceRequest())
  }, [dispatch, page, rowsPerPage, keyword, roomId, serviceId, status]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleSearchChange = (event) => {
  //   setKeyword(event.target.value);
  // };

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
    dispatch(deleteRoomServiceRequest(id));
  };

  return (
    <MainCard title = "Danh sách dịch vụ phòng">
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
                      {Array.isArray(roomData) && roomData.map((room) => (
  <MenuItem key={room.id} value={room.id}>
    {room.roomNumber}
  </MenuItem>
))}
                    </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
                <InputLabel>Chọn dịch vụ</InputLabel>
                <Select
                      value={serviceId}
                      onChange={(e) => setserviceId(e.target.value)}
                      label="Chọn dịch vụ"
                    >
                      <MenuItem value={null}>Tất cả</MenuItem>
                      {Array.isArray(serviceData) && serviceData.map((service) => (
  <MenuItem key={service.id} value={service.id}>
    {service.serviceName}
  </MenuItem>
))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
  <FormControlLabel
    control={
      <Switch
        checked={status === "ACTIVE"}
        onChange={(e) => setStatus(e.target.checked ? "ACTIVE" : "INACTIVE")}
        color="primary"
      />
    }
    label="Đang hoạt động"
  />
</Grid>
<Grid item xs={12} sm={3}>

        <Button variant="contained" onClick={handleOpen}>
          Thêm mới
        </Button>
</Grid>
      </Grid>
    <TableContainer component={Paper} sx={{mx: "auto", mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Phòng</strong></TableCell>
            <TableCell><strong>Dịch vụ</strong></TableCell>
            <TableCell><strong>Giá</strong></TableCell>
            <TableCell><strong>Ngày bắt đầu</strong></TableCell>
            <TableCell><strong>Ngày kết thúc</strong></TableCell>
            <TableCell><strong>Trạng thái</strong></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.room.roomNumber} - {item.room.room_Type.name}
              </TableCell>
              <TableCell>{item.service.serviceName}</TableCell>
              <TableCell>{item.service.value.toLocaleString()}đ</TableCell>
              <TableCell>{item.startDate}</TableCell>
              <TableCell>{item.endDate}</TableCell>
              <TableCell>
                <Chip
                  label={item.status}
                  color={item.status === "ACTIVE" ? "success" : "default"}
                  size="small"
                />
              </TableCell>
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
      <RoomServiceEditForm open={open} onClose={handleClose} data={selectedIndex} roomOptions={roomData} serviceOptions={serviceData}/>
      </TableContainer>
    </MainCard>
  );
}
