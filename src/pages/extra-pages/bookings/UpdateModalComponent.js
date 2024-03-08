import * as React from 'react';

import { IconButton, Stack, Typography } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import CustomTextField from './bookingComponents/CustomTextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export default function BookingModal({
  onChange,
  value,
  isOpen,
  onClose,
  onSubmit,
  label,
  error,
  refund,
  handleRefundChange,
  Upichecked,
  handleUPIChange,
  Cashchecked,
  handleCashChange,
  handleUpiAmountChange,
  UpiAmount,
  label1,
  showUpi,
  showCash,
  UpiError
}) {
  return (
    <div>
      <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="row" justifyContent="space-between" mb={3}>
            <Typography variant="h3">Update Amount</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack direction="column" spacing={3}>
            <Stack direction="column" spacing={2}>
              <Typography>Select Payment Type</Typography>
              <Stack direction="row" spacing={3}>
                <Stack direction="column" spacing={2}>
                  <FormControlLabel control={<Checkbox checked={Cashchecked} onChange={handleCashChange} />} label="Cash" />
                  {showCash && (
                    <CustomTextField
                      label={label}
                      value={value}
                      setValue={onChange}
                      error={error}
                      type="number"
                      errorText="please Enter a Cash Amount"
                    />
                  )}
                </Stack>
                <Stack direction="column" spacing={2}>
                  <FormControlLabel control={<Checkbox checked={Upichecked} onChange={handleUPIChange} />} label="UPI" />
                  {showUpi && (
                    <CustomTextField
                      label={label1}
                      value={UpiAmount}
                      setValue={handleUpiAmountChange}
                      error={UpiError}
                      type="number"
                      errorText="please Enter a UPI Amount"
                    />
                  )}
                </Stack>
              </Stack>
            </Stack>

            <FormGroup>
              <FormControlLabel control={<Checkbox checked={refund} onChange={handleRefundChange} />} label="Refund" />
            </FormGroup>
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
