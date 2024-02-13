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
import { BookingSubTypes } from './BookingSubTypes';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export default function CalendarModalComponent({ onClose, isOpen, data }) {
  if (!data) {
    return;
  }
  const { title, start, end, court, userName, email } = data;

  const startdateTime = new Date(start);
  const startdate = startdateTime.toDateString();
  const starttime = startdateTime.toLocaleTimeString();

  const enddateTime = new Date(end);
  const enddate = enddateTime.toDateString();
  const endtime = enddateTime.toLocaleTimeString();

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

          <Grid container mb={2} padding="30px 0 0">
            <Grid item md={12} mb={3}>
              <Typography variant="h5" fontWeight={600}>
                Booked By
              </Typography>
            </Grid>
            <Grid item md={6} mb={2}>
              <Typography variant="h5" fontWeight={600}>
                User Name
              </Typography>
            </Grid>
            <Grid item md={6} mb={2}>
              <Typography variant="h6">{userName}</Typography>
            </Grid>
            <Grid item md={6} mb={2}>
              <Typography variant="h5" fontWeight={600}>
                Email
              </Typography>
            </Grid>
            <Grid item md={6} mb={2}>
              <Typography variant="h6">{email}</Typography>
            </Grid>
            <Grid item md={6} mb={2}>
              <Typography variant="h5" fontWeight={600}>
                Booking Type
              </Typography>
            </Grid>
            <Grid item md={6} mb={2}>
              <Typography variant="h6">{title}</Typography>
            </Grid>
            <Grid item md={6} mb={2}>
              <Typography variant="h5" fontWeight={600}>
                Sub Type
              </Typography>
            </Grid>
            <Grid item md={6} mb={3}>
              <Typography variant="h6">{BookingSubTypes[title][court]}</Typography>
            </Grid>
            <Grid item md={12}>
              <Typography variant="h5" fontWeight={600}>
                Selected Date and Time
              </Typography>
            </Grid>
            <Grid item md={12}>
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
        </Box>
      </Modal>
    </>
  );
}
