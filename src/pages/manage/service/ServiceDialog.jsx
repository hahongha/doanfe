import { Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

const statusOptions = [
  { value: 'active', label: 'Hoạt động', color: 'primary' }, // Xanh dương
  { value: 'paused', label: 'Tạm dừng', color: 'warning' }, // Cam
  { value: 'disabled', label: 'Ngừng cung cấp', color: 'error' } // Đỏ
];
function ServiceDialog({ open, onClose, service }) {
  const [selectedService, setSelectedService] = useState(service);
  const handleSave = () => {
    // setSelectedService((prev) => prev.map((s) => (s.id === selectedService.id ? selectedService : s)));
    console.log(selectedService);

    // setOpen(false);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chỉnh sửa dịch vụ</DialogTitle>
      {selectedService && (
        <DialogContent>
          <TextField
            label="Tên dịch vụ"
            fullWidth
            margin="dense"
            value={selectedService.serviceName}
            onChange={(e) => setSelectedService({ ...selectedService, serviceName: e.target.value })}
          />
          <Select
            label="Trạng thái"
            fullWidth
            value={selectedService.status}
            onChange={(e) => setSelectedService({ ...selectedService, status: e.target.value })}
            margin="dense"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Giá trị (VNĐ)"
            type="number"
            fullWidth
            margin="dense"
            value={selectedService.value}
            onChange={(e) => setSelectedService({ ...selectedService, value: e.target.value })}
          />
          <Checkbox
            checked={selectedService.isDefault}
            onChange={(e) => setSelectedService({ ...selectedService, isDefault: e.target.checked })}
          />
          Dịch vụ bắt buộc
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ServiceDialog;