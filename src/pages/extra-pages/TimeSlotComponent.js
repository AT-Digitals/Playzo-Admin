import MainCard from 'components/MainCard';
import CustomDatePicker from './CustomDatePicker';
import CustomTimePicker from './CustomTimePicker';
import { Stack, Button, Typography } from '@mui/material';
import { useState } from 'react';
import moment from 'moment';
//import Typography from 'themes/overrides/Typography';

export default function TimeSlotComponet() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const dateHandler = (newValue) => {
    let datedata = newValue.$d;
    const parsedDate = moment(datedata);
    const formattedDate = parsedDate.format('MMM DD YYYY');
    setDate(formattedDate);
  };

  const startTimeHandler = (newValue) => {
    const start = newValue.$d;
    const startwithTime = moment(start);
    const formattedSTime = startwithTime.format(' hh:mm:ss a');
    setStartTime(formattedSTime);
  };

  const endTimeHandler = (newValue) => {
    const end = newValue.$d;
    const endwithTime = moment(end);
    const formattedETime = endwithTime.format(' hh:mm:ss a');
    setEndTime(formattedETime);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const data = {
      date: date,
      start: startTime,
      end: endTime
    };
    console.log(data);
    setDate('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <MainCard title="Date Validation">
      <Stack direction="row" spacing={2}>
        <CustomDatePicker date={date} setDate={dateHandler} />
        <CustomTimePicker label="Start Time Slot" startTime={startTime} setStartTime={startTimeHandler} />
        <CustomTimePicker label="End Time Slot" startTime={endTime} setStartTime={endTimeHandler} />
        <Button variant="outlined" onClick={onSubmit}>
          Confirm
        </Button>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography>{date}</Typography>
        <Typography>{startTime}</Typography>
        <Typography>{endTime}</Typography>
      </Stack>
    </MainCard>
  );
}
