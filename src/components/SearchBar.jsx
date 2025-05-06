import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';

const SearchBar = ({ keyword, onChange }) => {
  const handleClear = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <TextField
      id="search"
      label="Tìm kiếm..."
      variant="outlined"
      style={{ maxWidth: '300' }}
      onChange={onChange}
      value={keyword}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClear}>{keyword ? <ClearOutlined /> : <SearchOutlined />}</IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default SearchBar;
