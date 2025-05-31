import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid
} from "@mui/material";

const EditBillDialog = ({ open, onClose, billData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (billData) {
      setFormData({ ...billData });
    }
  }, [billData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Dữ liệu đã chỉnh sửa:", formData);
    onClose(); // Đóng dialog sau khi lưu
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chỉnh sửa hóa đơn</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* ID - chỉ xem */}
          <Grid item xs={6}>
            <TextField fullWidth label="Mã hóa đơn" value={formData.id || ""} InputProps={{ readOnly: true }} />
          </Grid>

          {/* Ngày tạo - chỉ xem */}
          <Grid item xs={6}>
            <TextField fullWidth label="Ngày tạo" value={formData.create_at || ""} InputProps={{ readOnly: true }} />
          </Grid>

          {/* Ngày cập nhật - chỉ xem */}
          <Grid item xs={6}>
            <TextField fullWidth label="Ngày cập nhật" value={formData.update_at || ""} InputProps={{ readOnly: true }} />
          </Grid>

          {/* Ngày đến hạn - cho phép chỉnh */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Ngày đến hạn"
              type="date"
              value={formData.due_date || ""}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange("due_date", e.target.value)}
            />
          </Grid>

          {/* Ngày thanh toán - cho chỉnh nếu muốn */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Ngày thanh toán"
              type="date"
              value={formData.payment_date || ""}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange("payment_date", e.target.value)}
            />
          </Grid>

          {/* Trạng thái - chỉ xem */}
          <Grid item xs={6}>
            <TextField fullWidth label="Trạng thái" value={formData.status || ""} InputProps={{ readOnly: true }} />
          </Grid>

          {/* Tổng tiền - chỉnh nếu cần */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tổng tiền (VND)"
              type="number"
              value={formData.total_amount || 0}
              onChange={(e) => handleChange("total_amount", parseFloat(e.target.value))}
            />
          </Grid>

          {/* Giá trị sau giảm - chỉnh nếu cần */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Giá trị thực tế (value)"
              type="number"
              value={formData.value || 0}
              onChange={(e) => handleChange("value", parseFloat(e.target.value))}
            />
          </Grid>

          {/* ID phòng - chỉ xem */}
          <Grid item xs={6}>
            <TextField fullWidth label="Mã phòng" value={formData.room_id || ""} InputProps={{ readOnly: true }} />
          </Grid>

          {/* Người thuê - chỉ xem */}
          <Grid item xs={6}>
            <TextField fullWidth label="Người thuê" value={formData.renter_id || ""} InputProps={{ readOnly: true }} />
          </Grid>

          {/* Tên hóa đơn - có thể sửa */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tên hóa đơn"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Grid>

          {/* Chiết khấu - chỉnh được */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Chiết khấu (VND)"
              type="number"
              value={formData.discount || 0}
              onChange={(e) => handleChange("discount", parseFloat(e.target.value))}
            />
          </Grid>

          {/* Số tiền đã trả - chỉ xem */}
          <Grid item xs={6}>
            <TextField fullWidth label="Đã thanh toán (paid)" value={formData.paid || 0} InputProps={{ readOnly: true }} />
          </Grid>

          {/* Ghi chú - chỉnh được */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Ghi chú"
              value={formData.note || ""}
              onChange={(e) => handleChange("note", e.target.value)}
            />
          </Grid>

          {/* Quá hạn - chỉ xem */}
          <Grid item xs={6}>
            <TextField fullWidth label="Trạng thái quá hạn" value={formData.overdue_status || ""} InputProps={{ readOnly: true }} />
          </Grid>

          {/* Loại hóa đơn: Thu hoặc Chi */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label="Loại hóa đơn"
              value={formData.is_income ? true : false}
              onChange={(e) => handleChange("is_income", e.target.value === "true")}
            >
              <MenuItem value="true">Thu</MenuItem>
              <MenuItem value="false">Chi</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSave} color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBillDialog;
