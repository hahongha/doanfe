import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { toast } from "react-toastify";
import http from 'redux/api/http';
import { useNavigate } from "react-router";
const BlogForm = ({ open, onClose, onSubmit, initialData = {}, author }) => {

  const [formData, setFormData] = useState({
    id: initialData.id || "",
    title: initialData.title || "",
    content: initialData.content || "",
    createdAt: initialData.createdAt || new Date().toISOString(),
    updatedAt: initialData.updatedAt || new Date().toISOString(),
    author: {
      userId :  initialData.author?.userId || author?.userId,
      userName: initialData.author?.userName || author?.userName,
      userAvatar: initialData.author?.userAvatar || author?.userAvatar,
    },
    status: initialData?.status || "ACTIVE",
    public: initialData?.public || true,
    cancel: initialData?.cancel || false
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const [formData2, setFormData2] = useState({
    id: initialData.id || "",
    title: initialData.title || "",
    content: initialData.content || "",
    createdAt: initialData.createdAt || new Date().toISOString(),
    updatedAt: initialData.updatedAt || new Date().toISOString(),
    author: {
      userId :  initialData.author?.userId || author?.userId,
      userName: initialData.author?.userName || author?.userName,
      userAvatar: initialData.author?.userAvatar || author?.userAvatar,
    },
    status: initialData?.status || "ACTIVE",
    public: initialData?.public || true,
    cancel: initialData?.cancel || false
  });
  const complaintStatuses = [
  { value: "ACTIVE", label: "Đang hoạt động" },
  { value: "PENDING", label: "Đang chờ xử lý" },
  { value: "IN_PROGRESS", label: "Đang xử lý" },
  { value: "RESOLVED", label: "Đã giải quyết" },
  { value: "REJECTED", label: "Bị từ chối" },
  { value: "CLOSED", label: "Đã đóng" },
  { value: "CANCELLED", label: "Đã hủy" },
];
const navigate = useNavigate();

    const addStatus = async (data) => {
    try {
      setLoading(true);

      const response = await http.post(`/blog/addStatus`, data);
      
      if (response.data.code === "200") {
          
      setNotification({ open: true, message: "Đã thêm bài viết", severity: "success" });
      toast.success("Đã thêm bài viết");
      } else {
        setNotification({ open: true, message: "Thêm bài viết thất bại", severity: "error" });
        toast.error("Thêm bài viết thất bại");
      }
    } catch (error) {
      setNotification({ open: true, message: "Thêm bài viết thất bại", severity: "error" });
      toast.error("Thêm bài viết thất bại");
    } finally {
      setLoading(false);
    }
  };

    const updateStatus = async (data) => {
      try {
        setLoading(true);
        console.log(data);
        
        const response = await http.put(`/blog/updateStatus`, data);
        console.log(response);
        
        if (response.data.code === "200") {
            
        setNotification({ open: true, message: "Đã sửa bài viết", severity: "success" });
        toast.success("Đã sửa bài viết");
        } else {
          setNotification({ open: true, message: "Sửa bài viết thất bại1", severity: "error" });
          toast.error("Sửa bài viết thất bại1");
        }
      } catch (error) {
        setNotification({ open: true, message: "Sửa bài viết thất bại2", severity: "error" });
        toast.error("Sửa bài viết thất bại2");
      } finally {
        setLoading(false);
      }
  };

  const handleChange = (field, value, isAuthor = false) => {
    if (isAuthor) {
      setFormData((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = () => {
    if(!formData.id) {
      addStatus(formData);
    }else{
      updateStatus(formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{formData.id ? "Chỉnh sửa Blog" : "Thêm Blog Mới"}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Tiêu đề"
              fullWidth
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nội dung"
              fullWidth
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Ngày tạo"
              fullWidth
              value={formData.createdAt}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Ngày cập nhật"
              fullWidth
              value={formData.updatedAt}
              disabled
            />
          </Grid>

        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData?.cancel || false}
                onChange={(e) => handleChange("cancel", e.target.checked)}
                name="cancel"
              />
            }
            label="Xóa bỏ"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData?.public || false}
                onChange={(e) => handleChange("public", e.target.checked)}
                name="public"
              />
            }
            label="Công khai"
          />
        </Grid>

          <Grid item xs= {6}>
            

      <FormControl fullWidth>
        <InputLabel id="complaint-status-label">Trạng thái</InputLabel>
        <Select
          labelId="complaint-status-label"
          id="complaint-status"
          value={formData?.status}
          label="Trạng thái"
          onChange={(e) => handleChange("status", e.target.value)}
        >
          {complaintStatuses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
                Thông tin tác giả
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                <Avatar
                    src={formData?.author?.userAvatar}
                    alt="avatar"
                    sx={{ width: 56, height: 56 }}
                />
                </Grid>
                <Grid item xs={4}>
                <Typography> {formData?.author?.userName}</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography> {formData?.author?.userType}</Typography>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{
          setFormData(formData2);
          onClose();
        }}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlogForm;
