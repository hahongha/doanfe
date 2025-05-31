import { useState, useEffect } from 'react';
import {
  Button,
  Grid2,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormHelperText,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  IconButton,
  Avatar,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addRenterRequest, updateRenterRequest } from 'src/redux/actions/renterAction';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

const initialData = {
  id: null,
  fullName: null,
  gender: null,
  status: null,
  phone: null,
  dob: null,
  identification: null,
  placeOfOrigin: null,
  address: null,
  familyPhone: null,
  isRegister: true,
  user: {
    imageUrl: null,
    email: null,
    userName: null,
    userId: null,
    role: {
      roleName: 'USER',
    },
  },
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
  'user.email': 'Email',
};

const statusMap = {
  ACTIVE: { label: 'Đang thuê', icon: <CheckCircleIcon /> },
  INACTIVE: { label: 'Đã trả phòng', icon: <DoNotDisturbIcon /> },
  PENDING: { label: 'Chờ xác nhận', icon: <HourglassTopIcon /> },
  BANNED: { label: 'Bị chặn', icon: <BlockIcon /> },
  EXPIRED: { label: 'Hết hạn', icon: <WarningIcon /> },
  DELETED: { label: 'Đã xóa', icon: <DeleteIcon /> }
};

export default function RenterDialog({ open, onClose, renterData, onDelete }) {
  const [renter, setRenter] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setRenter(renterData || initialData);
    setImageUrl(renterData?.user?.imageUrl || '');
  }, [renterData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRenter((prev) => {
      const keys = name.split('.');
      if (keys.length > 1) {
        return { ...prev, user: { ...prev.user, [keys[1]]: value } };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSwitchChange = (e) => {
    setRenter((prev) => ({ ...prev, isRegister: e.target.checked }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
      setImageError(false);
    }
  };

  const validate = () => {
    let tempErrors = {};
    Object.keys(fieldLabels).forEach((field) => {
      const keys = field.split('.');
      const value = keys.length > 1 ? renter.user[keys[1]] : renter[field];
      if (!value) tempErrors[field] = 'Trường này không được để trống';
    });
    if (!renter.gender) tempErrors.gender = 'Vui lòng chọn giới tính';
    if (!renter.status) tempErrors.status = 'Vui lòng chọn trạng thái';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        const updatedRenter = {
          ...renter,
          user: { ...renter.user, imageUrl },
        };

        const formData = new FormData();
        formData.append(
          'renter',
          new Blob([JSON.stringify(updatedRenter)], { type: 'application/json' })
        );

        if (imageFile) {
          formData.append('file', imageFile);
        }

        if (renter.id) {
          dispatch(updateRenterRequest(formData));
        } else {
          dispatch(addRenterRequest(formData));
        }
        onClose();
      } catch (error) {
        console.error('Error saving renter:', error);
        // Display error to user (e.g., via Snackbar)
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3" color="primary">
            Thông tin khách thuê
          </Typography>
          <IconButton onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid2 container spacing={2} paddingTop={3}>
          <Grid2 size={12} display="flex" justifyContent="center" alignItems="center">
            <label htmlFor="upload-avatar" style={{ cursor: 'pointer' }}>
              <Avatar
                src={imageUrl}
                alt={renter.fullName || 'Avatar'}
                sx={{ width: 100, height: 100 }}
              />
            </label>
            <input
              accept="image/*"
              type="file"
              id="upload-avatar"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {imageError && (
              <FormHelperText error>Lỗi khi tải ảnh lên. Vui lòng thử lại.</FormHelperText>
            )}
          </Grid2>

          {/* Explicit TextFields for each field */}
          <Grid2 size={12}>
            <TextField
              name="fullName"
              label="Họ và tên"
              fullWidth
              value={renter.fullName || ''}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              name="phone"
              label="Số điện thoại"
              fullWidth
              value={renter.phone || ''}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              name="dob"
              label="Ngày sinh"
              fullWidth
              type='date'
              value={renter.dob || ''}
              onChange={handleChange}
              error={!!errors.dob}
              helperText={errors.dob}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              name="identification"
              label="CMND/CCCD"
              fullWidth
              value={renter.identification || ''}
              onChange={handleChange}
              error={!!errors.identification}
              helperText={errors.identification}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              name="placeOfOrigin"
              label="Quê quán"
              fullWidth
              value={renter.placeOfOrigin || ''}
              onChange={handleChange}
              error={!!errors.placeOfOrigin}
              helperText={errors.placeOfOrigin}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              name="address"
              label="Địa chỉ"
              fullWidth
              value={renter.address || ''}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              name="familyPhone"
              label="Số điện thoại người thân"
              fullWidth
              value={renter.familyPhone || ''}
              onChange={handleChange}
              error={!!errors.familyPhone}
              helperText={errors.familyPhone}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              name="user.userName"
              label="Tên đăng nhập"
              fullWidth
              value={renter.user.userName || ''}
              onChange={handleChange}
              error={!!errors['user.userName']}
              helperText={errors['user.userName']}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              name="user.email"
              label="Email"
              fullWidth
              value={renter.user.email || ''}
              onChange={handleChange}
              error={!!errors['user.email']}
              helperText={errors['user.email']}
            />
          </Grid2>

          <Grid2 size={4}>
            <TextField
              select
              name="gender"
              label="Giới tính"
              fullWidth
              value={renter.gender || 'MALE'}
              onChange={handleChange}
              error={!!errors.gender}
              helperText={errors.gender}
            >
              <MenuItem value="">Chọn giới tính</MenuItem>
              <MenuItem value="MALE">Nam</MenuItem>
              <MenuItem value="FEMALE">Nữ</MenuItem>
            </TextField>
          </Grid2>
          <Grid2 size={4}>
            <TextField
              select
              name="status"
              label="Trạng thái"
              fullWidth
              value={renter.status || 'INACTIVE'}
              onChange={handleChange}
              error={!!errors.status}
              helperText={errors.status}
              sx={{ display: 'flex' }}
            >
              <MenuItem value="">Chọn trạng thái</MenuItem>
              {Object.entries(statusMap).map(([value, { label, icon }]) => (
                <MenuItem key={value} value={value}>
                  <Box display="flex" alignItems="center">
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={label} />
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Grid2>
          <Grid2 size={4}>
            <FormControlLabel
              control={<Switch checked={renter.isRegister} onChange={handleSwitchChange} />}
              label="Đã đăng ký thường trú chưa?"
            />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Hủy
        </Button>
        <Button onClick={handleSave} variant="contained" color="success">
          Lưu Thông Tin
        </Button>
        <Button onClick={onDelete} variant="contained" color="error">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}