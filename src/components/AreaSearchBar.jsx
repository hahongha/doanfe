import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

// const areaOptions = Array.from({ length: (100 - 15) / 5 + 1 }, (_, i) => 15 + i * 5);
const areaOptions = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

const AreaSearchBar = ({ area, handleArea, label }) => {
  return (
    <Autocomplete
      options={areaOptions}
      renderInput={(params) => <TextField {...params} label={label} />}
      value={area}
      onChange={handleArea}
      style={{ minWidth: 150 }}
    />
  );
};

export default AreaSearchBar;
