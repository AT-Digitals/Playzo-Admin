import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonComponent({ value, setValue, disableprop }) {
  return (
    <ToggleButtonGroup color="primary" value={value} exclusive onChange={setValue} sx={{ height: '50px' }} disabled={disableprop}>
      <ToggleButton value="1month">1 Month</ToggleButton>
      <ToggleButton value="3month">3 Month</ToggleButton>
      <ToggleButton value="6month">6 Month</ToggleButton>
      <ToggleButton value="1 Year">1 Year</ToggleButton>
    </ToggleButtonGroup>
  );
}
