import { TextField } from '@mui/material';
import { Stack, Typography } from '@mui/material';

export default function CustomTextField({ label, value, setValue }) {
  return (
    <Stack direction="column" spacing={3}>
      <Typography>{label}</Typography>
      <TextField value={value} onChange={() => setValue()} />
    </Stack>
  );
}
