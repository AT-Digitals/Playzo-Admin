import * as React from 'react';

import { Grid, IconButton, Select, Stack, Typography } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CustomTextField from '../extra-pages/bookings/bookingComponents/CustomTextField';
import DropDownComponent from 'pages/extra-pages/DropDownComponent';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
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

export default function UpdateAmountModal({ onSubmit, onClose, isOpen, editedData, setEditedData, data, error }) {
  return (
    <>
      <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="row" justifyContent="end">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack direction="column" spacing={3}>
            <Grid container columnGap={3}>
              <Grid item md={12}>
                <Stack spacing={2}>
                  <Typography>Select Booking Type</Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      disabled
                      value={editedData.bookingType || ''}
                      onChange={(e) => setEditedData({ ...editedData, bookingType: e.target.value })}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="turf">Turf</MenuItem>
                      <MenuItem value="boardGame">Board Game</MenuItem>
                      <MenuItem value="playstation">Play Station</MenuItem>
                      <MenuItem value="cricketNet">Cricket Net</MenuItem>
                      <MenuItem value="bowlingMachine">Bowling Machine</MenuItem>
                      <MenuItem value="badminton">Badminton</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item md={12}>
                <CustomTextField
                  label="Enter Amount"
                  value={editedData.bookingAmount}
                  setValue={(e) => setEditedData({ ...editedData, bookingAmount: e.target.value })}
                  error={error}
                  type="number"
                  errorText="please Enter a valid Amount"
                />
              </Grid>
              <Grid item md={12}>
                <DropDownComponent
                  label="Select Court"
                  value={editedData.court || ''}
                  onChange={(e) => setEditedData({ ...editedData, court: e.target.value })}
                  options={data}
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
