//import dayjs from 'dayjs';

import { Button, Stack, Typography } from '@mui/material';

import BookingApi from 'api/BookingApi';
import CustomDatePicker from './CustomDatePicker';
import CustomTextField from './CustomTextField';
import MainCard from 'components/MainCard';
import TimeSlotModal from './TimeSlotModal';
import moment from 'moment';
import { useState } from 'react';

// import StartTimeComponent from './StartTimeComponent';
// import EndTimeComponent from './EndTimeComponent';
// import BookingApi from '../../api/BookingApi.ts';
// import { BookingType } from '../../dto/Booking/BookingType.ts';
// import { PaymentType } from '../../dto/Booking/PaymentType.ts';

//import Typography from 'themes/overrides/Typography';

export default function TimeSlotComponet() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [submit, setSubmit] = useState([]);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateHandler = (newValue) => {
    let datedata = newValue.$d;
    const parsedDate = moment(datedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    console.log(formattedDate);
    setDate(formattedDate);
    setDateError(false);
    setIsModalOpen(true);
  };

  const handleDialogTimeChange = (newValue) => {
    // console.log('handleDialogTimeChange', handleDialogTimeChange);
    const start = newValue.$d;
    const startwithTime = moment(start, ' hh:mm:ss a');
    const formattedSTime = startwithTime.format(' hh:mm:ss a');
    setStartTime(formattedSTime);
    const milliseconds = startwithTime.valueOf();
    console.log(milliseconds);
    //setStartTime(milliseconds);
  };
  console.log(startTime, endTime);

  const handleDialogEndTimeChange = (newValue) => {
    const end = newValue.$d;
    const EndwithTime = moment(end);
    const formattedETime = EndwithTime.format(' hh:mm:ss a');
    setEndTime(formattedETime);
    const milliseconds = EndwithTime.valueOf();
    console.log(milliseconds);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // setIsSubmitted(true);

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
      };
      console.log(data);
      // BookingApi.createBooking({
      //   type: BookingType.Turf,
      //   bookingAmount: 2000,
      //   bookingType: PaymentType.Cash,
      //   startTime: startTime,
      //   endTime: endTime
      // });
      BookingApi.createBooking({
        type: 'boardGame',
        dateOfBooking: '2023-12-7',
        bookingAmount: 20,
        bookingType: 'cash',
        startTime: 1701868762530,
        endTime: 1701868762530
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

  return (
    <MainCard title="Date Validation">
      <form onSubmit={onSubmit}>
        <Stack direction="row" spacing={2} alignItems="center">
          <CustomDatePicker date={date} setDate={dateHandler} error={dateError} />
          <CustomTextField label="Start Time" value={!startTime ? initalTime : startTime} setValue={TextFieldChange} />
          <CustomTextField label="End Time" value={!endTime ? initalEnd : endTime} setValue={TextFieldEndChange} />
          <TimeSlotModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onChange={handleDialogTimeChange}
            onSelect={handleDialogEndTimeChange}
            error={startError}
            error1={endError}
          />
          {/* <StartTimeComponent onChange={handleDialogTimeChange} error={startError} />
          <EndTimeComponent onChange={handleDialogEndTimeChange} error={endError} /> */}
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
          <Typography>{value.startTime}</Typography>
          <Typography>{value.endTime}</Typography>
        </Stack>
      ))}
    </MainCard>
  );
}
