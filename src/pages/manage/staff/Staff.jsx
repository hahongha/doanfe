import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Grid,
  Button,
  TablePagination,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import dayjs from 'dayjs';
import StaffSearchForm from './StaffSearchForm';
import StaffFormDialog from './StaffFormDialog';
import { Avatar } from 'antd';
import { Delete } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { searchStaffRequest } from 'redux/actions/staffAction';

const Staff = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const staffs = useSelector((state) => state.staff.staffs);
  const totalRecords = useSelector((state) => state.staff.totalRecords);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchStaffRequest({
        searchDTO: { 
          page: page,
          size: rowsPerPage
        }, 
        fullName: '',
        phone: '',
        address: '', // Thêm trường địa chỉ
        startDateFrom: null,
        startDateTo: null,
        endDateFrom: null,
        endDateTo: null,
        position:'',
        status:'WORKING'
      })
    );
    // setFilteredStaffs(staffs);
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleOpen = (staff) => {
    setSelectedStaff(staff || null);
    setOpenDialog(true);
  };

  const handleSave = (data) => {
    console.log('Saved staff:', data);
    // Gọi API hoặc cập nhật state
  };

  const handleClose = (data) => {
    console.log('Saved staff:', data);
    setSelectedStaff(null);
    setOpenDialog(false);
    // Gọi API hoặc cập nhật state
  };

  const handleSearch = (filters) => {
        const result = staffs.filter((staff) => {
            const matchText = (val, query) =>
            !query || val?.toLowerCase().includes(query.toLowerCase());

            const matchDate = (val, query) =>
            !query || dayjs(val).isSame(query, 'day');

            const matchRange = (val, from, to) => {
            const d = dayjs(val);
            return (
                (!from || d.isAfter(from.subtract(1, 'day'))) &&
                (!to || d.isBefore(to.add(1, 'day')))
            );
            };

            return (
            matchText(staff.fullName, filters.fullName) &&
            matchText(staff.identityNumber, filters.identityNumber) &&
            matchText(staff.address, filters.address) &&
            matchDate(staff.dob, filters.dob) &&
            matchRange(staff.startDate, filters.startDateFrom, filters.startDateTo) &&
            matchRange(staff.endDate, filters.endDateFrom, filters.endDateTo) &&
            matchText(staff.position, filters.position),  // Thêm điều kiện tìm kiếm theo chức vụ
            matchText(staff.status, filters.status)
            );
        });
        setFilteredStaffs(result);
    };


  return (
    <div>
      <h2>Quản lý nhân viên</h2>
      <StaffSearchForm onSearch={handleSearch} />
      <Button variant="contained" color="primary" sx={{marginBottom:2}} onClick={()=>handleOpen(selectedStaff)}>Thêm nhân viên mới</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Chức vụ</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Ngày kết thúc</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>
                  <Avatar src={staff?.imageUrl} alt={"N/A"} />
                </TableCell>
                <TableCell>{staff?.fullName}</TableCell>
                <TableCell>{staff?.position}</TableCell>
                <TableCell>{staff?.phone}</TableCell>
                <TableCell>{dayjs(staff?.dob).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{dayjs(staff?.startDate).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{staff?.endDate ? dayjs(staff.endDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
                <TableCell>{staff?.user?.status}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={()=>handleOpen(staff)} sx={{marginRight:2}}>
                    <Edit />
                  </IconButton>
                  <IconButton color="primary" onClick={()=>{}}>
                    <Delete />
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
      <StaffFormDialog
          open={openDialog}
          onClose={handleClose}
          staff={selectedStaff}
          onSubmit={handleSave}
        />
    </div>
  );
};

export default Staff;
