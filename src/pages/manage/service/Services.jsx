import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
  Button,
  Grid2,
  TablePagination,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography
} from '@mui/material';

import { EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from 'components/SearchBar';
import {
  addServiceRequest,
  deleteServiceRequest,
  getAllServiceRequest,
  searchServiceRequest,
  updateServiceRequest
} from 'redux/actions/serviceAction';
import CustomDialog from 'components/CustomDialog';
export default function Services() {
  const initData = { id: '', serviceName: '', status: '', value: 0, isDefault: false };
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const serviceDatas = useSelector((state) => state.service.services);
  const totalRecords = useSelector((state) => state.service.totalRecords);
  const dispatch = useDispatch();
  const [selectedCard, setSelectedCard] = useState(initData);
  const [cardId, setCardId] = useState('');
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  useEffect(() => {
    dispatch(
      searchServiceRequest({
        page,
        size: rowsPerPage,
        value: `%${keyword}%`
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

  const handleChange = (id, field, value) => {
    setServices((prev) => prev.map((service) => (service.id === id ? { ...service, [field]: value } : service)));
  };
  const statusOptions = {
    ACTIVE: { label: 'Hoạt động', color: 'success' }, // Xanh dương
    SUSPEND: { label: 'Tạm dừng', color: 'warning' }, // Cam
    STOP: { label: 'Ngừng cung cấp', color: 'error' } // Đỏ
  };
  const statusOption2 = [
    { value: 'ACTIVE', label: 'Hoạt động', color: 'primary' }, // Xanh dương
    { value: 'SUSPEND', label: 'Tạm dừng', color: 'warning' }, // Cam
    { value: 'STOP', label: 'Ngừng cung cấp', color: 'error' } // Đỏ
  ];
  const handleOpen = (row) => {
    setSelectedCard({ ...row });
    setCardId(row.id);
    setOpen(true);
  };

  const handleOpenDelete = (row) => {
    setSelectedCard(row);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setCardId('');
    setOpen(false);
    setOpenDelete(false);
    setSelectedCard(initData);
  };

  const handleDelete = () => {
    selectedCard.id ? dispatch(deleteServiceRequest(selectedCard.id)) : '';
    handleClose();
  };

  return (
    <MainCard title= "Danh sách dịch vụ">
      <Grid2 container spacing={2} alignItems="center" mb={4}>
        <Grid2 size={6}>
          <SearchBar keyword={keyword} onChange={handleSearchChange} />
        </Grid2>
        <Grid2 size={6} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Tạo dịch vụ mới
          </Button>
        </Grid2>
      </Grid2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên dịch vụ</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Giá trị (VNĐ)</TableCell>
              <TableCell>Bắt buộc?</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceDatas.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.serviceName}</TableCell>
                <TableCell>
                  <Chip label={statusOptions[service.status].label} color={statusOptions[service.status].color} />
                </TableCell>
                <TableCell>
                  <TextField type="number" value={service.value} />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={service.isDefault ? service.isDefault : false}
                    // onChange={(e) => handleChange(service.id, 'isDefault', e.target.checked)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      handleOpen(service);
                    }}
                  >
                    <EditOutlined />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      handleOpenDelete(service);
                    }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
        handleCustom={() => {
          handleDelete();
        }}
        title={'Xóa dịch vụ'}
        content={'Bạn có chắc muốn xóa dịch vụ này không?'}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h3" color="primary">
              Thông tin dịch vụ
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Box>
        </DialogTitle>
        {selectedCard && (
          <DialogContent>
            <TextField
              label="Tên dịch vụ"
              fullWidth
              margin="dense"
              value={selectedCard.serviceName}
              onChange={(e) => setSelectedCard({ ...selectedCard, serviceName: e.target.value })}
            />
            <Select
              label="Trạng thái"
              fullWidth
              value={selectedCard.status}
              onChange={(e) => setSelectedCard({ ...selectedCard, status: e.target.value })}
              margin="dense"
            >
              {statusOption2.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Giá trị (VNĐ)"
              type="number"
              fullWidth
              margin="dense"
              value={selectedCard.value}
              onChange={(e) => setSelectedCard({ ...selectedCard, value: e.target.value })}
            />
            <Checkbox
              checked={selectedCard.isDefault}
              onChange={(e) => setSelectedCard({ ...selectedCard, isDefault: e.target.checked })}
            />
            Dịch vụ bắt buộc
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() => {
              selectedCard.id ? dispatch(updateServiceRequest(selectedCard)) : dispatch(addServiceRequest(selectedCard));
              handleClose();
            }}
            color="primary"
            variant="contained"
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
}