import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid2,
    TablePagination,
    TextField,
    Typography
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import MainCard from 'components/MainCard';
  import SearchBar from 'components/SearchBar';
  import { useDispatch, useSelector } from 'react-redux';
  import {
    deleteRoomTypeRequest,
    searchRoomTypeRequest
  } from 'src/redux/actions/roomTypeAction';
import RoomTypeCard from './RoomTypeCard';
import RoomTypeDetail from './RoomTypeDetail';
  export default function RoomType() {
    const [minArea, setMinArea] = useState(15);
    const [maxArea, setMaxArea] = useState(100);
    const [keyword, setKeyword] = useState('');
    const [roomTypeId, setRoomTypeId] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const roomTypesData = useSelector((state) => state.roomType.roomTypes);
    const totalRecords = useSelector((state) => state.roomType.totalRecords);
    const dispatch = useDispatch();
    
    const [render, setRender]= useState(false);

    const handleRender = () => {
      setRender(!render);
    };

    const [deleteDialog, setDeleteDialog] = useState(false);
    useEffect(() => {
      dispatch(
        searchRoomTypeRequest({
          page,
          size: rowsPerPage,
          value: `%${keyword}%`,
          minSize: minArea !== null ? minArea : 15,
          maxSize: maxArea !== null ? maxArea : 100
        })
      );
    }, [dispatch, page, rowsPerPage, keyword, minArea, maxArea, render]);
  
    const handleSearchChange = (event) => {
      setKeyword(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const areaOptions = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  
    const [open, setOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const handleOpenDialog = (room) => {
      setSelectedRoom(room);
      setRoomTypeId(room.id);
      setOpen(true);
    };
  
    const handleDelete = (id) => {
      dispatch(deleteRoomTypeRequest(id));
    };
    const handleClose = () => {
      setOpen(false);
      setSelectedRoom(null);
    };
  
    return (
      <MainCard title="Danh sách các loại phòng">
        <Grid2 container spacing={2} alignItems="center">
          {/* Ô tìm kiếm */}
          <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
            <SearchBar value={keyword} onChange={handleSearchChange} />
          </Grid2>
  
          {/* Bộ lọc diện tích */}
          <Grid2 size={{ xs: 12, sm: 8, md: 6 }}>
            <Box display="flex" gap={2} p={2}>
              <Autocomplete
                options={areaOptions}
                getOptionLabel={(option) => option.toString()}
                renderInput={(params) => <TextField {...params} label="Diện tích từ" />}
                value={minArea ?? 15}
                onChange={(event, newValue) => setMinArea(newValue)}
                style={{ minWidth: 150 }}
              />
              <Autocomplete
                options={areaOptions}
                getOptionLabel={(option) => option.toString()}
                renderInput={(params) => <TextField {...params} label="Diện tích đến" />}
                value={maxArea ?? 100}
                onChange={(event, newValue) => setMaxArea(newValue)}
                style={{ minWidth: 150 }}
              />
            </Box>
          </Grid2>
  
          {/* Nút tạo phòng mới */}
          <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
              Tạo loại phòng mới
            </Button>
          </Grid2>
        </Grid2>
  
        <Grid2 container spacing={2}>
          {roomTypesData.map((room, index) => (
            <Grid2 size={4} key={index}>
             <RoomTypeCard roomData={room} handleEdit={() => handleOpenDialog(room)} handleDelete={() => handleDelete(room.id)}/>
            </Grid2>
          ))}
        </Grid2>
        {selectedRoom && <RoomTypeDetail open={open} onClose={handleClose} roomData={selectedRoom} setRender={handleRender}/>}
        
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
  }
  