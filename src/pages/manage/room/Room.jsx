import { useEffect, useState } from 'react';
import { Button, Grid2, TablePagination } from '@mui/material';
import RoomCard from 'src/pages/manage/room/RoomCard';
import { useDispatch, useSelector } from 'react-redux';
import { addRoomRequest, searchRoomRequest, updateRoomRequest } from 'src/redux/actions/roomAction';
import RoomDialog from 'src/pages/manage/room/RoomDialog';
import MainCard from 'components/MainCard';
import SearchBar from 'components/SearchBar';
function Room() {
  const [keyword, setKeyword] = useState('');
  const [roomId, setRoomId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const rooms = useSelector((state) => state.room.rooms);
  const totalRecords = useSelector((state) => state.room.totalRecords);
  const dispatch = useDispatch();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [open, setOpen] = useState(false);
  const [render, setRender]= useState(false);
  const initialRoomData = {
    id: 1,
    roomNumber: '',
    status: 'AVAILABLE',
    cost: 0,
    isActive: false,
    funiture: [],
    description: '',
    number: 0,
    electricIndex: 0,
    waterIndex: 0,
    room_Type: { id: 0, name: '', size: 0, description: '', imageList: [] },
    images: []
  };
  useEffect(() => {
    dispatch(
      searchRoomRequest({
        page,
        size: rowsPerPage,
        value: `%${keyword}%`
      })
    );
  }, [dispatch, page, rowsPerPage, keyword, render]);
  const handleOpen = (room) => {
    setSelectedRoom({ ...room });
    setOpen(true);
  };

  const handleOpenCreate = () =>{
    setSelectedRoom(initialRoomData);
    setOpen(true);
  }

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

  const handleClose = () => {
    setRoomId('');
    setSelectedRoom(initialRoomData);
    setDeleteDialog(false);
    setOpen(false);
  };

  const handleRender = () => {
    setRender(!render);
    setOpen(false);
    setSelectedRoom(null);
  };

  return (
    <MainCard title={'Danh sách các phòng'}>
      <Grid2 container spacing={2} alignItems="center" sx={{ mb: 5 }}>
        {/* Ô tìm kiếm */}
        <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
          <SearchBar value={keyword} onChange={handleSearchChange} />
        </Grid2>

        {/* Nút tạo phòng mới */}
        <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
          <Button variant="contained" color="primary" onClick={()=> handleOpenCreate()}>
            Tạo phòng mới
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container justifyContent="flex-start" spacing={2}>
        {rooms.map((room) => (
          <Grid2 size= {4}  key={room?.id}> 
            <RoomCard room={room} onClick={() =>{handleOpen(room)}} />
          </Grid2>
        ))}
      </Grid2>
      {selectedRoom && <RoomDialog open={open} room={selectedRoom} handleClose={handleClose} handleSave={handleRender} />}
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

export default Room;
