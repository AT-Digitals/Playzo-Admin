import * as React from 'react';

import { Grid, IconButton, Stack, Typography } from '@mui/material';

import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

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

export default function CalendarModalComponent({ onClose, isOpen, data }) {
  if (!data) {
    return;
  }
  const { title, start, end } = data;
  const startdateTime = new Date(start);

  // Extract date and time separately
  const startdate = startdateTime.toDateString(); // Convert date portion to string
  const starttime = startdateTime.toLocaleTimeString(); //

  const enddateTime = new Date(end);

  // Extract date and time separately
  const enddate = enddateTime.toDateString(); // Convert date portion to string
  const endtime = enddateTime.toLocaleTimeString(); //
  return (
    <>
      <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3">Event Details</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack direction="column" spacing={3} pt={4}>
            <Grid container columnGap={3}>
              <Grid item md={12}>
                <Stack direction="column" spacing={3}>
                  <Stack direction="row" spacing={3}>
                    <Typography variant="h5" fontWeight={600}>
                      Booking Type
                    </Typography>
                    <Typography variant="h6">{title}</Typography>
                  </Stack>
                  <Typography variant="h5" fontWeight={600}>
                    Selected Date and Time
                  </Typography>
                </Stack>
                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0
                    },
                    paddingX: 0
                  }}
                >
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h6">{startdate + ' ' + '-' + ' ' + starttime} </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h6">{enddate + ' ' + '-' + ' ' + endtime} </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
