import * as React from 'react';

import { Stack, Typography, IconButton } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import { PaymentType } from '../../../enum/PaymentType';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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

export default function BookingModal({ onChange, value, isOpen, onClose, onSubmit, label, value1, setValue, error, show }) {
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
            <Stack direction="row" spacing={2}>
              <FormControl>
                <Typography variant="h4" marginY={2}>
                  Payment Method
                </Typography>
                <RadioGroup row value={value} onChange={onChange}>
                  <FormControlLabel value={PaymentType.Cash} control={<Radio />} label="Cash" />
                  <FormControlLabel value={PaymentType.Online} control={<Radio />} label="Online" />
                </RadioGroup>
              </FormControl>
            </Stack>
            {show && <CustomTextField label={label} value={value1} onChange={setValue} error={error} />}
            <Button variant="outlined" onClick={onSubmit} sx={{ width: '100%' }}>
              Next
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
