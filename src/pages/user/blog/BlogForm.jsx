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
} from "@mui/material";
import { toast } from "react-toastify";
import http from 'redux/api/http';
const BlogForm = ({ open, onClose, initialData = {}, author }) => {
  const [formData, setFormData] = useState({
    id: initialData.id || null,
    title: initialData.title || "",
    content: initialData.content || "",
    status: "ACTIVE",
    createdAt: initialData.createdAt || new Date().toISOString(),
    updatedAt: initialData.updatedAt || new Date().toISOString()
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

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


  const handleChange = (field, value, isAuthor = false) => {
    setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
  };

  const handleSubmit = () => {
    addStatus(formData);
    setFormData({
    id: initialData.id || null,
    title: initialData.title || "",
    content: initialData.content || "",
    createdAt: initialData.createdAt || new Date().toISOString(),
    updatedAt: initialData.updatedAt || new Date().toISOString()
  });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4" align="center">
            {formData.id ? "Chỉnh sửa nội dung" : "Thêm nội dung mới"}
        </Typography>
        </DialogTitle>

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

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
                Thông tin tác giả
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                <Avatar
                    src={author?.userAvatar}
                    alt="avatar"
                    sx={{ width: 56, height: 56 }}
                />
                </Grid>

                <Grid item xs={4}>
                <Typography> {author?.userName}</Typography>
                </Grid>
            </Grid>
            </Grid>

        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlogForm;
