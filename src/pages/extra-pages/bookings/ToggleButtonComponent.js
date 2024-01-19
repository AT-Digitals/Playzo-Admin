import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonComponent({ value, setValue, disableprop }) {
  return (
    <ToggleButtonGroup color="primary" value={value} exclusive onChange={setValue} sx={{ height: '50px' }} disabled={disableprop}>
      <ToggleButton value="oneMonth">1 Month</ToggleButton>
      <ToggleButton value="threeMonth">3 Month</ToggleButton>
      <ToggleButton value="sixMonth">6 Month</ToggleButton>
      <ToggleButton value="oneYear">1 Year</ToggleButton>
    </ToggleButtonGroup>
  );
}
