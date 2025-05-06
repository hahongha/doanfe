import { Avatar, FormControl, FormControlLabel, Grid2, MenuItem, Select, Switch, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomRequest } from 'src/redux/actions/roomAction';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import EditableCardList from '../contract_member/ContractMember';
function ContractDialog() {
  const [tabIndex, setTabIndex] = useState(0);
  const totalRecords = useSelector((state) => state.room.totalRecords);
  const dispatch = useDispatch();

  const initData = {
    id: 'CNT001',
    renter: {
      id: 'REN001',
      fullName: 'Nguyễn Văn A',
      gender: 'Male',
      status: 'ACTIVE',
      phone: '0968290642',
      dob: '1990-03-11',
      identification: '498809261',
      placeOfOrigin: 'Hà Nội',
      address: '14 Đường ABC, Quận 3, TP.HCM',
      familyPhone: '0990545327',
      isRegister: true,
      user: {
        imageUrl: 'https://example.com/avatar1.jpg',
        email: 'user1@example.com',
        status: 'ACTIVE',
        userName: 'user1',
        userId: 'eec66a0a78304f1597b18c8fe182efd0',
        role: {
          id: 2,
          roleName: 'USER',
          authorityDTOs: []
        }
      }
    },
    room: {
      id: 5,
      roomNumber: '105',
      status: 'ACTIVE',
      isActive: true,
      description: 'Phòng rộng có ban công thoáng mát',
      number: 2,
      electricIndex: 110,
      waterIndex: 28,
      idRenter: null,
      nameRender: null,
      room_Type: {
        id: 5,
        name: 'Phòng đầy đủ tiện nghi',
        size: 35,
        furniture: 'máy lạnh, giường đôi, bếp, tủ lạnh, nhà vệ sinh riêng',
        cost: 4500000
      },
      images: ['https://picsum.photos/400/600.jpg', 'https://picsum.photos/400/600.jpg']
    },
    startDate: '2025-03-24',
    endDate: '2026-03-24',
    realEndDate: null,
    realEndDate: '2026-03-24',
    rentalPrice: 5465377,
    deposit: 1093075,
    isDeposit: true,
    isActive: true,
    createAt: '2025-03-24',
    updateAt: '2025-03-24'
  };

  const [contract, setContract] = useState(initData);
  const [roomId, setRoomId] = useState(contract.room.id ? contract.room.id : '');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContract((prev) => {
      const keys = name.split('.');
      if (keys.length > 1) {
        return { ...prev, renter: { ...prev.renter, [keys[1]]: value } };
      }
      return { ...prev, [name]: value };
    });
  };

  const fieldLabels = {
    fullName: 'Họ và tên',
    phone: 'Số điện thoại',
    dob: 'Ngày sinh',
    identification: 'CMND/CCCD',
    placeOfOrigin: 'Quê quán',
    address: 'Địa chỉ',
    familyPhone: 'Số điện thoại người thân',
    'user.userName': 'Tên đăng nhập',
    'user.email': 'Email'
  };

  const handleSwitchChange = (e) => {
    setContract((prev) => ({ ...prev, isActive: e.target.checked }));
  };

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

  useEffect(() => {
    dispatch(getAllRoomRequest());
  }, [dispatch]);

  const handleSwitchChange2 = (e) => {
    setContract((prev) => ({ ...prev, isDeposit: e.target.checked }));
  };

  return (
    <MainCard>
      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)}>
        <Tab label="Thông tin khách thuê" />
        <Tab label="Thông tin phòng" />
        <Tab label="Thông tin hợp đồng" />
        <Tab label="Thông tin thành viên" />
        <Tab label="Test" />
      </Tabs>
      <Box>
        {tabIndex === 0 && (
          <Box>
          <FormControl fullWidth margin="dense">
            <Select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
              {roomDatas.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  <Typography variant="body2">
                    🏠 <strong>Phòng:</strong> {room.roomNumber}
                  </Typography>
                  <Typography variant="body2">
                    📜 <strong>Mô tả:</strong> {room.description}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        )}
        {tabIndex === 1 && (
          <>
            <Box>
              <FormControl fullWidth margin="dense">
                <Select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                  {roomDatas.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      <Typography variant="body2">
                        🏠 <strong>Phòng:</strong> {room.roomNumber}
                      </Typography>
                      <Typography variant="body2">
                        📜 <strong>Mô tả:</strong> {room.description}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </>
        )}
        {tabIndex === 2 && (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={2}>
                <DatePicker
                  label="Ngày bắt đầu"
                  value={dayjs(contract.startDate) || dayjs('2026-03-24')}
                  onChange={handleChange}
                  renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                />
                <DatePicker
                  label="Ngày hết hạn"
                  value={dayjs(contract.endDate) || dayjs('2026-03-24')}
                  onChange={handleChange}
                  renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                />

                <DatePicker
                  label="Ngày hết hạn thực tế"
                  value={contract.realEndDate ? dayjs(contract.realEndDate) : null}
                  onChange={handleChange}
                  renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <TextField
              label="Giá thuê (VND)"
              fullWidth
              margin="normal"
              type="number"
              value={contract.rentalPrice || 0}
              onChange={handleChange}
            />
            <TextField
              label="Đặt cọc (VND)"
              fullWidth
              margin="normal"
              type="number"
              value={contract.deposit || 0}
              onChange={handleChange}
            />
            <Grid2 size={12}>
              <FormControlLabel control={<Switch checked={contract.isActive} onChange={handleSwitchChange} />} label="Trạng thái" />
            </Grid2>
            <Grid2 size={12}>
              <FormControlLabel
                control={<Switch checked={contract.isDeposit} onChange={handleSwitchChange2} />}
                label="Đã đóng cọc chưa?"
              />
            </Grid2>
          </>
        )}
        {tabIndex === 3 && (
          <>
            <EditableCardList />
          </>
        )}
      </Box>
    </MainCard>
  );
}

export default ContractDialog;
