import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import StartTimeComponent from './StartTimeComponent';
import EndTimeComponent from './EndTimeComponent';
import { Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function TimeSlotModal({ onChange, onSelect, error, error1, isOpen, onClose, shouldDisableTime }) {
  return (
    <div>
      <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="row" spacing={2}>
            <StartTimeComponent onChange={onChange} error={error} shouldDisableTime={shouldDisableTime} />
            <EndTimeComponent onChange={onSelect} error={error1} />
          </Stack>
          <Button variant="outlined" onClick={onClose} sx={{ width: '100%', marginTop: '30px' }}>
            Book Slots
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
