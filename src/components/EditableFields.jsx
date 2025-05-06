import { useState } from 'react';
import { Typography, TextField, IconButton, Box, Button, Stack } from '@mui/material';
import { Check, Edit, X } from '@mui/icons-material';
import { XOutlined } from '@ant-design/icons';

export default function EditableFields({ person, field, phone, update, label }) {
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const updateField = (obj, fieldPath, newValue) => {
    const keys = fieldPath.split('.');
    let temp = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!temp[keys[i]]) return false; // Tránh lỗi nếu field không tồn tại
      temp = temp[keys[i]];
    }

    temp[keys[keys.length - 1]] = newValue;
    console.log(obj);

    return true;
  };
  const [tempPhone, setTempPhone] = useState(phone);

  const handleEditPhone = () => {
    setTempPhone(phone);
    setIsEditingPhone(true);
  };

  const handleSavePhone = () => {
    console.log(tempPhone);

    updateField(person, field, tempPhone);
    setIsEditingPhone(false);
  };

  const handleCancelPhone = () => {
    setIsEditingPhone(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        py: 2,
        borderBottom: '1px solid #e7e7e7'
      }}
    >
      <Stack>
        <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
          {label}
        </Typography>
        {!isEditingPhone ? (
          <Typography variant="h6">{phone}</Typography>
        ) : (
          <TextField fullWidth variant="outlined" value={tempPhone} onChange={(e) => setTempPhone(e.target.value)} autoFocus />
        )}
      </Stack>
      {!isEditingPhone ? (
        <Button color="secondary" sx={{ textTransform: 'none' }} onClick={handleEditPhone}>
          Chỉnh sửa
        </Button>
      ) : (
        <div>
          <IconButton onClick={handleSavePhone} color="success">
            <Check size={20} />
          </IconButton>
          <IconButton onClick={handleCancelPhone} color="error">
            <XOutlined size={20} />
          </IconButton>
        </div>
      )}
    </Box>
  );
}
