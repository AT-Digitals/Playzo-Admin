import { TextField } from '@mui/material';
import { Stack, Typography } from '@mui/material';

export default function CustomTextField({ label, value, setValue, error, type }) {
  return (
    <Stack direction="column" spacing={2}>
      <Typography>{label}</Typography>
      <TextField
        value={value}
        onChange={setValue}
        error={!!error}
        type={type}
        helperText={error === true ? 'Please Enter a valid Amount' : error}
      />
    </Stack>
  );
}
