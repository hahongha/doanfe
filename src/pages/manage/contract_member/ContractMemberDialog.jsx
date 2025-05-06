import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  Grid2,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  IconButton,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Avatar
} from '@mui/material';
import MainCard from 'components/MainCard';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllContractRequest } from 'redux/actions/contractAction';
import { addContractMemberRequest, updateContractMemberRequest } from 'redux/actions/contractMemberAction';

const fieldLabels = {
  fullName: 'Họ và tên',
  phone: 'Số điện thoại',
  placeOfOrigin: 'Nguyên quán',
  address: 'Địa chỉ',
  familyPhone: 'Số điện thoại gia đình',
  identification: 'CMND/CCCD',
  rentalRelationship: 'Mối quan hệ với người thuê'
};
function ContractMemberDialog({ member, open, handleClose, contractId }) {
  const [errors, setErrors] = useState({});
  const [contract, setContract] = useState('');
  const contractData = useSelector((state) => state.contract.all_contract);
  const totalRecords = useSelector((state) => state.contract.totalRecords);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllContractRequest());
  }, [dispatch]);
  const initData = {
    id: '',
    fullName: '',
    gender: 'FEMALE',
    phone: '',
    dob: '',
    placeOfOrigin: '',
    address: '',
    familyPhone: '',
    identification: '',
    rentalRelationship: '',
    isRegister: false,
    status: '',
    contractResponseDTO: {
      id: ''
    }
  };

  const [newCard, setNewCard] = useState(member ? member : initData);

  useEffect(() => {
    if (member) {
      setNewCard(member);
      setContract(member.contractResponseDTO.id);
    }
    if (contractId) {
      setContract(contractId);
    }
  }, [member, contractId]); // Chạy khi selectedMember thay đổi
  const validate = () => {
    let tempErrors = {};
    Object.keys(fieldLabels).forEach((field) => {
      const keys = field.split('.');
      const value = keys.length > 1 ? renter.user[keys[1]] : renter[field];
      if (!value) tempErrors[field] = 'Trường này không được để trống';
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleAddCard = () => {
    setNewCard([
      {
        createAt: new Date().toISOString().split('T')[0],
        updateAt: new Date().toISOString().split('T')[0],
        createBy: 'Admin',
        ...newCard
      }
    ]);
    newCard.id ? dispatch(updateContractMemberRequest(newCard)) : dispatch(addContractMemberRequest(newCard));
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <MainCard>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ paddingBottom: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h3" color="primary">
              Thông tin người ở cùng
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={5} sx={{ marginTop: 5 }}>
            <Grid2 size={12}>
              <Avatar sizes="12" src={newCard.imageUrl} />
            </Grid2>
            {Object.keys(fieldLabels).map((field, index) => (
              <Grid2 size={6} key={index}>
                <TextField
                  name={field}
                  label={fieldLabels[field]}
                  fullWidth
                  value={newCard[field] || ''}
                  onChange={handleChange}
                  error={!!errors[field]}
                  helperText={errors[field]}
                />
              </Grid2>
            ))}
            <Grid2 size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ngày sinh"
                  value={newCard.dob ? dayjs(newCard.dob) : dayjs('2026-03-24')}
                  onChange={(newValue) => setNewCard({ ...newCard, dob: newValue ? newValue.format('YYYY-MM-DD') : '' })}
                  slotProps={{ textField: { fullWidth: true, margin: 'dense' } }}
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2 size={6}>
              <FormControl sx={{ display: 'flex', justifyContent: 'flex-start' }} component="fieldset">
                <FormLabel component="legend">Chọn giới tính</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={newCard.gender ? newCard.gender : 'Male'}
                  onChange={(e) => setNewCard({ ...newCard, gender: e.target.value })}
                >
                  <FormControlLabel value="MALE" control={<Radio />} label="Nam" />
                  <FormControlLabel value="FEMALE" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </FormControl>
            </Grid2>
            <Grid2 size={6}>
              <Grid2 size={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={newCard.isRegister ? newCard.isRegister : false}
                      onChange={(e) => setNewCard({ ...newCard, isRegister: e.target.checked })}
                      name="isRegister"
                      color="primary"
                    />
                  }
                  label="Đã đăng kí thường trú chưa?"
                />
              </Grid2>
              <Grid2 size={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newCard.status && newCard.status === 'ACTIVE' ? true : false}
                      onChange={(e) => {
                        setNewCard((prev) => ({ ...prev, status: e.target.checked === true ? 'ACTIVE' : 'NOTACTIVE' }));
                      }}
                    />
                  }
                  label="Trạng thái hoạt động"
                />
              </Grid2>
            </Grid2>
            <Grid2 item size={12}>
              <InputLabel>Hợp đồng</InputLabel>
              <FormControl fullWidth>
                <Select
                  labelId="role-label"
                  value={contract}
                  onChange={(event) => {
                    setContract(event.target.value);
                    setNewCard((prev) => ({
                      ...prev,
                      contractResponseDTO: {
                        ...prev.contractResponseDTO,
                        id: event.target.value
                      }
                    }));
                  }}
                >
                  {contractData.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      <Typography variant="body2">
                        📜 <strong>Mã hợp đồng</strong> {room.id}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Hủy</Button>
          <Button onClick={handleAddCard} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
}

export default ContractMemberDialog;
