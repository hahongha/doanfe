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
  Card,
  CardMedia,
  Box,
  Typography,
  IconButton,
  Avatar,
  ListItemIcon,
  ListItemText,
  Grid
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
      roleName: 'USER'
    }
  }
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
const statusMap = {
  ACTIVE: { label: 'Đang thuê', icon: <CheckCircleIcon /> },
  INACTIVE: { label: 'Đã trả phòng', icon: <DoNotDisturbIcon /> },
  PENDING: { label: 'Chờ xác nhận', icon: <HourglassTopIcon /> },
  BANNED: { label: 'Bị chặn', icon: <BlockIcon /> },
  EXPIRED: { label: 'Hết hạn', icon: <WarningIcon /> },
  DELETED: { label: 'Đã xóa', icon: <DeleteIcon /> },
  SUSPEND: { label: 'Chờ trả phòng', icon: <HourglassTopIcon /> }
};

export default function RenterDialog({ open, onClose, renterData, onDelete }) {
  const [renter, setRenter] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState(''); // URL của avatar (nếu có)
  const [imageFile, setImageFile] = useState(null); // Tệp hình ảnh đã chọn

  useEffect(() => {
    setRenter(renterData || initialData);
    setImageUrl(renterData?.imageUrl)
  }, [renterData]);

  const dispatch = useDispatch();

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

  // const handleSave = () => {
  //   const formData = new FormData();

  //   // Thêm object room dưới dạng JSON
  //   formData.append(
  //     "renter",
  //     new Blob([JSON.stringify(renter)], { type: "application/json" })
  //   );

  //   // Thêm 1 hình ảnh (file đơn)
  //   if (imageFile) {
  //     formData.append("file", imageFile); // key 'file' phải khớp với tên @RequestPart bên backend
  //   } 
    

  //   if (validate()) {
  //     if (renter.id) {
  //       dispatch(updateRenterRequest(formData));
  //     } else {
  //       dispatch(addRenterRequest(formData));
  //     }
  //   }
  // };

  const handleSave = () => {
    const formData = new FormData();
    if (validate()) {

      formData.append(
      "renter",
      new Blob([JSON.stringify(renter)], { type: "application/json" })
    );
  
    if (imageFile) {
      formData.append("file", imageFile);
    }

      if (renter.id) {
        dispatch(updateRenterRequest(formData));
      } else {
        dispatch(addRenterRequest(formData));
      }
    }
    onClose();
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

  // Hàm xử lý tải hình ảnh lên (tải lên sau khi chọn)
  const handleImageUpload = async () => {
    if (imageFile) {
      try {
        // Giả sử bạn có hàm `cloudinaryService.uploadImage` để tải lên hình ảnh
        const uploadedImageUrl = await cloudinaryService.uploadImage(imageFile, 'RENTER');
        setImageUrl(uploadedImageUrl); // Cập nhật URL hình ảnh sau khi tải lên
        handleChange({ target: { name: 'imageUrl', value: uploadedImageUrl } });
      } catch (error) {
        console.error('Error uploading image:', error);
        // Xử lý lỗi nếu cần
      }
    }
  };

  const [imageError, setImageError] = useState(false);
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
          {/* <Grid2 size={4}>
            <TextField
              name={'imageUrl'}
              label={'Avatar'}
              fullWidth
              value={renter.user.imageUrl ? renter.user.imageUrl || '' : renter.user.imageUrl || ''}
              onChange={handleChange}
              error={!!errors[renter.user.imageUrl]}
              helperText={errors[renter.user.imageUrl]}
            />
          </Grid2>
          <Grid2 size={4}>
            <Avatar src={renter.user.imageUrl} alt={renter.fullName} />
          </Grid2> */}
          {/* Preview Avatar */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
          {/* Click vào Avatar để chọn tệp hình ảnh */}
          <label htmlFor="upload-avatar" style={{ cursor: 'pointer' }}>
            <Avatar
              src={imageUrl} 
              alt={renter.fullName} 
              sx={{ width: 100, height: 100 }}
            />
          </label>
          {/* Input ẩn khi click vào Avatar */}
          <input
            accept="image/*"
            type="file"
            id="upload-avatar"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </Grid>

          {Object.keys(fieldLabels).map((field, index) => (
            <Grid2 size={12} key={index}>
              <TextField
                name={field}
                label={fieldLabels[field]}
                fullWidth
                value={field.includes('user.') ? renter.user[field.split('.')[1]] || '' : renter[field] || ''}
                onChange={handleChange}
                error={!!errors[field]}
                helperText={errors[field]}
              />
            </Grid2>
          ))}
          <Grid2 size={4}>
            <TextField
              select
              name="gender"
              label="Giới tính"
              fullWidth
              value={renter.gender || 'MALE'}
              onChange={handleChange}
              error={!!errors.gender}
            >
              <MenuItem value="">Chọn giới tính</MenuItem>
              <MenuItem value="MALE">Nam</MenuItem>
              <MenuItem value="FEMALE">Nữ</MenuItem>
            </TextField>
            {errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
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
              sx={{display:"flex"}}
            >
              <MenuItem value="">
                Chọn trạng thái
              </MenuItem>
              {Object.entries(statusMap).map(([value, { label, icon }]) => (
                <MenuItem key={value} value={value} sx={{display:"flex"}} icon={icon}>
                  <ListItemText primary={label} />
                </MenuItem>
              ))}
            </TextField>
            {errors.status && <FormHelperText error>{errors.status}</FormHelperText>}
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
