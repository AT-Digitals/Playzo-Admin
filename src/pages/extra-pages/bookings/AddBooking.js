import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import BookingApi from 'api/BookingApi';
import BookingModal from './BookingModal';
import CalendarComponent from './CalendarComponent';
import CustomDatePicker from './bookingComponents/CustomDatePicker';
import CustomTextField from './bookingComponents/CustomTextField';
import DateUtils from 'utils/DateUtils';
import MainCard from 'components/MainCard';
import NotificationSuccessToast from 'pages/components-overview/NotificationSuccessToast';
import NotificationToast from '../../components-overview/NotificationToast';
import PaymentApi from 'api/PaymentApi';
import { PaymentType } from 'enum/PaymentType';
import TimeSlotModal from './bookingComponents/TimeSlotModal';
import TypeDropdown from './bookingComponents/TypeDropdown';
import dayjs from 'dayjs';
import moment from 'moment';

export default function AddBooking() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [submit, setSubmit] = useState([]);
  const [dateError, setDateError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disableData, setDisableData] = useState([]);
  const [endDate, setEndDate] = useState('');
  const [enddateError, setEndDateError] = useState(false);

  const [bookingType, setBookingType] = useState('');
  const [toast, setToast] = useState('');
  const [bookingTypeError, setBookingTypeError] = useState(false);
  const [startError, setStartError] = useState('');
  const [endError, setEndError] = useState('');
  //const [error, setError] = useState('');

  const [initalTime, setInitalTime] = useState('');
  const [initalEnd, setInitalEnd] = useState('');
  const [successtoast, setSuccesstoast] = useState('');
  const [paymentType, setPaymentType] = useState(PaymentType.Cash);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);

  const handleModalChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleClose = () => {
    setBookingModalOpen(false);
  };

  const dateHandler = (newValue) => {
    let datedata = newValue.$d;
    const parsedDate = moment(datedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setDate(formattedDate);
    const ApiCall = async () => {
      try {
        setIsModalOpen(true);
        const response = await BookingApi.filter({
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
  const handleEndDateChange = (newValue) => {
    let enddatedata = newValue.$d;
    const parsedDate = moment(enddatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setEndDate(formattedDate);
    setEndDateError(false);
  };
  console.log('enddate', endDate, 'startDate', date);

  const bookingApiCall = (bookingData) => {
    if (date && startTime && endTime) {
      const data = {
        type: bookingType,
        date: date,
        startTime: startTime,
        endTime: endTime
      };

      setBookingModalOpen(true);
      const booking = async () => {
        try {
          const response = await BookingApi.createBooking(bookingData);
          if (response.message) {
            setToast(response.message);
          }
          setIsModalOpen(false);
          setSuccesstoast('Your Booking is added.');
          setBookingModalOpen(false);
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
      setSuccesstoast('');
      setToast('');
      setInitalTime('');
      setInitalEnd('');
    }
  };

  const paymentSubmit = async () => {
    const data = {
      payment: paymentType
    };
    if (data.payment === PaymentType.Cash) {
      bookingApiCall({
        type: bookingType,
        bookingtype: paymentType,
        startTime: parseInt(startTime),
        endTime: parseInt(endTime),
        user: userData.id,
        startDate: date,
        endDate: endDate
      });
    } else {
      await paymentMethod();
    }
    console.log(data);
  };

  const handleChange = (event) => {
    setBookingType(event.target.value);
    setDate('');
    setBookingTypeError(false);
  };

  const paymentMethod = async () => {
    try {
      console.log('res');
      const response = await PaymentApi.createPayment({ amount: 3000 });
      console.log('res', response);

      let options = {
        key: process.env.KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: response.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: response.currency,
        name: userData.name,
        description: 'Test Transaction',
        // image: 'https://example.com/your_logo',
        order_id: response.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          await PaymentApi.verifyPayment({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature
          });
          bookingApiCall({
            type: bookingType,
            bookingtype: paymentType,
            startTime: parseInt(startTime),
            endTime: parseInt(endTime),
            user: userData.id,
            startDate: date,
            endDate: endDate,
            bookingId: response.razorpay_payment_id
          });
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: '9000090000'
        },
        notes: {
          address: 'Razorpay Corporate Office'
        },
        theme: {
          color: '#3399cc'
        }
      };
      const rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDialogTimeChange = (newValue) => {
    const start = newValue.$d;
    const startwithTime = moment(start);
    const milliseconds = startwithTime.valueOf();
    setStartTime(milliseconds || 0);
    setInitalTime(formatTime(startwithTime));
  };

  const handleDialogEndTimeChange = (newValue) => {
    const end = newValue.$d;
    const EndwithTime = moment(end);
    const milliseconds = EndwithTime.valueOf();
    setEndTime(milliseconds || 0);
    setInitalEnd(formatTime(EndwithTime));
  };

  const TextFieldChange = (event) => {
    const editedTimeString = event.target.value;
    setInitalTime(editedTimeString);
    const currentDate = new Date();
    const [hours, minutes, ampm] = editedTimeString.split(/:|\s/);
    const editedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      ampm === 'AM' ? parseInt(hours, 10) : parseInt(hours, 10) + 12,
      parseInt(minutes, 10)
    );
    const editedMilliseconds = editedDate.getTime();
    setStartTime(editedMilliseconds || 0);
    isDateComparisonValid();
    setStartError('');
  };

  const formatTime = (milliseconds) => {
    const date = new Date(milliseconds);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return formattedTime;
  };

  useEffect(() => {
    if (startTime && endTime) {
      setInitalTime(formatTime(startTime));
      setInitalEnd(formatTime(endTime));
    }
  }, [startTime, endTime]);

  const TextFieldEndChange = (event) => {
    const editedTimeString = event.target.value;
    setInitalEnd(editedTimeString);
    const currentDate = new Date();
    const [hours, minutes, ampm] = editedTimeString.split(/:|\s/);
    const editedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      ampm === 'AM' ? parseInt(hours, 10) : parseInt(hours, 10) + 12,
      parseInt(minutes, 10)
    );
    const editedMilliseconds = editedDate.getTime();
    setEndTime(editedMilliseconds || 0);
    isDateComparisonValid();
    setEndError('');
  };

  const isDateComparisonValid = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.toDateString() + ' ' + initalTime);
    const endDate = new Date(currentDate.toDateString() + ' ' + initalEnd);

    if (startDate >= endDate || endDate <= startDate) {
      setStartError('Start time must be less than the end time');
      setEndError('End time must be greater than the start time');
      return false;
    }

    setStartError('');
    setEndError('');
    return true;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!date) {
      setDateError(true);
    }
    if (!bookingType) {
      setBookingTypeError(true);
    }

    if (date && bookingType && isDateComparisonValid()) {
      setBookingModalOpen(true);
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

  const shouldDisableDate = (startDate) => {
    if (!date) {
      return false;
    }
    return dayjs(startDate).isBefore(dayjs(date), 'day');
  };

  return (
    <MainCard title="Add Bookings">
      <form>
        <Stack direction="row" spacing={2} alignItems="center">
          <TypeDropdown label="Booking Type" type={bookingType} onChange={handleChange} error={bookingTypeError} />
          <CustomDatePicker date={date} setDate={dateHandler} error={dateError} label={'Start Date'} disablePast={true} />
          <CustomTextField label="Start Time" value={initalTime} setValue={TextFieldChange} error={startError} />
          <CustomTextField label="End Time" value={initalEnd} setValue={TextFieldEndChange} error={endError} />
          <CustomDatePicker
            date={endDate}
            setDate={handleEndDateChange}
            error={enddateError}
            label={'End Date'}
            disablePast={false}
            shouldDisableDate={shouldDisableDate}
          />
          <Button
            variant="outlined"
            sx={{ marginTop: '45px !important', padding: '8px 15px', width: '130px' }}
            type="submit"
            onClick={onSubmit}
          >
            Add booking
          </Button>
          <TimeSlotModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onChange={handleDialogTimeChange}
            onSelect={handleDialogEndTimeChange}
            shouldDisableTime={shouldDisableStartTime}
            shouldDisableEndTime={shouldDisableTime}
          />
          <BookingModal
            onChange={handleModalChange}
            value={paymentType}
            isOpen={bookingModalOpen}
            onClose={handleClose}
            onSubmit={paymentSubmit}
          />
        </Stack>
      </form>
      {toast !== '' ? <NotificationToast error={toast} /> : <></>}
      {successtoast !== '' ? <NotificationSuccessToast success={successtoast} /> : <></>}
    </MainCard>
  );
}
