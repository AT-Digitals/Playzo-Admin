import * as React from 'react';
//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { Typography, Stack } from '@mui/material';

export default function TimePickerViewRenderers({ label, startTime, setStartTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h6" fontSize="20px">
          {label}
        </Typography>
        <TimePicker
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock
          }}
          value={startTime}
          onChange={(value) => setStartTime(value)}
          slotProps={{ textField: { placeholder: 'start time' } }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
