import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonComponent({ value, setValue }) {
  return (
    <ToggleButtonGroup color="primary" value={value} exclusive onChange={setValue} sx={{ height: '50px' }}>
      <ToggleButton value="1month">1 Month</ToggleButton>
      <ToggleButton value="2month">3 Month</ToggleButton>
      <ToggleButton value="3month">6 Month</ToggleButton>
    </ToggleButtonGroup>
  );
}
