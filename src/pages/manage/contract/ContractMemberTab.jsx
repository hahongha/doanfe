import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Grid, Card, CardContent, CardMedia,
  Button, FormControlLabel, Checkbox, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import http from 'src/redux/api/http';
import { toast } from 'react-toastify';
import CMLinkCard from './CMLinkCard';
const ContractMemberTab = ({contractId}) => {
  const initData = {
  id: null,
  contract: {
    id: '',
    renter: null, // hoặc {} nếu bạn muốn khởi tạo rỗng
    room: null
  },
  contractMember: {
    id: null,
    createAt: '',
    updateAt: '',
    createBy: '',
    fullName: '',
    gender: 'FEMALE',
    status: '',
    phone: '',
    dob: '',
    placeOfOrigin: '',
    address: '',
    familyPhone: '',
    isRegister: false,
    identification: '',
    rentalRelationship: '',
    imageUrl: '',
    contractResponseDTO: {
      id: ''
    }
  },
  active: true
};

  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newProfile, setNewProfile] = useState(initData);
  const [edit, setEdit] = useState(null);

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
    
        const response = await http.get(`/contract_member_links/search?contractId=${contract}`);
        
        
    
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

  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });

  const handleMarkAsInactive = async (id) => {
    try {
      await http.put(`/contract_member_links/cancel/${id}`);
      setSnackbar({ open: true, message: 'Đã đánh dấu là rời đi.', severity: 'success' });
      fetchMember(); // reload danh sách nếu cần
    } catch (error) {
      setSnackbar({ open: true, message: 'Lỗi khi đánh dấu rời đi.', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await http.delete(`/contract_member_links/${id}`);
      setSnackbar({ open: true, message: 'Đã xóa thành công.', severity: 'success' });
      fetchMember(); // reload danh sách nếu cần
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Lỗi khi xóa.', severity: 'error' });
    }
  };


  const handleClickOpenDialog = (profile = null, index = null) => {
    if (profile) {
      setNewProfile({ ...profile });
      setEditMode(true);
      setSelectedIndex(index);
    } else {
      setNewProfile({
        id: '',
        contract:{

        },
        contractMember:{
          id: '',
        fullName: '',
        gender: 'MALE',
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
          id: contractId
        }
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
      gender: 'MALE',
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
        id: contractId
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
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', 
                  opacity: profile.active ? 1 : 0.5,
                      filter: profile.active ? 'none' : 'grayscale(100%)',
                      transition: 'all 0.3s',

                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={profile?.contractMember?.imageUrl || 'https://via.placeholder.com/200'}
                    alt="Ảnh đại diện"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{profile?.contractMember?.fullName || 'N/A'}</Typography>
                    <Typography variant="body2"><strong>Giới tính:</strong> {profile?.contractMember?.gender}</Typography>
                    <Typography variant="body2"><strong>Trạng thái:</strong> {profile?.contractMember?.status}</Typography>
                    <Typography variant="body2"><strong>SĐT:</strong> {profile?.contractMember?.phone}</Typography>
                    <Typography variant="body2"><strong>Ngày sinh:</strong> {profile?.contractMember?.dob}</Typography>
                    <Typography variant="body2"><strong>Quê quán:</strong> {profile?.contractMember?.placeOfOrigin}</Typography>
                    <Typography variant="body2"><strong>Thường trú:</strong> {profile?.contractMember?.address}</Typography>
                    <FormControlLabel
                      control={<Checkbox checked={profile?.contractMember?.isRegister} disabled />}
                      label="Đã đăng ký tạm trú"
                    />
                  </CardContent>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', gap:2}}>
                    <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        onClick={() => {
                          handleMarkAsInactive(profile?.id);
                        }}
                      >
                        Đã rời đi
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={() => {handleDelete(profile?.id)}}
                      >
                        Xóa bỏ
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
        </Box>
        <CMLinkCard open={openDialog} onClose={handleCloseDialog} contractId={contractId}/>
      {/* <ContractMemberDialog open={openDialog} handleClose={handleCloseDialog} member={newProfile} contractId={contract} /> */}
      </Paper>
      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        autoHideDuration={3000}
      />
    </Box>
  );
};

export default ContractMemberTab;
