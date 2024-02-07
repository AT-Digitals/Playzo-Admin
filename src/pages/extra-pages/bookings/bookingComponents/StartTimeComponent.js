import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import { Typography, Stack } from '@mui/material';

export default function StartTimeComponent({ data, onChange, shouldDisableTime, label }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="column" spacing={2} sx={{ width: '120px' }}>
        <Typography>{label}</Typography>
        <DigitalClock data={data} onChange={onChange} shouldDisableTime={shouldDisableTime} timeStep={60} />
      </Stack>
    </LocalizationProvider>
  );
}
