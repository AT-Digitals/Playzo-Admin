import dayjs from 'dayjs';
import moment from 'moment';
import MainCard from 'components/MainCard';
import CustomDatePicker from './CustomDatePicker';
import { Stack, Button, Typography } from '@mui/material';
import { useState } from 'react';

import StartTimeComponent from './StartTimeComponent';
import EndTimeComponent from './EndTimeComponent';

//import Typography from 'themes/overrides/Typography';

export default function TimeSlotComponet() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState(dayjs(new Date()));
  console.log(startTime);
  const [endTime, setEndTime] = useState(dayjs(new Date()));
  const [submit, setSubmit] = useState([]);

  const [dateError, setDateError] = useState(false);
  // const [timeError, setTimeError] = useState(false);
  // const [endError, setEndError] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dateHandler = (newValue) => {
    let datedata = newValue.$d;
    const parsedDate = moment(datedata);
    const formattedDate = parsedDate.format('MMM DD YYYY');
    setDate(formattedDate);
    setDateError(false);
    setDuplicateError(false);
  };

  const startTimeHandler = (newValue) => {
    const start = newValue.$d;
    const startwithTime = moment(start);
    const formattedSTime = startwithTime.format(' hh:mm:ss a');
    console.log(formattedSTime);

    setStartTime(formattedSTime);
    // setTimeError(false);  start={startTime} setStart={startTimeHandler}
    setDuplicateError(false);
  };

  const endTimeHandler = (newValue) => {
    const end = newValue.$d;
    const endwithTime = moment(end);
    const formattedETime = endwithTime.format(' hh:mm:ss a');
    console.log(formattedETime);
    // if (endTime >= formattedETime) {
    setEndTime(formattedETime);
    //setEndError(false);
    setDuplicateError(false);
  };

  const checkForOverlap = (newStart, newEnd) => {
    // Check for overlaps with existing ranges
    const overlap = submit.some(
      (value) =>
        (newStart >= value.start && newStart <= value.end) ||
        (newEnd >= value.start && newEnd <= value.end) ||
        (newStart <= value.start && newEnd >= value.end)
    );

    return overlap;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!date) {
      setDateError(true);
    }

    if (!startTime) {
      //setTimeError(true);
    }
    if (!endTime) {
      setEndError(true);
    }

    if (date && startTime && endTime) {
      const newStart = startTime;
      const newEnd = endTime;
      const overlap = checkForOverlap(newStart, newEnd);

      if (overlap) {
        setDuplicateError(true);
      } else {
        const data = {
          date: date,
          start: startTime,
          end: endTime
        };
        console.log(data);
        setSubmit([...submit, data]);

        // const isDuplicate = submit.some((value) => value.date === data.date && value.start === data.start && value.end === data.end);

        // if (isDuplicate) {
        //   setDuplicateError(true);
        // } else {
        //   setSubmit([...submit, data]);
        // }
        setDate('');
        setStartTime('');
        setEndTime('');
      }
    }
  };

  return (
    <MainCard title="Date Validation">
      <form onSubmit={onSubmit}>
        <Stack direction="row" spacing={2}>
          <CustomDatePicker date={date} setDate={dateHandler} error={dateError} duplicateError={duplicateError} isSubmitted={isSubmitted} />
          <StartTimeComponent start={startTime} setStart={startTimeHandler} />
          <EndTimeComponent end={endTime} setEnd={endTimeHandler} />
          <Button variant="outlined" type="submit" sx={{ height: '50px', marginTop: '35px !important' }}>
            Confirm
          </Button>
        </Stack>
      </form>
      <Typography variant="h3" marginY={3}>
        Booked Slots
      </Typography>
      {submit.map((value, index) => (
        <Stack direction="row" spacing={2} key={index} marginY={3}>
          <Typography>{value.date}</Typography>
          <Typography>{value.start}</Typography>
          <Typography>{value.end}</Typography>
        </Stack>
      ))}
    </MainCard>
  );
}
