import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography, Stack } from '@mui/material';

export default function TypeDropdown({ type, onChange, label }) {
  return (
    <Stack sx={{ minWidth: 200 }} spacing={3}>
      <Typography>{label}</Typography>
      <FormControl fullWidth>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={onChange}>
          <MenuItem value="turf">Turf</MenuItem>
          <MenuItem value="boardGame">Board Game</MenuItem>
          <MenuItem value="playstation">Play Station</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
