import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import StartTimeComponent from './StartTimeComponent';
import { Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export default function TimeSlotModal({
  startValue,
  endValue,
  onChange,
  onSelect,
  isOpen,
  onClose,
  shouldDisableTime,
  shouldDisableEndTime
}) {
  return (
    <div>
      <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="row" spacing={2}>
            <StartTimeComponent data={startValue} onChange={onChange} shouldDisableTime={shouldDisableTime} label="Start Time" />
            <StartTimeComponent data={endValue} onChange={onSelect} shouldDisableTime={shouldDisableEndTime} label="End Time" />
          </Stack>
          <Button variant="outlined" onClick={onClose} sx={{ width: '100%', marginTop: '30px' }}>
            Book Slots
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
