import { Button, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';

import BookingApi from 'api/BookingApi';
import { BookingLength } from '../BookingLength';
import BookingModal from '../BookingModal';
import { BookingSubTypes } from '../BookingSubTypes';
import CustomDatePicker from '../bookingComponents/CustomDatePicker';
import CustomTextField from '../bookingComponents/CustomTextField';
import DateUtils from 'utils/DateUtils';
import DropDownComponent from '../../DropDownComponent';
import MainCard from 'components/MainCard';
import NotificationSuccessToast from 'pages/components-overview/NotificationSuccessToast';
import NotificationToast from 'pages/components-overview/NotificationToast';
import PaymentApi from 'api/PaymentApi';
import { PaymentType } from 'enum/PaymentType';
import TimeSlotModal from '../bookingComponents/TimeSlotModal';
import TypeDropdown from '../bookingComponents/TypeDropdown';
import dayjs from 'dayjs';
import moment from 'moment';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function BulkBookingComponent() {
  const [date, setDate] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dateError, setDateError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disableData, setDisableData] = useState([]);

  const [endDateError, setEndDateError] = useState(false);

  const [bookingType, setBookingType] = useState('');
  const [toast, setToast] = useState('');
  const [bookingTypeError, setBookingTypeError] = useState(false);
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);
  const [showTextField, setShowTextField] = useState(false);
  const [totalDays, setTotalDays] = useState(0);

  const [successtoast, setSuccesstoast] = useState('');
  const [paymentType, setPaymentType] = useState(PaymentType.Cash);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectNumberError, setSelectNumberError] = useState(false);
  const [bulkAmount, setBulkAmount] = useState();
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);
  const bookingObject = localStorage.getItem('bookingData');
  const bookingDetails = JSON.parse(bookingObject);

  const [selectWeekDay, setSelectWeekDay] = useState([]);
  const [selectWeekError, setSelectWeekError] = useState(false);

  const handleWeekChange = (event) => {
    const {
      target: { value }
    } = event;
    setSelectWeekDay(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    setSelectWeekError(false);
  };

  const handleModalChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleClose = () => {
    setBookingModalOpen(false);
    setBulkAmount();
  };

  const handleNumberChange = (event) => {
    setSelectedNumber(event.target.value);
    setSelectNumberError(false);
  };

  const handleAmountChange = (event) => {
    setBulkAmount(event.target.value);
  };

  const handleChange = (event) => {
    setBookingType(event.target.value);
    setBookingTypeError(false);
    setSelectedNumber('');
  };

  const getNumberOptions1 = (Type) => {
    const length = BookingLength[Type] || 0;
    return Array.from({ length }, (_, index) => ({
      value: (index + 1).toString(),
      label: BookingSubTypes[Type][index + 1]
    }));
  };

  const dateHandler = (newValue) => {
    let datedata = newValue.$d;
    const parsedDate = moment(datedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setDate(formattedDate);
    setDateError(false);
    setStartTime('');
    setEndTime('');

    if (endDateValue && new Date(endDateValue) < new Date(formattedDate)) {
      setIsModalOpen(false);
      setEndDateValue('');
    }
  };
  const handleEndDateChange = (newValue) => {
    let enddatedata = newValue.$d;
    const parsedDate = moment(enddatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');

    setEndDateValue(formattedDate);
    ApiCall(formattedDate);
    setEndDateError(false);
    setStartTime('');
    setEndTime('');

    const days = getDatesInRange(date, formattedDate);
    console.log(days, 'helo');
  };

  const ApiCall = async (endData) => {
    try {
      const response = await BookingApi.filter({
        startDate: date,
        type: bookingType,
        endDate: endData,
        court: selectedNumber
      });
      setDisableData(response);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const LocalStorageSaveHandler = (bookingData) => {
    let bookData = JSON.parse(localStorage.getItem('bookingData') || '[]');

    if (bookData.length === 0) {
      bookData.push(bookingData);
    } else {
      bookData = [...bookData, bookingData];
    }
    localStorage.setItem('bookingData', JSON.stringify(bookData));
    //setDisableData(bookData);
  };

  const bookingApiCall = (bookingData) => {
    if (date && startTime && endTime && endDateValue && selectedNumber && selectWeekDay) {
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
          setDate('');
          setStartTime('');
          setEndTime('');
          setBookingType('');
          setToast('');
          setEndDateValue('');
          setBulkAmount();
          setEndError(false);
          setStartError(false);
          setSelectWeekDay([]);
          setSelectWeekError(false);
        } catch (error) {
          if (error.message === 'Please choose another date and slot') {
            LocalStorageSaveHandler(bookingData);
            setToast(error.message);
            setDate('');
            setStartTime('');
            setEndTime('');
            setBookingType('');
            setIsModalOpen(false);
            setSuccesstoast('');
            setEndDateValue('');
            setBulkAmount();
            setEndError(false);
            setStartError(false);
            setSelectWeekDay([]);
            setSelectWeekError(false);
          } else {
            setToast(error.message);
          }

          setIsModalOpen(false);
          setBookingModalOpen(false);
        }
      };
      booking();
      setSuccesstoast('');
      setToast('');
    }
  };

  const paymentSubmit = async () => {
    const data = {
      payment: paymentType
    };
    // if (data.payment === PaymentType.Cash) {
    bookingApiCall({
      type: bookingType,
      bookingtype: PaymentType.Online,
      startTime: parseInt(startTime),
      endTime: parseInt(endTime),
      user: userData.id,
      startDate: date,
      endDate: endDateValue,
      court: selectedNumber,
      userBookingType: 'manual',
      bookingAmount: {
        online: bulkAmount ?? 0
      }
    });
    // } else {
    //   await paymentMethod();
    // }
    // console.log(data);
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
            bookingtype: PaymentType.Online,
            startTime: parseInt(startTime),
            endTime: parseInt(endTime),
            user: userData.id,
            startDate: date,
            endDate: endDateValue,
            bookingId: response.razorpay_payment_id,
            court: selectedNumber,
            userBookingType: 'manual',
            bookingAmount: {
              online: bulkAmount ?? 0
            }
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
    const joinDateandTime = DateUtils.joinDate(new Date(date), new Date(start));
    const milliseconds = joinDateandTime.valueOf();
    setStartTime(milliseconds || 0);
    setEndTime('');
  };

  const handleDialogEndTimeChange = (newValue) => {
    const end = newValue.$d;
    const joinDateandTime = DateUtils.joinDate(new Date(endDateValue), new Date(end));
    const milliseconds = joinDateandTime.valueOf();
    setEndTime(milliseconds || 0);
    const data = renderDatesArray(getWeekdaysBetween(date, endDateValue));
    console.log('data', data);
  };

  const formatTime = (milliseconds) => {
    const date = new Date(milliseconds);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return formattedTime;
  };

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem('bookingData');
    };

    return () => {
      clearLocalStorage();
    };
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!date) {
      setDateError(true);
    }
    if (!endDateValue) {
      setEndDateError(true);
    }
    if (!bookingType) {
      setBookingTypeError(true);
    }
    if (!startTime) {
      setStartError(true);
    }
    if (!endTime) {
      setEndError(true);
    }
    if (!selectedNumber) {
      setSelectNumberError(true);
    }
    if (selectWeekDay.length === 0) {
      setSelectWeekError(true);
    }
    if (date && endDateValue && bookingType && startTime && endTime && selectedNumber && selectWeekDay.length > 0) {
      setBookingModalOpen(true);
      isDurationGreaterThanOneMonth(date, endDateValue);
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

      return (hour < startH && hour <= endH) || (hour === endH && minute <= endM);
    }

    if (disableData && Array.isArray(disableData)) {
      if (disableData.length > 0) {
        return disableData.some((item) => {
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
      if (disableData.length > 0) {
        return disableData.some((item) => {
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

  const shouldDisableDate = (startDateData) => {
    if (!date) {
      return false;
    }
    return dayjs(startDateData).isBefore(dayjs(date), 'day');
  };

  const isDurationGreaterThanOneMonth = (startDate, endDateV) => {
    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDateV);

    const timeDifference = endDateObject - startDateObject;

    const durationInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    setShowTextField(durationInDays > 31);

    return durationInDays;
  };

  const handleTimeModal = () => {
    setIsModalOpen(true);
    ApiCall(endDateValue);
  };

  const countTotalDays = () => {
    const start = new Date(date); // Convert start date to Date object
    const end = new Date(endDateValue); // Convert end date to Date object
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
    const totalDays = Math.round(Math.abs((end - start) / oneDay)); // Calculate total days
    setTotalDays(totalDays);
  };

  const getWeekdaysBetween = (startDate, endDate) => {
    console.log('start', startDate, endDate);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const datesArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (weekdays[currentDate.getDay()] !== 'Saturday' && weekdays[currentDate.getDay()] !== 'Sunday') {
        datesArray.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(datesArray);
    return datesArray;
  };

  const renderDatesArray = (dates) => {
    return dates.map((date, index) => <li key={index}>{date.toDateString()}</li>);
  };

  const getDatesInRange = (startDate, endDate) => {
    // const dateValue = new Date(startDate);

    const dates = [];

    while (startDate <= endDate) {
      startDate.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  };

  const d1 = new Date('2022-01-18');
  const d2 = new Date('2022-01-24');

  const data = getWeekdaysBetween(date, endDateValue);
  //   console.log('start', date, 'end', endDateValue, totalDays);

  return (
    <MainCard title="Bulk Bookings">
      <form style={{ height: '240px' }}>
        <Stack direction="row" spacing={2}>
          <Grid container spacing={3} alignItems="center">
            <Grid item md={3}>
              <TypeDropdown label="Select Service" type={bookingType} onChange={handleChange} error={bookingTypeError} />
            </Grid>
            <Grid item md={3}>
              <DropDownComponent
                value={selectedNumber || ''}
                onChange={handleNumberChange}
                label="Select Service Type"
                options={getNumberOptions1(bookingType)}
                error={selectNumberError}
              />
            </Grid>
            <Grid item md={3}>
              <CustomDatePicker date={date} setDate={dateHandler} error={dateError} label={'Start Date'} disablePast={true} />
            </Grid>
            <Grid item md={3}>
              <CustomDatePicker
                date={endDateValue}
                setDate={handleEndDateChange}
                error={endDateError}
                label={'End Date'}
                disablePast={false}
                shouldDisableDate={shouldDisableDate}
              />
            </Grid>
            <Grid item md={3}>
              <CustomTextField
                label="Start Time"
                value={!startTime ? '' : DateUtils.formatMillisecondsToTimeConvert(startTime)}
                onClick={handleTimeModal}
                error={!startTime ? startError : false}
                errorText="Please Enter a valid start time"
              />
            </Grid>
            <Grid item md={3}>
              <CustomTextField
                label="End Time"
                value={!endTime ? '' : DateUtils.formatMillisecondsToTimeConvert(endTime)}
                onClick={handleTimeModal}
                error={!endTime ? endError : false}
                errorText="Please Enter a valid end time"
              />
            </Grid>
            <TimeSlotModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onChange={handleDialogTimeChange}
              onSelect={handleDialogEndTimeChange}
              shouldDisableTime={shouldDisableStartTime}
              shouldDisableEndTime={shouldDisableTime}
              startValue={startTime}
              endValue={endTime}
            />
            <Grid item md={3}>
              <Stack direction="column" spacing={2}>
                <Typography>Select Days</Typography>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectWeekDay}
                  onChange={handleWeekChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  //   MenuProps={MenuProps}
                  error={selectWeekError}
                >
                  {daysOfWeek.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={selectWeekDay.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
                {selectWeekError ? <FormHelperText error>Please select a week days</FormHelperText> : <></>}
              </Stack>
            </Grid>

            <Grid item md={3} mt={4.2}>
              <Button
                variant="outlined"
                sx={{ padding: '7px 15px', width: '100%', fontWeight: 600, fontSize: '15px' }}
                type="submit"
                onClick={onSubmit}
              >
                Add booking
              </Button>
            </Grid>
          </Grid>
          <TimeSlotModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onChange={handleDialogTimeChange}
            onSelect={handleDialogEndTimeChange}
            shouldDisableTime={shouldDisableStartTime}
            shouldDisableEndTime={shouldDisableTime}
            startValue={startTime}
            endValue={endTime}
          />
          <BookingModal
            onChange={handleModalChange}
            value={paymentType}
            isOpen={bookingModalOpen}
            onClose={handleClose}
            onSubmit={paymentSubmit}
            label="Enter Amount"
            value1={bulkAmount}
            setValue={handleAmountChange}
            show={showTextField}
          />
        </Stack>
      </form>
      {toast !== '' ? <NotificationToast error={toast} /> : <></>}
      {successtoast !== '' ? <NotificationSuccessToast success={successtoast} /> : <></>}
    </MainCard>
  );
}