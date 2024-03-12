import * as React from 'react';

import { IconButton, Stack, Typography } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CustomTextField from './bookingComponents/CustomTextField';
import Modal from '@mui/material/Modal';

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

export default function BookingModal({ onChange, value, isOpen, onClose, onSubmit, label, value1, setValue, error, show }) {
  return (
    <div>
      <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" marginY={2}>
              Bookings
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack direction="column" spacing={3}>
            <CustomTextField
              label={label}
              value={value1 ?? ''}
              setValue={setValue}
              error={error}
              type="number"
              errorText="please Enter a valid Amount"
            />
            <Button variant="outlined" onClick={onSubmit} sx={{ width: '100%' }}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
