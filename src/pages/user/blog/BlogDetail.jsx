import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Chip,
  TextField,
  IconButton,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { ArrowBack, Edit, Delete, Send } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MainCard from "components/MainCard"; // Assumed custom component
import http from 'redux/api/http';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoRequest } from "redux/actions/authActions";


const BlogDetail = () => {
    const initData = {
  id: "",
  title: "",
  content: "",
  createdAt: new Date().toISOString(),
  author: {
    userName: "",
    email: "",
    status: "",
    userType: "",
    userAvatar: ""
  },
  comments: [
    {
      id: "",
      content: "",
      createdAt: new Date().toISOString(),
      statusId: "",
      author: {
        userName: "",
        email: "",
        status: "",
        userType: "",
        userAvatar: ""
      }
    }
  ],
  status: ""
};



  const { statusId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(initData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
    const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
    const userReducer = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfoRequest());
    }, [dispatch]);
const fetchBlogs = async (id) => {
  try {
    setLoading(true);
    console.log(id);
    
    const response = await http.get(`/blog/status/${id}`);

    console.log(response);
    
    if (response.data.code === "200") {
      setBlog(response.data.data);
    } else {
      toast.error("Không thể tải thông tin blog");
    }
  } catch (error) {
    toast.error("Không thể kết nối đến máy chủ");
  } finally {
    setLoading(false);
  }
};

const addComment = async (data) => {
  try {
    setLoading(true);
    console.log(data);
    
    
    const response = await http.post(`/blog/addComment`, data);
    
    if (response.data.code === "200") {
        
    setNotification({ open: true, message: "Đã thêm bình luận", severity: "success" });
    toast.success("Đã thêm bình luận");
    } else {
      setNotification({ open: true, message: "Thêm bình luận thất bại", severity: "error" });
      toast.error("Thêm bình luận thất bại");
    }
  } catch (error) {
    setNotification({ open: true, message: "Thêm bình luận thất bại", severity: "error" });
    toast.error("Thêm bình luận thất bại");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (statusId) {
    fetchBlogs(statusId);
  }
}, [statusId]);


  const handleDelete = () => {
    setNotification({ open: true, message: `Đã xóa bài viết ${blog?.id}`, severity: "success" });
    toast.success(`Đã xóa bài viết ${blog?.id}`);
    navigate(-1);
  };

  const handleAddComment = (e) => {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter" && !e.shiftKey)) {
      e.preventDefault();
      if (!newComment?.trim()) {
        setNotification({ open: true, message: "Bình luận không được để trống", severity: "error" });
        return;
      }
      if (newComment?.length > 500) {
        setNotification({ open: true, message: "Bình luận không được vượt quá 500 ký tự", severity: "error" });
        return;
      }
      const comment = {
        id: `C${(blog?.comments?.length + 1).toString().padStart(3, "0")}`,
        content: newComment,
        createdAt: new Date().toISOString(),
        statusId: blog?.id,
        author: {
          userName: userReducer?.userName, // Replace with actual user
          userAvatar: userReducer?.userAvatar
        },
      };
      setBlog({
        ...blog,
        comments: [comment, ...blog?.comments],
      });
      addComment(comment);
    }
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

  if (error || !blog) {
    return (
      <MainCard>
        <Typography color="error" align="center" p={4}>
          {error || "Bài viết không tồn tại"}
        </Typography>
      </MainCard>
    );
  }

  return (
    <MainCard>
      <Box sx={{ p: { xs: 2, md: 4 } }} role="main">
        {/* Header */}
        <Box display="flex" alignItems="center" mb={3}>
          <Button
            variant="text"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            aria-label="Quay lại danh sách bài viết"
          >
            Quay lại
          </Button>
          <Typography variant="h4" fontWeight="bold" ml={2}>
            Chi Tiết Bài Viết
          </Typography>
        </Box>

        {/* Blog Content */}
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, mb: 3 }} aria-labelledby="blog-title">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography id="blog-title" variant="h5" fontWeight="bold">
              {blog?.title}
            </Typography>
            <Chip
              label={blog?.status === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
              color={blog?.status === "ACTIVE" ? "success" : "default"}
              size="small"
            />
          </Box>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Ngày tạo: {new Date(blog?.createdAt).toLocaleString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              src={blog?.author?.userAvatar}
              alt={blog?.author?.userName}
              sx={{ mr: 2, width: 48, height: 48 }}
              onError={(e) => (e.target.src = "/fallback-avatar.png")} // Fallback image
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {blog?.author?.userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {blog?.author?.email}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            {blog?.content}
          </Typography>
        </Paper>

        {/* Comments Section */}
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }} aria-labelledby="comments-title">
          <Typography id="comments-title" variant="h6" fontWeight="bold" mb={2}>
            Bình Luận ({blog?.comments?.length})
          </Typography>
          <Box mb={3}>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleAddComment}
              placeholder="Viết bình luận của bạn..."
              variant="outlined"
              inputProps={{ maxLength: 500 }}
              aria-label="Nhập bình luận"
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<Send />}
              onClick={handleAddComment}
              sx={{ mt: 2 }}
              aria-label="Gửi bình luận"
            >
              Gửi
            </Button>
          </Box>
          <Divider sx={{ mb: 3 }} />
          {blog?.comments.map((comment) => (
            <Box key={comment?.id} mb={3} sx={{ display: "flex", gap: 2 }} role="article">
              <Avatar
                src={comment?.author?.userAvatar}
                alt={comment?.author?.userName}
                sx={{ width: 40, height: 40 }}
                onError={(e) => (e.target.src = "/fallback-avatar.png")} // Fallback image
              />
              <Box flexGrow={1}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {comment?.author?.userName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment?.createdAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
                <Typography variant="body2">{comment?.content}</Typography>
              </Box>
            </Box>
          ))}
          {blog?.comments?.length === 0 && (
            <Typography color="text.secondary" align="center">
              Chưa có bình luận nào.
            </Typography>
          )}
        </Paper>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

export default BlogDetail;