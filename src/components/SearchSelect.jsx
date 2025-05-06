import React from 'react';
import { TextField, InputAdornment, IconButton, MenuItem, ListItemText } from '@mui/material';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';

const SearchSelect = ({ keyword, onChange, allData, name, label }) => {
  return (
    <TextField
    select
    id= {name}
    name={name}
    fullWidth
    label={label}
    style={{ maxWidth: '300' }}
    value={keyword || ''}
    onChange={onChange}
  >
    {Object.entries(allData).map(([value, { label, icon }]) => (
        <MenuItem key={value} value={value} sx={{display:"flex"}} icon={icon}>
          <ListItemText primary={label} />
        </MenuItem>
    ))}
  </TextField>
  );
};

export default SearchSelect;
