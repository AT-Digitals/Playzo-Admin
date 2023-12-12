import { Button, Stack, Typography } from '@mui/material';

import BookingApi from 'api/BookingApi';
import CustomDatePicker from './CustomDatePicker';
import CustomTextField from './CustomTextField';
import MainCard from 'components/MainCard';
import TimeSlotModal from './TimeSlotModal';
import moment from 'moment';
import { useState } from 'react';

export default function TimeSlotComponet() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [submit, setSubmit] = useState([{ date: '2023-12-26', startTime: 1702269000000, endTime: 1702294200000 }]);
  const [dateError, setDateError] = useState(false);
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateHandler = (newValue) => {
    let datedata = newValue.$d;
    const parsedDate = moment(datedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    BookingApi.filterBooking({
      dateOfBooking: '2023-12-12',
      type: 'turf'
    });
    setDate(formattedDate);
    setDateError(false);
    setIsModalOpen(true);
  };

  const handleDialogTimeChange = (newValue) => {
    const start = newValue.$d;
    const startwithTime = moment(start);
    //const formattedSTime = startwithTime.format(' hh:mm:ss a');
    const milliseconds = startwithTime.valueOf();
    setStartTime(milliseconds);
  };

  const handleDialogEndTimeChange = (newValue) => {
    const end = newValue.$d;
    const EndwithTime = moment(end);
    // const formattedETime = EndwithTime.format(' hh:mm:ss a');
    const milliseconds = EndwithTime.valueOf();
    setEndTime(milliseconds);
  };

  const formatMillisecondsToTime = (ms) => {
    if (ms === null) {
      return '';
    }
    const formattedTime = moment(ms).format('hh:mm:ss a');
    return formattedTime;
  };

  const convertTo24HourFormat = (time12h) => {
    const time24h = moment(time12h, 'hh:mm:ss a').format('HH:mm:ss');

    return time24h;
  };

  const convertedStartTime = formatMillisecondsToTime(startTime);
  const convertedEndTime = formatMillisecondsToTime(endTime);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!date) {
      setDateError(true);
    }
    if (!startTime) {
      setStartError(true);
    }
    if (!endTime) {
      setEndError(true);
    }

    if (date && startTime && endTime) {
      const data = {
        date: date,
        startTime: startTime,
        endTime: endTime
      }

      BookingApi.createBooking({
        type: 'boardGame',
        dateOfBooking: date,
        bookingAmount: 20,
        bookingType: 'cash',
        startTime: parseInt(startTime),
        endTime: parseInt(endTime)
      });

      setSubmit([...submit, data]);

      setDate('');
      setStartTime('');
      setEndTime('');
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [initalTime, setInitalTime] = useState('00:00');
  const [initalEnd, setInitalEnd] = useState('00:00');

  const TextFieldChange = (newValue) => {
    setInitalTime(newValue);
    setStartTime(newValue);
  };
  const TextFieldEndChange = (newValue) => {
    setInitalEnd(newValue);
  };

  const shouldDisableTime = (value, view) => {
    const hour = value.hour();
    const minute = value.minute();

    if (submit && Array.isArray(submit)) {
      const matchingItems = submit.filter((item) => item.date === date);

      if (matchingItems.length > 0) {
        return matchingItems.some((item) => {
          const value1 = formatMillisecondsToTime(item.startTime);
          const value2 = formatMillisecondsToTime(item.endTime);
          const time = convertTo24HourFormat(value1);
          const time2 = convertTo24HourFormat(value2);
          const startHour = parseInt(time.split(':')[0], 10);
          const startMinute = parseInt(time.split(':')[1], 10);
          const endHour = parseInt(time2.split(':')[0], 10);
          const endMinute = parseInt(time2.split(':')[1], 10);

          if (view === 'hours' || view === 'minutes') {
            return (
              (hour === startHour && minute >= startMinute) ||
              (hour > startHour && hour < endHour) ||
              (hour === endHour && minute < endMinute)
            );
          }

          return false;
        });
      }
    }

    return false;
  };

  return (
    <MainCard title="Date Validation">
      <form onSubmit={onSubmit}>
        <Stack direction="row" spacing={2} alignItems="center">
          <CustomDatePicker date={date} setDate={dateHandler} error={dateError} />
          <CustomTextField label="Start Time" value={!startTime ? initalTime : convertedStartTime} setValue={TextFieldChange} />
          <CustomTextField label="End Time" value={!endTime ? initalEnd : convertedEndTime} setValue={TextFieldEndChange} />
          <TimeSlotModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onChange={handleDialogTimeChange}
            onSelect={handleDialogEndTimeChange}
            error={startError}
            error1={endError}
            shouldDisableTime={shouldDisableTime}
            shouldDisableEndTime={shouldDisableTime}
          />
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
          <Typography>{formatMillisecondsToTime(value.startTime)}</Typography>
          <Typography>{formatMillisecondsToTime(value.endTime)}</Typography>
        </Stack>
      ))}
    </MainCard>
  );
}
