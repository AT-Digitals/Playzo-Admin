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
        <Typography>{label}</Typography>
        <DatePicker
          value={date}
          onChange={(newValue) => setDate(newValue)}
          disablePast={disablePast}
          shouldDisableDate={shouldDisableDate}
          disabled={disableprop}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              helperText: error ? 'Please select a valid date' : ''
            }
          }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d9d9d9 !important'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#69c0ff !important'
            },
            '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error.Mui-focused': {
              boxShadow: `0 0 0 2px rgba(24, 144, 255, 0.2) !important`
            }
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
