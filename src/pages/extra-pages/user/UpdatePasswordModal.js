import * as React from 'react';

import { Grid, IconButton, Stack, Typography } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

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
  error1,
  handleClickShowPassword,
  showPassword,
  handleClickShowConfirmPassword,
  showConfirmPassword
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
                <Stack direction="column" spacing={2}>
                  <Typography>Password</Typography>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    error={error}
                    helpertext={error === true ? 'Please Enter a Valid Password' : ''}
                    value={password}
                    onChange={setPassword}
                  />
                </Stack>
              </Grid>
              <Grid item md={12} mb={2}>
                <Stack direction="column" spacing={2}>
                  <Typography>Confirm Password</Typography>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmPassword} edge="end">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    error={error1}
                    helpertext={error === true ? 'Please Enter a Valid Confirm Password' : ''}
                    value={confirmPassword}
                    onChange={setConfirm}
                  />
                </Stack>
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
