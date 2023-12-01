import * as React from 'react';
//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography, Stack } from '@mui/material';

export default function BasicDatePicker({ date, setDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['DatePicker']}> */}
      <Stack direction="column" spacing={2}>
        <Typography variant="h6" fontSize="20px">
          Date
        </Typography>
        <DatePicker value={date} onChange={(newValue) => setDate(newValue)} disablePast />
      </Stack>

      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
}
