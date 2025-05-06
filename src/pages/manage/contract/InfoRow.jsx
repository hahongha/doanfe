import React from 'react';
import { Box, Stack, Typography, TextField, MenuItem } from '@mui/material';

const InfoRow = ({
  label,
  name,
  value,
  editMode = false,
  onChange,
  type = 'text',
  options = {}
}) => {
  // Format ngày
  const formatDate = (dateString) => {
    if (!dateString) return '--/--/----';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const formatCurrency = (amount) => {
    if (!amount) return "0 VNĐ";
    return new Intl.NumberFormat('vi-VN').format(amount) + " VNĐ";
  };

  // Xử lý hiển thị giá trị khi không ở chế độ chỉnh sửa
  const getDisplayValue = () => {
    if (type === 'boolean') return value ? 'Có' : 'Không';
    if (type === 'date') return formatDate(value);
    if (type === 'select') return options?.[value] || value;
    return value;
  };

  // Xử lý component input khi ở editMode
  const renderInput = () => {
    if (type === 'select') {
      return (
        <TextField
          select
          fullWidth
          name={name}
          value={value || ''}
          onChange={onChange}
          size="small"
          variant="standard"
        >
          {Object.entries(options).map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      );
    }

    if (type === 'boolean') {
      return (
        <TextField
          select
          fullWidth
          name={name}
          value={value ? 'true' : 'false'}
          onChange={(e) =>
            onChange({
              target: {
                name,
                value: e.target.value === 'true'
              }
            })
          }
          size="small"
          variant="standard"
        >
          <MenuItem value="true">Có</MenuItem>
          <MenuItem value="false">Không</MenuItem>
        </TextField>
      );
    }

    return (
      <TextField
        fullWidth
        name={name}
        type={type}
        value={value || ''}
        onChange={onChange}
        size="small"
        variant="standard"
        InputLabelProps={type === 'date' ? { shrink: true } : {}}
      />
    );
  };

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
      <Typography sx={{ width: { md: 200, xs: '100%' }, fontWeight: 600, color: '#555' }}>
        {label}
      </Typography>

      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f9f9f9',
          border: '1px solid #ddd',
          borderRadius: 1,
          minHeight: 38,
          display: 'flex',
          alignItems: 'center',
          px: 2,
        }}
      >
        {editMode ? renderInput() : <Typography>{getDisplayValue()}</Typography>}
      </Box>
    </Stack>
  );
};

export default InfoRow;
