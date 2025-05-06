import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Grid, Card, CardContent, CardMedia,
  Button, FormControlLabel, Checkbox, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import http from 'src/redux/api/http';
import { toast } from 'react-toastify';
import ContractMemberDialog from '../contract_member/ContractMemberDialog';

const ContractMemberTab = ({contractId}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newProfile, setNewProfile] = useState({
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
  });

  const [profiles, setProfiles] = useState([]);
  const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
  const navigate = useNavigate();

  const [contract, setContract] = useState(contractId?contractId:'ct_001');
  
    const fetchMember = async () => {
      try {
        setLoading(true);
    
        if (!isAuthenticated) {
          setLoading(false);
          toast.warning({
            message: "Chưa đăng nhập",
            description: "Vui lòng đăng nhập để xem thông tin cá nhân",
          });
          return;
        }
    
        const response = await http.get(`/contractMember/getByContract?contract=${contract}`);
        
        
    
        if (response.data.code === "200") {
          
          setProfiles(response.data.data);
          
          
        } else {
          toast.error({
            message: "Lỗi",
            description:
              response.message || "Không thể tải thông tin phòng",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error({
          message: "Lỗi kết nối",
          description: "Không thể kết nối đến máy chủ",
        });
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      if (isAuthenticated) {
        fetchMember();
      }else{
        navigate("/login");
      }
    }, [contract]);

  const handleClickOpenDialog = (profile = null, index = null) => {
    if (profile) {
      setNewProfile({ ...profile });
      setEditMode(true);
      setSelectedIndex(index);
    } else {
      setNewProfile({
        id: '',
        fullName: '',
        gender: 'Female',
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
      });
      setEditMode(false);
      setSelectedIndex(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewProfile({
      id: '',
      fullName: '',
      gender: 'Female',
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
    });
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', p: 3 }}>
      <Paper elevation={3} sx={{ mx: 'auto', borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ backgroundColor: '#1e88e5', color: 'white', p: 3, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold">THÔNG TIN CÁ NHÂN</Typography>
        </Box>

        <Grid container spacing={3} sx={{ padding: 3 }}>
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={profile.imageUrl || 'https://via.placeholder.com/200'}
                    alt="Ảnh đại diện"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{profile.fullName || 'N/A'}</Typography>
                    <Typography variant="body2"><strong>Giới tính:</strong> {profile.gender}</Typography>
                    <Typography variant="body2"><strong>Trạng thái:</strong> {profile.status}</Typography>
                    <Typography variant="body2"><strong>SĐT:</strong> {profile.phone}</Typography>
                    <Typography variant="body2"><strong>Ngày sinh:</strong> {profile.dob}</Typography>
                    <Typography variant="body2"><strong>Quê quán:</strong> {profile.placeOfOrigin}</Typography>
                    <Typography variant="body2"><strong>Thường trú:</strong> {profile.address}</Typography>
                    <FormControlLabel
                      control={<Checkbox checked={profile.isRegister} disabled />}
                      label="Đã đăng ký tạm trú"
                    />
                  </CardContent>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', gap:2}}>
                    <Button variant="contained" size="small" onClick={() => handleClickOpenDialog(profile, index)}>
                      Chỉnh sửa
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ p: 3 }}>Không có người ở cùng.</Typography>
          )}
        </Grid>

        {/* Nút Thêm người */}
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <Button variant="contained" color="success" onClick={() => handleClickOpenDialog()}>
            Thêm Người Ở
          </Button>
        </Box>  {/* Dialog dùng chung cho Thêm / Chỉnh sửa
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Chỉnh Sửa Người Ở' : 'Thêm Người Ở'}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Họ và tên" fullWidth name="fullName" value={newProfile.fullName} onChange={handleInputChange} />
          <TextField margin="dense" label="Giới tính" fullWidth name="gender" value={newProfile.gender} onChange={handleInputChange} />
          <TextField margin="dense" label="Trạng thái" fullWidth name="status" value={newProfile.status} onChange={handleInputChange} />
          <TextField margin="dense" label="Số điện thoại" fullWidth name="phone" value={newProfile.phone} onChange={handleInputChange} />
          <TextField margin="dense" label="Ngày sinh" type="date" fullWidth name="dob" value={newProfile.dob} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
          <TextField margin="dense" label="Quê quán" fullWidth name="placeOfOrigin" value={newProfile.placeOfOrigin} onChange={handleInputChange} />
          <TextField margin="dense" label="Nơi thường trú" fullWidth name="address" value={newProfile.address} onChange={handleInputChange} />
          <FormControlLabel
            control={<Checkbox checked={newProfile.isRegister} onChange={handleCheckboxChange} />}
            label="Đã đăng ký tạm trú"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Hủy</Button>
          <Button onClick={handleSaveProfile} color="primary">{editMode ? 'Lưu thay đổi' : 'Thêm'}</Button>
        </DialogActions>
      </Dialog> */}
      <ContractMemberDialog open={openDialog} handleClose={handleCloseDialog} member={newProfile} contractId={contract} />
      </Paper>
    </Box>
  );
};

export default ContractMemberTab;
