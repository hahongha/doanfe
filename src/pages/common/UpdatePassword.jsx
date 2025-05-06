import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { useDispatch } from "react-redux";
import { updatePasswordRequest } from "redux/actions/userAction"; // Giả sử bạn có action này

const UpdatePassword = ({ userId, open, onClose, userName }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null); // Sửa lỗi ở đây
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // Kiểm tra xem confirmPassword có giống newPassword không
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và mật khẩu xác nhận không trùng khớp.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    // Tạo payload và dispatch action
    const data = {
      userId, // Truyền userId từ bên ngoài vào
      oldPassword,
      newPassword,
      confirmPassword,
    };

    dispatch(updatePasswordRequest(data)); // Gọi action để xử lý thay đổi mật khẩu
  };

  return (
    <Dialog open = {open} onClose={onClose}>
      <DialogTitle variant="h3">Cập nhật mật khẩu {userName}</DialogTitle>
      <DialogContent>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Mật khẩu cũ"
            type="password"
            fullWidth
            variant="outlined"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Mật khẩu mới"
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Xác nhận mật khẩu mới"
            type="password"
            fullWidth
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Grid>
      </Grid>
      </DialogContent>
      <DialogActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Cập nhật mật khẩu
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onClose}
          >
            Đóng
          </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePassword;