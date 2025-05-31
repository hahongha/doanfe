import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, FormControlLabel, Checkbox, Grid,
  Box,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import http from 'redux/api/http';
export default function CMLinkCard({ open, onClose, data, contractId, contractMemberIdentification }) {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: '',
    contract: { id: contractId|| '' },
    contractMember: { id: '',
        identification: contractMemberIdentification || ''
     },
    active: true
  });
  const navigate = useNavigate();

  useEffect(() => {
    if(contractId){
        handleSearchContract(contractId);
    }
    if(contractMemberIdentification){
        handleSearchContractMember(contractMemberIdentification);
    }
    if (data) setForm(data);
  }, [data, contractId, contractMemberIdentification]);

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (field, nested) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [nested]: value
      }
    }));
  };

const handleSave = async () =>{
    try {
          setLoading(true);
          const response = await http.post(`/contract_member_links`, data= form);
          if (response.data.code === "200") {   
                toast.success("Lưu thành công");
                onClose();
          } else {
            toast.error({
              message: "Lỗi",
              description:
                "Không lưu được",
            });
          }
        } catch (error) {
          toast.error({
            message: "Lỗi kết nối",
            description: "Không thể kết nối đến máy chủ",
          });
        } finally {
          setLoading(false);
    }
}

const handleSearchContract = async (id) => {
  try {
          setLoading(true);
          const response = await http.get(`/contract/${id}`);
          if (response.data.code === "200") {   
            setForm(prev => ({
            ...prev,
            contract: response?.data?.data,
            }));
          } else {
            toast.error({
              message: "Lỗi",
              description:
                "Không thể tải thông tin hợp đồng",
            });
          }
        } catch (error) {
          toast.error({
            message: "Lỗi kết nối",
            description: "Không thể kết nối đến máy chủ",
          });
        } finally {
          setLoading(false);
    }
};

const handleSearchContractMember = async (id)=>{
    console.log(id);
        
    try {
            setLoading(true); 
            const response = await http.get(`/contractMember/getByIdentification/${id}`);
            if(!response.data.code) {
                toast.error({
                message: "Lỗi",
                description:
                  "Không thể tải thông tin người ở cùng",
              });
            }
            if (response.data.code === "200") {
              setForm(prev => ({
                ...prev,
                contractMember: response?.data?.data,
        }));
            } else {
              toast.error({
                message: "Lỗi",
                description:
                  "Không thể tải thông tin người ở cùng",
              });
            }
          } catch (error) {
            toast.error({
              message: "Lỗi kết nối",
              description: "Không thể kết nối đến máy chủ",
            });
          } finally {
            setLoading(false);
          }
}

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h3">
            Thông tin người ở cùng
        </Typography>
        </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Nhập mã hợp đồng"
              fullWidth
              value={form.contract.id}
              onChange={handleNestedChange('contract', 'id')}
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 1, pt: 1, mb:1, pb:1 }}>
                <Button variant="outlined" onClick={()=>{
                    handleSearchContract(form.contract.id)
                    
                }
                }>Tìm kiếm</Button>
            </Box>
            <Box>
                <Typography variant="h6">Mã hợp đồng:{form?.contract?.id}</Typography>
                <Typography variant="body2"><strong>Tên người thuê:</strong> {form?.contract?.renter?.fullName}</Typography>
                <Typography variant="body2"><strong>Trạng thái:</strong> {form?.contract?.status}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.active}
                  onChange={handleChange('active')}
                />
              }
              label="Đang hoạt động"
            />
          </Grid>
          <Grid item xs={12}>
                <TextField
                    label="Nhập căn cước công dân của người ở cùng"
                    value={form?.contractMember?.identification || ''}
                    fullWidth
                    onChange={handleNestedChange('contractMember', 'identification')}
                />
                <Box sx={{ display: 'flex', gap: 2, mt: 1, pt: 1, mb:1, pb:1 }}>
                <Button variant="outlined" onClick={() => handleSearchContractMember(form?.contractMember?.identification)}>Tìm kiếm</Button>
                <Button variant="outlined">Người ở cùng chưa tồn tại</Button>
                </Box>

                <Box>
                    <Typography variant="h6">Họ tên:{form?.contractMember?.fullName}</Typography>
                    <Typography variant="body2"><strong>Giới tính:</strong> {form?.contractMember?.gender}</Typography>
                    <Typography variant="body2"><strong>Trạng thái:</strong> {form?.contractMember?.status}</Typography>
                    <Typography variant="body2"><strong>SĐT:</strong> {form?.contractMember?.phone}</Typography>
                    <Typography variant="body2"><strong>Ngày sinh:</strong> {form?.contractMember?.dob}</Typography>
                    <Typography variant="body2"><strong>Quê quán:</strong> {form?.contractMember?.placeOfOrigin}</Typography>
                    <Typography variant="body2"><strong>Thường trú:</strong> {form?.contractMember?.address}</Typography>
                    <Typography variant="body2">{form?.contractMember?.isRegister ===true ? "Đã đăng ký tạm trú" : "Chưa đăng kí tạm trú"}</Typography>
                </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="ID"
              sx={{ display: 'none' }}
              fullWidth
              value={form.id}
              onChange={handleChange('id')}
            />
          </Grid>

        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={()=>{

        }}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
