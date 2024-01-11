import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography, Stack } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

export default function TypeDropdown({ type, onChange, label, error }) {
  return (
    <Stack sx={{ minWidth: 200 }} spacing={3}>
      <Typography>{label}</Typography>
      <FormControl fullWidth>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={onChange}>
          <MenuItem value="turf">Turf</MenuItem>
          <MenuItem value="boardGame">Board Game</MenuItem>
          <MenuItem value="playstation">Play Station</MenuItem>
          <MenuItem value="cricketNet">Cricket Net</MenuItem>
          <MenuItem value="ballMachine">Ball Machine</MenuItem>
          <MenuItem value="badminton">Badminton</MenuItem>
        </Select>
        {error ? <FormHelperText error>Please select a type</FormHelperText> : <></>}
      </FormControl>
    </Stack>
  );
}
