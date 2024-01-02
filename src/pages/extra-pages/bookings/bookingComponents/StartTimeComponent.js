import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import { Typography, Stack } from '@mui/material';

export default function StartTimeComponent({ onChange, shouldDisableTime, label }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="column" spacing={2} sx={{ width: '120px' }}>
        <Typography variant="h6" fontSize="20px">
          {label}
        </Typography>
        <DigitalClock
          onChange={onChange}
          // slotProps={{
          //   textField: {
          //     helperText: error ? 'Please select time' : ''
          //   }
          // }}
          shouldDisableTime={shouldDisableTime}
        />
      </Stack>
    </LocalizationProvider>
  );
}
