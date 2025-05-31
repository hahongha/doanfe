import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import dayjs from 'dayjs';

const TimeRangeSelector = ({ onChange }) => {
  const [selected, setSelected] = useState('thisMonth');

  const handleSelect = (range) => {
    setSelected(range);

    const now = dayjs();
    let start, end;

    if (range === 'thisMonth') {
      start = now.startOf('month');
      end = now.endOf('month');
    } else {
      const lastMonth = now.subtract(1, 'month');
      start = lastMonth.startOf('month');
      end = lastMonth.endOf('month');
    }

    onChange?.({ start: start.toISOString(), end: end.toISOString() });
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant={selected === 'thisMonth' ? 'contained' : 'outlined'}
        onClick={() => handleSelect('thisMonth')}
      >
        Tháng này
      </Button>
      <Button
        variant={selected === 'lastMonth' ? 'contained' : 'outlined'}
        onClick={() => handleSelect('lastMonth')}
      >
        Tháng trước
      </Button>
    </Stack>
  );
};

export default TimeRangeSelector;
