import * as React from 'react';

import { IconButton, Stack, Typography } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import CustomTextField from './bookingComponents/CustomTextField';

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

export default function BookingModal({ onChange, value, isOpen, onClose, onSubmit, label, error }) {
  return (
    <div>
      <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="row" justifyContent="end">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack direction="column" spacing={3}>
            <CustomTextField label={label} value={value} setValue={onChange} error={error} type="number" />
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
    </div>
  );
}