import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography, Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { minDate } from 'class-validator';
import dayjs from 'dayjs';

export default function BasicDatePicker({ date, setDate, error, label, disablePast, shouldDisableDate, disableprop }) {
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
          disabled={disableprop}
          slotProps={{
            textField: {
              helperText: error ? 'Please select a date' : ''
            }
          }}
          sx={{
            '.css-1phpx1i-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d9d9d9'
            }
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
