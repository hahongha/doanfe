import { Box, Button, Grid2, ListItemText, MenuItem, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Typography,
  TablePagination,
  IconButton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRenterRequest, searchRenterRequest } from 'src/redux/actions/renterAction';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import RenterDialog from './RenterDialog';
import CustomDialog from 'components/CustomDialog';
import SearchBar from 'components/SearchBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import SearchSelect from 'components/SearchSelect';

function Renter() {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState(null);
  const [roomNumber, setRoomNumber] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRenter, setSelectedRenter] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const renterData = useSelector((state) => state.renter.renters);
  const totalRecords = useSelector((state) => state.renter.totalRecords);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchRenterRequest({
        searchDTO: { 
          page: page,
          size: rowsPerPage,
          value: `%${keyword}%`
        },
        status: status,
        roomNumber: roomNumber
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
    setSelectedRenter(row);
    setOpen(true);
  };

  const handleOpenDelete = (row) => {
    setSelectedRenter(row);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setSelectedRenter(null);
    setOpenDelete(false);
    setOpen(false);
  };

  const handleDelete = (row) => {
    {
      row ? dispatch(deleteRenterRequest(row.id)) : '';
    }
    handleClose();
  };

  const statusMap = {
    ALL: {
      label: 'Tất cả',
      color: 'default',
      icon: <CheckCircleIcon />
    },
    ACTIVE: {
      label: 'Đang thuê',
      color: 'success',
      icon: <CheckCircleIcon />
    },
    INACTIVE: {
      label: 'Ngừng thuê',
      color: 'default',
      icon: <DoNotDisturbIcon />
    },
    PENDING: {
      label: 'Chờ xác nhận',
      color: 'warning',
      icon: <HourglassTopIcon />
    },
    BANNED: {
      label: 'Bị chặn',
      color: 'error',
      icon: <BlockIcon />
    },
    EXPIRED: {
      label: 'Hết hạn',
      color: 'warning',
      icon: <WarningIcon />
    },
    DELETED: {
      label: 'Đã xóa',
      color: 'default',
      icon: <DeleteIcon />
    },
    SUSPEND: {
      label: 'Chờ trả phòng',
      color: 'warning',
      icon: <HourglassTopIcon />
    }
  };


  const getStatus = (status) => {
    return <Chip label={statusMap[status]?.label} color={statusMap[status]?.color} icon={statusMap[status]?.icon} />
  };

  const handleChange = (e) => {
    setStatus(e.target.value === 'ALL' ? null : e.target.value);
  };

  return (
    <MainCard title="Danh sách khách thuê">
      <Grid2 container spacing={2} sx={{ mb: 5 }}>
        <Grid2 size={3}>
          <SearchBar keyword={keyword} onChange={handleSearchChange} />
        </Grid2>

        <Grid2 size= {3}>
        <SearchSelect keyword= {status} name = {"Status"} label = {"Tìm kiếm theo trạng thái"} allData = {statusMap} onChange = {handleChange}/>
        </Grid2>

        

        <Grid2 size={4}>
          <Button variant="contained" color="primary" onClick={() => handleOpen(selectedRenter)}>
            Tạo khách thuê mới
          </Button>
        </Grid2>
      </Grid2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Họ và tên</TableCell>
            <TableCell>Giới tính</TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renterData.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar src={user?.imageUrl} alt={user.fullName} />
              </TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.gender === 'MALE' ? 'Nam' : 'Nữ'}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.user.email}</TableCell>
              <TableCell>
                {getStatus(user?.status)}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpen(user)}>
                  <EyeOutlined />
                </IconButton>
                <IconButton onClick={() => handleOpen(user)}>
                  <EditOutlined />
                </IconButton>
                <IconButton onClick={() => handleOpenDelete(user)}>
                  <DeleteOutlined />
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
      <CustomDialog
        open={openDelete}
        handleClose={handleClose}
        handleCustom={() => handleDelete(selectedRenter)}
        content={'Bạn có chắc muốn xóa người thuê này không?'}
        title={'Xóa người thuê'}
      />
      <RenterDialog open={open} onClose={handleClose} renterData={selectedRenter} onDelete={() => handleDelete(selectedRenter)} />
    </MainCard>
  );
}

export default Renter;
