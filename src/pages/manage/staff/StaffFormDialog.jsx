import React, { useEffect, useState } from 'react';
import {
  Grid, TextField, MenuItem, Button, Dialog, DialogTitle,
  DialogContent, DialogActions,
  Box,
  Grid2,
  Avatar
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { addStaffRequest, updateStaffRequest } from 'redux/actions/staffAction';
import { useDispatch } from 'react-redux';

const statusOptions = ['WORKING', 'RESIGNED', 'PROBATION', 'SUSPENDED', 'ACTIVE'];
const genderOptions = ['MALE', 'FEMALE'];

export default function StaffFormDialog({ open, onClose, staff, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dob: null,
    phone: '',
    email: '',
    address: '',
    placeOfOrigin:'',
    identityNumber: '',
    position: '',
    workShift: '',
    salary: '',
    startDate: null,
    endDate: null,
    imageUrl: '',
    note: '',
    user:{
      status:'WORKING',
      email:'',
      userName:''
    }
  });
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(null); // URL của avatar (nếu có)
  const [imageFile, setImageFile] = useState(null); // Tệp hình ảnh đã chọn
  useEffect(() => {
    console.log(staff);
    if(staff!== null){
      setFormData(staff);
      setImageUrl(staff?.imageUrl);
    }
    }, [staff]);

 const handleChange = (field, value) => {
  if (field.includes('.')) {
    const [parent, child] = field.split('.');
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value
      }
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }
};


const handleSubmit = () => {
  const payload = { ...formData };

  const formDataToSend = new FormData();
  formDataToSend.append(
    "staff",
    new Blob([JSON.stringify(payload)], { type: "application/json" })
  );

  if (imageFile) {
    formDataToSend.append("file", imageFile);
  }

  // Gửi dữ liệu: Tùy theo bạn đang thêm mới hay cập nhật
  if (payload.id) {
    dispatch(updateStaffRequest(formDataToSend));
  } else {
    dispatch(addStaffRequest(formDataToSend));
  }

  onClose(); // đóng dialog hoặc navigate khi ở dạng trang
};

   // Hàm xử lý khi người dùng chọn tệp hình ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      // Đọc nội dung tệp hình ảnh để hiển thị trước khi tải lên
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Cập nhật URL của hình ảnh cho preview
      };
      reader.readAsDataURL(file); // Đọc tệp hình ảnh như một URL (data URL)
      setImageFile(file); // Lưu tệp hình ảnh vào state
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Thông tin nhân viên</DialogTitle>
        <DialogContent dividers>
          <Grid2 size={12}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom:2
                }}
              >
                <label
                  htmlFor="upload-avatar"
                  style={{
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    src={imageUrl}
                    alt="Avatar"
                    sx={{ width: '100%',
                    height: '100%' }}
                  />
                </label>
                <input
                  accept="image/*"
                  type="file"
                  id="upload-avatar"
                  onChange={handleImageChange}
                  style={{ display: 'none', width: '100%',
                    height: '100%' }}
                />
              </Box>
            </Grid2>
            <Grid container spacing={2}>
            {[
              { label: 'Họ tên', field: 'fullName' },
              { label: 'Giới tính', field: 'gender', select: true, options: genderOptions },
              { label: 'Số điện thoại', field: 'phone' },
              { label: 'Địa chỉ', field: 'address' },
              { label: 'Quê quán', field: 'placeOfOrigin' },
              { label: 'CCCD/CMND', field: 'identityNumber' },
              { label: 'Chức vụ', field: 'position' },
              { label: 'Ghi chú', field: 'note' }
            ].map(({ label, field, select, options, type }) => (
              <Grid item xs={12} sm={4} key={field}>
                {select ? (
                  <TextField
                    fullWidth
                    select
                    label={label}
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                  >
                    {options.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    label={label}
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    type={type || 'text'}
                  />
                )}
              </Grid>
            ))}

            <Grid item xs={12} sm={4}>
               <TextField
                    fullWidth
                    type='text'
                    label={"Tên tài khoản"}
                    value={formData?.user?.userName}
                    onChange={(e) => handleChange('user.userName', e.target.value)}
                  >
                  </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
               <TextField
                    fullWidth
                    type='text'
                    label={"Email"}
                    value={formData?.user?.email}
                    onChange={(e) => handleChange('user.email', e.target.value)}
                  >
                  </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Ngày sinh"
                value={formData.dob ? dayjs(formData.dob) : null}
                onChange={(newValue) => handleChange('dob', newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Ngày bắt đầu"
                value={formData.startDate ? dayjs(formData.startDate) : null}
                onChange={(newValue) => handleChange('startDate', newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Ngày kết thúc"
                value={formData.endDate ? dayjs(formData.endDate) : null}
                onChange={(newValue) => handleChange('endDate', newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Trạng thái"
                value={formData?.user?.status}
                onChange={(e) => handleChange('user.status', e.target.value)}
              >
                {statusOptions.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Hủy</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Lưu</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
