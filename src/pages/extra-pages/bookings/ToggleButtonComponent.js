import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography, Stack } from '@mui/material';

export default function ToggleButtonComponent({ value, setValue, disableprop }) {
  return (
    <Stack direction="column" spacing={2}>
      <Typography>Select Month Type</Typography>
      <ToggleButtonGroup color="primary" value={value} exclusive onChange={setValue} sx={{ height: '50px' }} disabled={disableprop}>
        <ToggleButton value="oneMonth">1 Month</ToggleButton>
        <ToggleButton value="threeMonth">3 Month</ToggleButton>
        <ToggleButton value="sixMonth">6 Month</ToggleButton>
        <ToggleButton value="oneYear">1 Year</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
