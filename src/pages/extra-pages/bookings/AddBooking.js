import BookingApi from 'api/BookingApi';
import CustomDatePicker from './bookingComponents/CustomDatePicker';
import CustomTextField from './bookingComponents/CustomTextField';
import MainCard from 'components/MainCard';
import NotificationToast from '../../components-overview/NotificationToast';
import { Stack, Button } from '@mui/material';
import TimeSlotModal from './bookingComponents/TimeSlotModal';
import TypeDropdown from './bookingComponents/TypeDropdown';
import moment from 'moment';
import { useState } from 'react';
import DateUtils from 'utils/DateUtils';
import NotificationSuccessToast from 'pages/components-overview/NotificationSuccessToast';

export default function AddBooking() {
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
  const [toast, setToast] = useState('');
  const [bookingTypeError, setBookingTypeError] = useState(false);

  const [initalTime, setInitalTime] = useState('00:00:00');
  const [initalEnd, setInitalEnd] = useState('00:00:00');
  const [successtoast, setSuccessToast] = useState('');

  const TextFieldChange = (newValue) => {
    setInitalTime(newValue);
    setStartTime(newValue);
  };
  const TextFieldEndChange = (newValue) => {
    setInitalEnd(newValue);
  };

  const handleChange = (event) => {
    setBookingType(event.target.value);
    setDate('');
    setBookingTypeError(false);
  };

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

  const convertedStartTime = DateUtils.formatMillisecondsToTime(startTime);
  const convertedEndTime = DateUtils.formatMillisecondsToTime(endTime);

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
    if (!bookingType) {
      setBookingTypeError(true);
    }

    if (date && startTime && endTime) {
      const data = {
        type: bookingType,
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
            bookingtype: 'cash',
            startTime: parseInt(startTime),
            endTime: parseInt(endTime),
            user: localStorage.getItem('id')
          });
          if (response.message) {
            setToast(response.message);
          }
          setIsModalOpen(false);
          setSuccessToast('Your Booking is added.');
        } catch {
          setToast('Please select valid type and time');
        }
      };

      booking();

      setSubmit([...submit, data]);

      setDate('');
      setStartTime('');
      setEndTime('');
      setBookingType('');
      setIsModalOpen(false);
      setSuccessToast('');
      setToast('');
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const shouldDisableTime = (value, view) => {
    const hour = value.hour();
    const minute = value.minute();

    if (startTime) {
      const startMiltoTime = DateUtils.formatMillisecondsToTime(startTime);
      const time = DateUtils.convertTo24HourFormat(startMiltoTime);

      const endMiltoTime = DateUtils.formatMillisecondsToTime(startTime);
      const etime = DateUtils.convertTo24HourFormat(endMiltoTime);

      const startH = parseInt(time.split(':')[0], 10);
      const endH = parseInt(etime.split(':')[0], 10);
      const endM = parseInt(etime.split(':')[1], 10);

      return (hour < startH && hour < endH) || (hour === endH && minute < endM);
    }

    if (disableData && Array.isArray(disableData)) {
      const matchingItems = disableData.filter((item) => moment(item.dateOfBooking).format('YYYY-MM-DD') == date);

      if (matchingItems.length > 0) {
        return matchingItems.some((item) => {
          const value1 = DateUtils.formatMillisecondsToTime(item.startTime);
          const value2 = DateUtils.formatMillisecondsToTime(item.endTime);
          const time = DateUtils.convertTo24HourFormat(value1);
          const time2 = DateUtils.convertTo24HourFormat(value2);
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

  const shouldDisableStartTime = (value, view) => {
    const hour = value.hour();
    const minute = value.minute();

    if (disableData && Array.isArray(disableData)) {
      const matchingItems = disableData.filter((item) => moment(item.dateOfBooking).format('YYYY-MM-DD') == date);

      if (matchingItems.length > 0) {
        return matchingItems.some((item) => {
          const value1 = DateUtils.formatMillisecondsToTime(item.startTime);
          const value2 = DateUtils.formatMillisecondsToTime(item.endTime);
          const time = DateUtils.convertTo24HourFormat(value1);
          const time2 = DateUtils.convertTo24HourFormat(value2);
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
    <MainCard title="Add Bookings">
      <form>
        <Stack direction="row" spacing={2} alignItems="center">
          <TypeDropdown label="Booking Type" type={bookingType} onChange={handleChange} error={bookingTypeError} />
          <CustomDatePicker date={date} setDate={dateHandler} error={dateError} />
          <CustomTextField label="Start Time" value={!startTime ? initalTime : convertedStartTime} setValue={TextFieldChange} />
          <CustomTextField label="End Time" value={!endTime ? initalEnd : convertedEndTime} setValue={TextFieldEndChange} />{' '}
          <Button variant="outlined" sx={{ marginTop: '45px !important', padding: '8px 15px' }} type="submit" onClick={onSubmit}>
            Add booking
          </Button>
          <TimeSlotModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onChange={handleDialogTimeChange}
            onSelect={handleDialogEndTimeChange}
            error={startError}
            error1={endError}
            shouldDisableTime={shouldDisableStartTime}
            shouldDisableEndTime={shouldDisableTime}
          />
        </Stack>
      </form>
      {toast !== '' ? <NotificationToast error={toast} /> : <></>}
      {successtoast !== '' ? <NotificationSuccessToast success={successtoast} /> : <></>}
    </MainCard>
  );
}
