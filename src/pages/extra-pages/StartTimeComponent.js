import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import { Typography, Stack } from '@mui/material';

export default function StartTimeComponent({ onChange, error, shouldDisableTime }) {
  //console.log('disable', disabledTimes);

  // const formatMillisecondsToTime = (ms) => {
  //   if (ms === null) {
  //     return ''; // Handle the case where endTime is null
  //   }
  //   const formattedHTime = moment(ms).format('hh');
  //   const formattedMTime = moment(ms).format('mm');

  //   return { hour: formattedHTime, min: formattedMTime };
  // };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="column" spacing={2} sx={{ width: '120px' }}>
        <Typography variant="h6" fontSize="20px">
          Start Time
        </Typography>
        <DigitalClock
          onChange={onChange}
          slotProps={{
            textField: {
              helperText: error ? 'Please select a start time' : ''
            }
          }}
          shouldDisableTime={shouldDisableTime}
        />
      </Stack>
    </LocalizationProvider>
  );
}

// const isTimeDisabled = (timeValue) => {
//   // Add your logic here to determine if the time should be disabled
//   // For example, you can disable times after 5:00 PM
//   const maxTime = new Date();
//   maxTime.setHours(17, 0, 0); // 5:00 PM

//   return timeValue > maxTime;
// };

// shouldDisableTime={isTimeDisabled}
