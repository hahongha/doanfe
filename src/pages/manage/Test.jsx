const InfoRow = ({ label, value, name, editMode = false, onChange, type = 'text', options = [] }) => {
  const formatDateDisplay = (val) => {
    if (!val) return "--/--/----";
    const date = new Date(val);
    return date.toLocaleDateString('vi-VN'); // dd/MM/yyyy
  };
  const renderInput = () => {
    switch (type) {
      case 'date':
        return (
          <TextField
            fullWidth
            name={name}
            type="date"
            value={value ? value.slice(0, 10) : ''} // format to yyyy-MM-dd
            onChange={onChange}
            size="small"
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        );
      case 'select':
        return (
          <Select
            fullWidth
            name={name}
            value={value}
            onChange={onChange}
            size="small"
            variant="standard"
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        );
      case 'textarea':
        return (
          <TextField
            fullWidth
            name={name}
            value={value || ''}
            onChange={onChange}
            size="small"
            variant="standard"
            multiline
            rows={3}
          />
        );
      case 'boolean':
        return (
          <Switch
            checked={Boolean(value)}
            onChange={(e) =>
              onChange({ target: { name, value: e.target.checked } })
            }
          />
        );
      default:
        return (
          <TextField
            fullWidth
            name={name}
            value={value || ''}
            onChange={onChange}
            size="small"
            variant="standard"
          />
        );
    }
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

        {editMode ? renderInput() : (
                  type === 'date'
                    ? <Typography>{formatDateDisplay(value)}</Typography>
                    : (typeof value === 'string' || typeof value === 'number'
                        ? <Typography>{value}</Typography>
                        : value)
                )}
      </Box>
    </Stack>
  );
};

// const InfoRow = ({ label, value, name, editMode = false, onChange }) => (
//   <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
//     <Typography sx={{ width: { md: 200, xs: '100%' }, fontWeight: 600, color: '#555' }}>{label}</Typography>
//     <Box
//       sx={{
//         flex: 1,
//         backgroundColor: '#f9f9f9',
//         border: '1px solid #ddd',
//         borderRadius: 1,
//         minHeight: 38,
//         display: 'flex',
//         alignItems: 'center',
//         px: 2,
//       }}
//     >
//       {editMode && (typeof value === 'string' || typeof value === 'number') ? (
//         <TextField
//           fullWidth
//           name={name}
//           value={value || ''}
//           onChange={onChange}
//           size="small"
//           variant="standard"
//         />
//       ) : (
//         typeof value === 'string' || typeof value === 'number' ? <Typography>{value}</Typography> : value
//       )}
//     </Box>
//   </Stack>
// );