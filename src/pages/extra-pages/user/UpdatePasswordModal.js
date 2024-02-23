import * as React from 'react';

import { Grid, IconButton, Stack, Typography } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import CustomTextField from '../bookings/bookingComponents/CustomTextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export default function UpdatePasswordModal({
  onSubmit,
  onClose,
  isOpen,
  password,
  setPassword,
  confirmPassword,
  setConfirm,
  error,
  error1
}) {
  return (
    <>
      <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="row" justifyContent="space-between" mb={3}>
            <Typography variant="h3">Update Password</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack direction="column" spacing={3}>
            <Grid container columnGap={3}>
              <Grid item md={12} mb={2}>
                <CustomTextField
                  label="Password"
                  value={password}
                  setValue={setPassword}
                  error={error}
                  errorText="Please Enter a Valid Password"
                />
              </Grid>
              <Grid item md={12} mb={2}>
                <CustomTextField
                  label="Confirm Password"
                  value={confirmPassword}
                  setValue={setConfirm}
                  error={error1}
                  errorText="Please Enter a Valid Confirm Password"
                />
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={onSubmit} sx={{ width: '100%' }}>
                Update
              </Button>
              <Button variant="outlined" onClick={onClose} sx={{ width: '100%' }}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
