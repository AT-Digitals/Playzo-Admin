import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Stack, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';

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

export default function BookingModal({ onChange, value, isOpen, onClose, onSubmit }) {
  return (
    <div>
      <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="row" justifyContent="end">
            <CloseIcon onClick={onClose} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <FormControl>
              <Typography variant="h4" marginY={2}>
                Payment Method
              </Typography>
              <RadioGroup row value={value} onChange={onChange}>
                <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                <FormControlLabel value="online" control={<Radio />} label="Online" />
              </RadioGroup>
            </FormControl>
          </Stack>
          <Button variant="outlined" onClick={onSubmit} sx={{ width: '100%', marginTop: '30px' }}>
            Next
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
