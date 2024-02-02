import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography, Stack } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

export default function DropDownComponent({ label, options, value, onChange, error }) {
  return (
    <Stack direction="column" spacing={2}>
      <Typography>{label}</Typography>
      <FormControl fullWidth>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value} onChange={onChange}>
          {options.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {error ? <FormHelperText error>Please select a Court value</FormHelperText> : <></>}
      </FormControl>
    </Stack>
  );
}
