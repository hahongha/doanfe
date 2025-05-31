import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Switch,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  Alert,
  CardMedia,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MainCard from "components/MainCard"; // Assumed custom component
import { Visibility, Edit, Delete } from "@mui/icons-material";
import http from 'redux/api/http';

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  const fetchBlogs = async () => {
  try {
    setLoading(true);

    const response = await http.get(`/blog/statuses`);

    if (response.data.code === "200") {
      console.log(response?.data?.data);
      
      setBlogs(response?.data?.data);
      
    } else {
      toast.error({
        message: "Lỗi",
        description: "Không thể tải thông tin hóa đơn",
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
  // Simulate API fetch
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleTogglePublic = () => {
    setShowAll(!showAll);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
    setNotification({ open: true, message: `Đã xóa bài viết ${id}`, severity: "success" });
    toast.success(`Đã xóa bài viết ${id}`);
  };

  if (loading) {
    return (
      <MainCard>
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  if (error) {
    return (
      <MainCard>
        <Typography color="error" align="center" p={4}>
          {error}
        </Typography>
      </MainCard>
    );
  }

  return (
    <MainCard>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Danh Sách Bài Viết
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <FormControlLabel
              control={<Switch checked={showAll} onChange={handleTogglePublic} />}
              label={showAll ? "Hiển thị tất cả" : "Chỉ hiển thị công khai"}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/blog/create")}
              aria-label="Tạo bài viết mới"
            >
              Tạo Bài Viết
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>

                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src={blog?.author?.userAvatar} />
                    <Typography variant="h6" ml={2}>{blog?.author?.userName}</Typography>
                  </Box>

                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                    Ngày tạo: {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                  </Typography>
                  <Box mt={2} display="flex" gap={1}>
                    <Chip
                      label={blog.status === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
                      color={blog.status === "ACTIVE" ? "success" : "default"}
                      size="small"
                    />
                    <Chip
                      label={blog.is_public ? "Công khai" : "Riêng tư"}
                      color={blog.is_public ? "primary" : "default"}
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                  <Button
                    size="small"
                    color="primary"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/manager/blog/${blog.id}`)}
                    aria-label={`Xem chi tiết ${blog.title}`}
                  >
                    Xem
                  </Button>
                  <Box>
                    <Button
                      size="small"
                      color="secondary"
                      startIcon={<Edit />}
                      onClick={() => navigate(`/blog/edit/${blog.id}`)}
                      aria-label={`Chỉnh sửa ${blog.title}`}
                    >
                      Sửa
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(blog.id)}
                      aria-label={`Xóa ${blog.title}`}
                    >
                      Xóa
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {blogs.length === 0 && (
          <Typography align="center" color="text.secondary" mt={4}>
            Không có bài viết nào để hiển thị.
          </Typography>
        )}

        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert severity={notification.severity} sx={{ width: "100%" }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </MainCard>
  );
};

export default Blog;