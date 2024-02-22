import * as React from 'react';

import { Stack, Typography } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function TypeDropdown({ type, onChange, label, error }) {
  return (
    <Stack sx={{ minWidth: 200 }} spacing={2}>
      <Typography>{label}</Typography>
      <FormControl fullWidth>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={onChange}>
          <MenuItem value="turf">Turf</MenuItem>
          <MenuItem value="boardGame">Board Game</MenuItem>
          <MenuItem value="playstation">Play Station</MenuItem>
          <MenuItem value="cricketNet">Cricket Net</MenuItem>
          <MenuItem value="bowlingMachine">Bowling Machine</MenuItem>
          <MenuItem value="badminton">Badminton</MenuItem>
        </Select>
        {error ? <FormHelperText error>Please select a service</FormHelperText> : <></>}
      </FormControl>
    </Stack>
  );
}
