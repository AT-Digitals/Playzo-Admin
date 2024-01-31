import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography, Stack } from '@mui/material';

export default function DropDownComponent({ label, options, value, onChange }) {
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
      </FormControl>
    </Stack>
  );
}
