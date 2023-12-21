import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography, Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function BasicDatePicker({ date, setDate, error }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h6" fontSize="20px">
          Date
        </Typography>
        <DatePicker
          value={date}
          onChange={(newValue) => setDate(newValue)}
          disablePast
          required
          slotProps={{
            textField: {
              helperText: error ? 'Please select a date' : ''
            }
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}