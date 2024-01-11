import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography, Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { minDate } from 'class-validator';
import dayjs from 'dayjs';

export default function BasicDatePicker({ date, setDate, error, label, disablePast, customStyles, shouldDisableDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h6" fontSize="20px">
          {label}
        </Typography>
        <DatePicker
          value={date}
          onChange={(newValue) => setDate(newValue)}
          disablePast={disablePast}
          shouldDisableDate={shouldDisableDate}
          slotProps={{
            textField: {
              helperText: error ? 'Please select a date' : ''
            }
          }}
          sx={customStyles}
        />
      </Stack>
    </LocalizationProvider>
  );
}
