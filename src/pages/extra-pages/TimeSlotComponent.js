//import dayjs from 'dayjs';
import moment from 'moment';
import MainCard from 'components/MainCard';
import CustomDatePicker from './CustomDatePicker';
import { Stack, Button, Typography } from '@mui/material';
import { useState } from 'react';

// import StartTimeComponent from './StartTimeComponent';
// import EndTimeComponent from './EndTimeComponent';
// import BookingApi from '../../api/BookingApi.ts';
// import { BookingType } from '../../dto/Booking/BookingType.ts';
// import { PaymentType } from '../../dto/Booking/PaymentType.ts'; 6.30 to 8.30
import TimeSlotModal from './TimeSlotModal';
import CustomTextField from './CustomTextField';

//import Typography from 'themes/overrides/Typography';

export default function TimeSlotComponet() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [submit, setSubmit] = useState([{ date: '2023-12-26', startTime: 1702269000000, endTime: 1702294200000 }]);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //const [newTime, setNewTime] = useState(startTime);

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
    const start = newValue.$d;
    const startwithTime = moment(start, ' hh:mm:ss a');
    // const formattedSTime = startwithTime.format(' hh:mm:ss a');
    // console.log(formattedSTime, 's');
    // setStartTime(formattedSTime);
    const milliseconds = startwithTime.valueOf();
    console.log(milliseconds, 's');
    setStartTime(milliseconds);
  };
  console.log(startTime, endTime);

  const handleDialogEndTimeChange = (newValue) => {
    const end = newValue.$d;
    const EndwithTime = moment(end);
    //const formattedETime = EndwithTime.format(' hh:mm:ss a');
    //setEndTime(formattedETime);
    const milliseconds = EndwithTime.valueOf();
    console.log(milliseconds);
    setEndTime(milliseconds);
  };

  const formatMillisecondsToTime = (ms) => {
    if (ms === null) {
      return ''; // Handle the case where endTime is null
    }
    const formattedTime = moment(ms).format('hh:mm:ss a');
    return formattedTime;
  };

  const convertedStartTime = formatMillisecondsToTime(startTime);
  const convertedEndTime = formatMillisecondsToTime(endTime);

  console.log('submit', submit);
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
      //   startTime: parseInt(startTime),
      //   endTime: parseInt(endTime),
      //   dateOfBooking: date
      // });
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

  const formatMillisecondsToTimeForDisable = (ms) => {
    if (ms === null) {
      return ''; // Handle the case where endTime is null
    }
    const formattedHTime = moment(ms).format('hh');
    const formattedMTime = moment(ms).format('mm');

    return { hour: formattedHTime, min: formattedMTime };
  };

  const shouldDisableTime = (value, view) => {
    submit.map((item) => {
      // item.startTime && item.endTime
      //   formatMillisecondsToTimeForDisable(item.startTime)
      // );
      // console.log(disable, 'value');
      if (item.date) {
        const value1 = formatMillisecondsToTimeForDisable(item.startTime);
        const value2 = formatMillisecondsToTimeForDisable(item.endTime);
        console.log(value1.hour, 'sds', value1.min, value2.hour, 'fdfd', value2.min);
        //time >= value1 && time <= value2;
        const hour = value.hour();
        if (view === 'hours') {
          return hour < value1.hour || hour > value2.hour;
        }
        if (view === 'minutes') {
          const minute = value.minute();
          return minute > value2.min && hour === value2.hour;
        }
        return false;
      }
    });
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
          <Typography>{formatMillisecondsToTime(value.startTime)}</Typography>
          <Typography>{formatMillisecondsToTime(value.endTime)}</Typography>
        </Stack>
      ))}
    </MainCard>
  );
}
