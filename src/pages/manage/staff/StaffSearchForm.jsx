import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const StaffSearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    fullName: '',
    phone: '',
    address: '', // Thêm trường địa chỉ
    startDateFrom: null,
    startDateTo: null,
    endDateFrom: null,
    endDateTo: null,
    position:'',
    status:'WORKING',
  });
  const statusOptions = ['WORKING', 'RESIGNED', 'PROBATION', 'SUSPENDED'];

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = (e) =>{
    setFilters({
        fullName: '',
        phone: '',
        address: '', // Thêm trường địa chỉ
        startDateFrom: null,
        startDateTo: null,
        endDateFrom: null,
        endDateTo: null,
        position:'',
        status:'WORKING',
    });
    onSearch({
        fullName: '',
        phone: '',
        address: '', // Thêm trường địa chỉ
        startDateFrom: null,
        startDateTo: null,
        endDateFrom: null,
        endDateTo: null,
        position:'',
        status:'WORKING',
    });
  }

  return (
    <Grid container spacing={2} marginBottom={3}>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Tên"
          fullWidth
          name="fullName"
          value={filters.fullName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Số điện thoại"
          fullWidth
          name="phone"
          value={filters.phone}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Địa chỉ"
          fullWidth
          name="address" // Trường địa chỉ
          value={filters.address}
          onChange={handleChange}
        />
      </Grid>

        <Grid item xs={12} sm={4}>
        <TextField
          label="Chức vụ"
          fullWidth
          name="position"
          value={filters.position}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          label="Ngày bắt đầu từ"
          type="date"
          fullWidth
          name="startDateFrom"
          value={filters.startDateFrom}
          onChange={handleChange}
          InputLabelProps={{
                shrink: true, // Đảm bảo label luôn hiển thị phía trên
            }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Ngày bắt đầu đến"
          type="date"
          fullWidth
          name="startDateTo"
          value={filters.startDateTo}
          onChange={handleChange}
          InputLabelProps={{
                shrink: true, // Đảm bảo label luôn hiển thị phía trên
            }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Ngày kết thúc từ"
          type="date"
          fullWidth
          name="endDateFrom"
          value={filters.endDateFrom}
          onChange={handleChange}
          InputLabelProps={{
                shrink: true, // Đảm bảo label luôn hiển thị phía trên
            }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Ngày kết thúc đến"
          type="date"
          fullWidth
          name="endDateTo"
          value={filters.endDateTo}
          onChange={handleChange}
          InputLabelProps={{
                shrink: true, // Đảm bảo label luôn hiển thị phía trên
            }}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
  <TextField
    fullWidth
    select
    label="Trạng thái"
    value={filters.status || "WORKING"}
    onChange={(e) => handleChange('status', e.target.value)}
  >
    {statusOptions.map((status) => (
      <MenuItem key={status} value={status}>
        {status}
      </MenuItem>
    ))}
  </TextField>
</Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{marginRight:2}}>
          Tìm kiếm
        </Button>
        <Button variant="contained" color="primary" onClick={handleReset}>
          Reset
        </Button>
      </Grid>
    </Grid>
  );
};

export default StaffSearchForm;
