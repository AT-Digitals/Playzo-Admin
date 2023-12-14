import { Stack } from '@mui/material';

import BookingApi from 'api/BookingApi';
import CustomDatePicker from './CustomDatePicker';
import CustomTextField from './CustomTextField';
import MainCard from 'components/MainCard';
import TimeSlotModal from './TimeSlotModal';
import moment from 'moment';
import { useState } from 'react';
import TypeDropdown from './TypeDropdown';

export default function TimeSlotComponet() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [submit, setSubmit] = useState([]);
  const [dateError, setDateError] = useState(false);
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disableData, setDisableData] = useState([]);

  const [bookingType, setBookingType] = useState('');

  const handleChange = (event) => {
    setBookingType(event.target.value);
  };
  console.log('c', bookingType);
  const dateHandler = (newValue) => {
    let datedata = newValue.$d;
    const parsedDate = moment(datedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setDate(formattedDate);
    const ApiCall = async () => {
      try {
        setIsModalOpen(true);
        const response = await BookingApi.filterBooking({
          dateOfBooking: formattedDate,
          type: bookingType
        });
        console.log('data', response);
        setDisableData(response);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    ApiCall();

    setDateError(false);
  };

  const handleDialogTimeChange = (newValue) => {
    const start = newValue.$d;
    const startwithTime = moment(start);
    const milliseconds = startwithTime.valueOf();
    setStartTime(milliseconds);
  };

  const handleDialogEndTimeChange = (newValue) => {
    const end = newValue.$d;
    const EndwithTime = moment(end);
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
      };

      const booking = async () => {
        try {
          const response = await BookingApi.createBooking({
            type: bookingType,
            dateOfBooking: date,
            bookingAmount: 20,
            bookingType: 'cash',
            startTime: parseInt(startTime),
            endTime: parseInt(endTime)
          });
          console.log('booking', response);
          setIsModalOpen(false);
        } catch {
          console.log('slots are non booked');
        }
      };

      booking();

      setSubmit([...submit, data]);

      setDate('');
      setStartTime('');
      setEndTime('');
      setBookingType('');
      setIsModalOpen(false);
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

    if (disableData && Array.isArray(disableData)) {
      const matchingItems = disableData.filter((item) => moment(item.dateOfBooking).format('YYYY-MM-DD') == date);

      if (matchingItems.length > 0) {
        return matchingItems.some((item) => {
          console.log('m', item.startTime, 'e', item.endTime);
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
      <form>
        <Stack direction="row" spacing={2} alignItems="center">
          <TypeDropdown label="Booking Type" type={bookingType} onChange={handleChange} />
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
            onSubmit={onSubmit}
          />
        </Stack>
      </form>
    </MainCard>
  );
}
