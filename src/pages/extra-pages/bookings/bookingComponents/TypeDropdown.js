import * as React from 'react';

import { Stack, Typography } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function TypeDropdown({ type, onChange, label, error, Options, disabled }) {
  return (
    <Stack sx={{ minWidth: 200 }} spacing={2}>
      <Typography>{label}</Typography>
      <FormControl fullWidth>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={onChange} disabled={disabled}>
          {Options.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {error ? <FormHelperText error>Please select a service</FormHelperText> : <></>}
      </FormControl>
    </Stack>
  );
}
