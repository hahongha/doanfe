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
import BlogForm from "./BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoRequest } from "redux/actions/authActions";
const Blog = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
    const userReducer = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUserInfoRequest());
    }, []);
  const fetchBlogs = async () => {
  try {
    setLoading(true);

    const response = await http.get(`/userRental/getStatusByUserId`);

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

  const fetchDelete = async (id) => {
  try {
    setLoading(true);

    const response = await http.delete(`/blog/status/${id}`);

    if (response.data.code === "200") {
       toast.success(`Đã xóa bài viết ${id}`);
    } else {
      toast.error({
        message: "Lỗi",
        description: "Không thể xóa bài viết"
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
    fetchDelete(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
    setNotification({ open: true, message: `Đã xóa bài viết ${id}`, severity: "success" });
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
            <Button
              variant="contained"
              color="primary"
              onClick={()=>{setOpen(true)}}
              aria-label="Tạo bài viết mới"
            >
              Tạo Bài Viết
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" 
              ,backgroundColor: blog?.cancel ? "#f0f0f0" : "white", pointerEvents: blogs?.cancel ? "none" : "auto",
                    opacity: blog?.cancel ? 0.6 : 1}}
                >
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
                {blog?.cancel ===false &&
                <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                    
                  <Button
                    size="small"
                    color="primary"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/user/blog/${blog.id}`)}
                    aria-label={`Xem chi tiết ${blog.title}`}
                  >
                    Xem
                  </Button>
                  <Box>
                    
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
                </CardActions>}
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
      <BlogForm open={open} onClose={()=> setOpen(false)} author={userReducer}/>
    </MainCard>
  );
};

export default Blog;