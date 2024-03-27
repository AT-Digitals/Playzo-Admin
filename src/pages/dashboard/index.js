import { Box, Button, Grid, Stack, Typography, Select } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import dayjs from 'dayjs';

import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import BookingApi from 'api/BookingApi';
import EnquiryApi from 'api/EnquiryApi';
import MainCard from 'components/MainCard';
import PieChart from './PieChart';
import CustomDatePicker from '../extra-pages/bookings/bookingComponents/CustomDatePicker';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

// material-ui

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const initialBookingInfo = {
  online: 0,
  manual: 0,
  totalBooking: 0
};

const DashboardDefault = () => {
  const [data, setData] = useState([]);
  const [enquiryData, setEnquiryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [filterData, setFilterData] = useState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [serviceData, setServiceData] = useState();
  const [paymentData, setPaymentData] = useState();
  const [paymentValue, setPaymentValue] = useState([]);
  const [serviceValue, setServiceValue] = useState([]);

  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [startDateData, setStartDateData] = useState('');
  const [endDateData, setEndDateData] = useState('');
  const [count, setCount] = useState(0);
  const [bookingFilter, setBookingFilter] = useState([]);

  const [isApplyMode, setIsApplyMode] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);

  const [startDateValueError, setStartDateValueError] = useState(false);
  const [endDateValueError, setEndDateValueError] = useState(false);
  const [isApply, setIsApply] = useState(true);
  const [isDisable, setIsDisable] = useState(false);

  const [startDateDataError, setStartDateDataError] = useState(false);
  const [endDateDataError, setEndDateDataError] = useState(false);
  const [clickApply, setClickApply] = useState(true);
  const [clickDisable, setClickDisable] = useState(false);

  const [selectPaymentType, setSelectPaymentType] = useState('All Payments');
  const [bookingDetails, setBookingDetails] = useState(initialBookingInfo);

  const updateBookingInfo = (newBookingInfo) => {
    setBookingDetails({ ...bookingDetails, ...newBookingInfo });
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePaymentTypeChange = (type) => {
    setSelectPaymentType(type);
  };

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  const handleStartDateChange = (newValue) => {
    let datedata = newValue.$d;
    const parsedDate = moment(datedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setStartDate(formattedDate);
    setStartDateError(false);
    if (endDate && new Date(endDate) < new Date(formattedDate)) {
      setEndDate('');
    }
  };

  const handleEndDateChange = (newValue) => {
    let enddatedata = newValue.$d;
    const parsedDate = moment(enddatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setEndDate(formattedDate);
    setEndDateError(false);
  };

  const handleStartDateValueChange = (newValue) => {
    let datedata = newValue.$d;
    const parsedDate = moment(datedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setStartDateValue(formattedDate);
    setStartDateError(false);
    if (endDate && new Date(endDate) < new Date(formattedDate)) {
      setEndDate('');
    }
  };

  const handleEndDateValueChange = (newValue) => {
    let enddatedata = newValue.$d;
    const parsedDate = moment(enddatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setEndDateValue(formattedDate);
    setEndDateError(false);
  };

  const handleStartDateDataChange = (newValue) => {
    let datedata = newValue.$d;
    const parsedDate = moment(datedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setStartDateData(formattedDate);
    setStartDateDataError(false);
    if (endDate && new Date(endDate) < new Date(formattedDate)) {
      setEndDate('');
    }
  };

  const handleEndDateDataChange = (newValue) => {
    let enddatedata = newValue.$d;
    const parsedDate = moment(enddatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setEndDateData(formattedDate);
    setEndDateDataError(false);
  };

  const fetchEnquiry = useCallback(async () => {
    try {
      const res = await EnquiryApi.getAll({}).then((data) => {
        setEnquiryData(data);
      });
    } catch {
      console.log('data fetching failed');
    }
  }, []);

  const calculateBookings = (data) => {
    const manualBooking = data.filter((item) => item.userBookingType === 'manual');
    const onlineBooking = data.filter((item) => item.userBookingType === 'online');
    const manual = manualBooking.length;
    const online = onlineBooking.length;
    const totalBooking = manual + online;
    return { manual, online, totalBooking };
  };

  const calculateBookingTypes = (data, name) => {
    const BookingType = data.filter((item) => item.type === name);
    const manualBooking = BookingType.filter((item) => item.userBookingType === 'manual');
    const onlineBooking = BookingType.filter((item) => item.userBookingType === 'online');
    const manual = manualBooking.length;
    const online = onlineBooking.length;
    const totalBooking = manual + online;
    return { manual, online, totalBooking };
  };

  const bookingTypeInfo = calculateBookingTypes(serviceValue, 'turf');
  const bookingType2Info = calculateBookingTypes(serviceValue, 'boardGame');
  const bookingType3Info = calculateBookingTypes(serviceValue, 'playstation');
  const bookingType4Info = calculateBookingTypes(serviceValue, 'cricketNet');
  const bookingType5Info = calculateBookingTypes(serviceValue, 'bowlingMachine');
  const bookingType6Info = calculateBookingTypes(serviceValue, 'badminton');

  const bookingInfo = calculateBookings(serviceValue);

  const getOnlineAmountCount = (dataArray) => {
    let totalCount = 0;
    dataArray.forEach((item) => {
      totalCount += item.bookingAmount.online;
    });

    return totalCount;
  };

  const getCashAmountCount = (dataArray) => {
    let totalCount = 0;
    dataArray.forEach((item) => {
      totalCount += item.bookingAmount.cash;
    });

    return totalCount;
  };

  const getUpiAmountCount = (dataArray) => {
    let totalCount = 0;
    dataArray.forEach((item) => {
      totalCount += item.bookingAmount.upi;
    });
    return totalCount;
  };
  const getRefundAmountCount = (dataArray) => {
    let totalCount = 0;
    dataArray.forEach((item) => {
      totalCount += item.bookingAmount.refund;
    });

    return totalCount;
  };

  const onlinePayment = getOnlineAmountCount(paymentValue);
  const cashPayment = getCashAmountCount(paymentValue);
  const UpiPayment = getUpiAmountCount(paymentValue);
  const refundPayment = getRefundAmountCount(paymentValue);

  const totalPayments = onlinePayment + cashPayment + UpiPayment + refundPayment;

  const allChartData = {
    'All Services': { onlineBooking: bookingInfo.online, cashBooking: bookingInfo.manual, totalBooking: bookingInfo.totalBooking },
    turf: { onlineBooking: bookingTypeInfo.online, cashBooking: bookingTypeInfo.manual, totalBooking: bookingTypeInfo.totalBooking },
    boardGame: {
      onlineBooking: bookingType2Info.online,
      cashBooking: bookingType2Info.manual,
      totalBooking: bookingType2Info.totalBooking
    },
    playstation: {
      onlineBooking: bookingType3Info.online,
      cashBooking: bookingType3Info.manual,
      totalBooking: bookingType3Info.totalBooking
    },
    cricketNet: {
      onlineBooking: bookingType4Info.online,
      cashBooking: bookingType4Info.manual,
      totalBooking: bookingType4Info.totalBooking
    },
    bowlingMachine: {
      onlineBooking: bookingType5Info.online,
      cashBooking: bookingType5Info.manual,
      totalBooking: bookingType5Info.totalBooking
    },
    badminton: { onlineBooking: bookingType6Info.online, cashBooking: bookingType6Info.manual, totalBooking: bookingType6Info.totalBooking }
  };

  const updateChartData = (category) => {
    if (category === null) {
      const labels = Object.keys(allChartData);
      const series = Object.values(allChartData).map((data) => data.onlineBooking + data.cashBooking + totalBooking);
      return { labels, series };
    } else {
      const data = allChartData[category];
      const labels = ['Online Bookings', 'Manual Bookings', 'Total Bookings'];
      const series = [data.onlineBooking, data.cashBooking, data.totalBooking];
      return { labels, series };
    }
  };

  const PaymentChartData = {
    'All Payments': {
      BookingCount: totalPayments,
      onlinePayment: onlinePayment,
      cashPayment: cashPayment,
      UpiPayment: UpiPayment,
      refundPayment: refundPayment
    },
    Online: {
      BookingCount: onlinePayment,
      onlinePayment: onlinePayment
    },
    Cash: {
      BookingCount: cashPayment,
      cashPayment: cashPayment
    },
    UPI: {
      BookingCount: UpiPayment,
      UpiPayment: UpiPayment
    },
    Refund: {
      BookingCount: refundPayment,
      refundPayment: refundPayment
    }
  };

  const updateChartPaymentData = (category) => {
    if (category === null) {
      const labels = Object.keys(PaymentChartData);
      const series = Object.values(PaymentChartData).map((data) => data.BookingCount);
      return { labels, series };
    } else {
      const data = PaymentChartData[category];
      const labels = selectPaymentType === 'All Payments' ? ['Total Amount', 'Online', 'Cash', 'UPI', 'Refund'] : [`${selectPaymentType}`];
      const series =
        selectPaymentType === 'All Payments'
          ? [data.BookingCount, data.onlinePayment, data.cashPayment, data.UpiPayment, data.refundPayment]
          : [data.BookingCount];
      return { labels, series };
    }
  };

  const paymentChartData = updateChartPaymentData(selectPaymentType);

  const chartData = updateChartData(selectedCategory);

  const dateBookingData = calculateBookings(data);

  const BookingData = {
    'Online Bookings': { Booking: dateBookingData.online },

    'Manual Bookings': {
      Booking: dateBookingData.manual
    },
    'Total Bookings': {
      Booking: dateBookingData.totalBooking
    }
  };

  const updateChartfilterData = (filterData) => {
    if (!filterData || !filterData.startDate || !filterData.endDate) {
      const labels = Object.keys(BookingData);
      const series = Object.values(BookingData).map((data) => data.Booking);
      return { labels, series };
    } else {
      const labels = ['Online Bookings', 'Manual Bookings', 'Total Bookings'];
      const series = [bookingDetails.online, bookingDetails.manual, bookingDetails.totalBooking];
      return { labels, series };
    }
  };

  const filtertype = updateChartfilterData(filterData);

  const ApplyFilter = useCallback(
    async (event) => {
      event.preventDefault();
      if (!startDate) {
        setStartDateError(true);
        return;
      }
      if (!endDate) {
        setEndDateError(true);
        return;
      }

      if (startDate !== '' || endDate !== '') {
        const filter = {
          startDate: startDate,
          endDate: endDate
        };
        setFilterData(filter);
      }
      setButtonDisable(true);
      setIsApplyMode(false);
    },
    [endDate, startDate]
  );

  const ApplyFilterButton = useCallback(
    async (event) => {
      event.preventDefault();
      if (!startDateValue) {
        setStartDateValueError(true);
        return;
      }
      if (!endDateValue) {
        setEndDateValueError(true);
        return;
      }

      if (selectedCategory !== 'All Services' || startDateValue !== '' || endDateValue !== '') {
        const filter = {
          type: selectedCategory,
          startDate: startDateValue,
          endDate: endDateValue
        };
        setServiceData(filter);
      }
      setIsDisable(true);
      setIsApply(false);
    },
    [endDateValue, startDateValue, selectedCategory]
  );

  const ApplyFilterData = useCallback(
    async (event) => {
      event.preventDefault();
      if (!startDateData) {
        setStartDateDataError(true);
        return;
      }
      if (!endDateData) {
        setEndDateDataError(true);
        return;
      }

      if (startDateData !== '' || endDateData !== '') {
        const filter = {
          startDate: startDateData,
          endDate: endDateData
        };
        setPaymentData(filter);
      }
      setClickDisable(true);
      setClickApply(false);
    },
    [endDateData, startDateData]
  );

  const shouldDisableEndDate = (date) => {
    if (!startDate) {
      return false;
    }
    return dayjs(date).isBefore(dayjs(startDate), 'day');
  };

  const shouldDisableEndDateValue = (date) => {
    if (!startDateValue) {
      return false;
    }
    return dayjs(date).isBefore(dayjs(startDateValue), 'day');
  };

  const shouldDisableEndDateData = (date) => {
    if (!startDateData) {
      return false;
    }
    return dayjs(date).isBefore(dayjs(startDateData), 'day');
  };

  const handleDisableButtonClick = async () => {
    setFilterData(data);
    setIsApplyMode(true);
    setStartDate('');
    setEndDate('');
    setButtonDisable(false);
    await BookingApi.getAll({}).then((data) => {
      setCount(data.length);
      setData(data);
    });
  };

  const handleDisableButton = async () => {
    //setServiceData(data);
    setIsApply(true);
    setStartDateValue('');
    setEndDateValue('');
    setIsDisable(false);
    setStartDateValueError(false);
    setEndDateValueError(false);
    await BookingApi.getAll({}).then((data) => {
      setCount(data.length);
      setServiceValue(data);
    });
  };

  const handleDisable = async () => {
    setClickApply(true);
    setStartDateData('');
    setEndDateData('');
    setClickDisable(false);
    setStartDateDataError(false);
    setEndDateDataError(false);
    await BookingApi.getAll({}).then((data) => {
      setCount(data.length);
      setPaymentValue(data);
    });
  };

  const fetchInfo = useCallback(async () => {
    try {
      if (filterData) {
        await BookingApi.filterBook(filterData).then((data) => {
          setCount(data.length);
          setBookingFilter(data);
          if (bookingFilter) {
            const updateData = calculateBookings(data);
            const newBookingInfo = {
              online: updateData.online,
              manual: updateData.manual,
              totalBooking: updateData.totalBooking
            };
            updateBookingInfo(newBookingInfo);
          }
        });
      } else {
        await BookingApi.getAll({}).then((data) => {
          setCount(data.length);
          setData(data);
        });
      }
    } catch {
      console.log('Error fetching data');
    }
  }, [filterData]);

  const fetchInfo2 = useCallback(async () => {
    try {
      if (serviceData) {
        if (serviceData.type === 'All Services') {
          serviceData.type === '';
        }
        await BookingApi.filterBook(serviceData).then((data) => {
          setCount(data.length);
          setServiceValue(data);
        });
      } else {
        await BookingApi.getAll({}).then((data) => {
          setCount(data.length);
          setServiceValue(data);
        });
      }
    } catch {
      console.log('Error fetching data');
    }
  }, [serviceData]);

  const fetchData = useCallback(async () => {
    try {
      if (paymentData !== '') {
        await BookingApi.filterBook(paymentData).then((data) => {
          setCount(data.length);
          setPaymentValue(data);
        });
      } else {
        await BookingApi.getAll({}).then((data) => {
          setCount(data.length);
          setPaymentValue(data);
        });
      }
    } catch {
      console.log('Error fetching data');
    }
  }, [paymentData]);

  useEffect(() => {
    fetchEnquiry();
    fetchInfo();
    fetchInfo2();
    fetchData();
  }, [fetchInfo, fetchInfo2, fetchData]);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Bookings" count={bookingInfo.totalBooking.toString()} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Manual Bookings" count={bookingInfo.manual.toString()} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Online Bookings" count={bookingInfo.online.toString()} isLoss color="warning" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Enquiries" count={enquiryData.length.toString()} isLoss color="warning" extra="$20,395" />
      </Grid>

      {/* row 2 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item marginBottom={3}>
            <Typography variant="h3">Booking Chart</Typography>
          </Grid>
          <Grid item marginBottom={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <CustomDatePicker
                error={startDateError}
                date={startDate}
                setDate={handleStartDateChange}
                label={'Start Date'}
                disableprop={buttonDisable}
              />
              <CustomDatePicker
                date={endDate}
                setDate={handleEndDateChange}
                label={'End Date'}
                disableprop={buttonDisable}
                shouldDisableDate={shouldDisableEndDate}
                error={endDateError}
              />
              {isApplyMode ? (
                <Button
                  variant="outlined"
                  onClick={ApplyFilter}
                  sx={{ padding: '7px 15px', width: '150px', fontWeight: 600, fontSize: '15px', marginTop: '35px !important' }}
                >
                  Apply
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={handleDisableButtonClick}
                  sx={{ padding: '7px 15px', width: '150px', fontWeight: 600, fontSize: '15px', marginTop: '35px !important' }}
                >
                  Clear
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <PieChart selectData={filtertype} palette1="palette1" />
          </Box>
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12}>
            <Typography variant="h3">Booking Service Chart</Typography>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={3}>
              <Stack spacing={2}>
                <Typography>Service Types</Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    disabled={isDisable}
                    value={selectedCategory}
                    onChange={handleChange}
                  >
                    <MenuItem value="All Services">All Services</MenuItem>
                    <MenuItem value="turf">Turf</MenuItem>
                    <MenuItem value="boardGame">Board Game</MenuItem>
                    <MenuItem value="playstation">Play Station</MenuItem>
                    <MenuItem value="cricketNet">Cricket Net</MenuItem>
                    <MenuItem value="bowlingMachine">Bowling Machine</MenuItem>
                    <MenuItem value="badminton">Badminton</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={9} marginY={2}>
              <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                <CustomDatePicker
                  error={startDateValueError}
                  date={startDateValue}
                  setDate={handleStartDateValueChange}
                  label={'Start Date'}
                  disableprop={isDisable}
                />
                <CustomDatePicker
                  date={endDateValue}
                  setDate={handleEndDateValueChange}
                  label={'End Date'}
                  disableprop={isDisable}
                  shouldDisableDate={shouldDisableEndDateValue}
                  error={endDateValueError}
                />
                {isApply ? (
                  <Button
                    variant="outlined"
                    onClick={ApplyFilterButton}
                    sx={{ padding: '7px 15px', width: '150px', fontWeight: 600, fontSize: '15px', marginTop: '35px !important' }}
                  >
                    Apply
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleDisableButton}
                    sx={{ padding: '7px 15px', width: '150px', fontWeight: 600, fontSize: '15px', marginTop: '35px !important' }}
                  >
                    Clear
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <PieChart selectData={chartData} palette1="palette2" />
          </Box>
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3">Payment Chart</Typography>
          </Grid>
          <Grid container alignItems="flex-end">
            <Grid item xs={6}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button
                  onClick={() => handlePaymentTypeChange('All Payments')}
                  color={selectPaymentType === 'All Payments' ? 'primary' : 'secondary'}
                  variant={selectPaymentType === 'All Payments' ? 'outlined' : 'text'}
                >
                  All Payments
                </Button>
                <Button
                  onClick={() => handlePaymentTypeChange('Online')}
                  color={selectPaymentType === 'Online' ? 'primary' : 'secondary'}
                  variant={selectPaymentType === 'Online' ? 'outlined' : 'text'}
                >
                  Online
                </Button>
                <Button
                  onClick={() => handlePaymentTypeChange('Cash')}
                  color={selectPaymentType === 'Cash' ? 'primary' : 'secondary'}
                  variant={selectPaymentType === 'Cash' ? 'outlined' : 'text'}
                >
                  Cash
                </Button>
                <Button
                  onClick={() => handlePaymentTypeChange('UPI')}
                  color={selectPaymentType === 'UPI' ? 'primary' : 'secondary'}
                  variant={selectPaymentType === 'UPI' ? 'outlined' : 'text'}
                >
                  UPI
                </Button>
                <Button
                  onClick={() => handlePaymentTypeChange('Refund')}
                  color={selectPaymentType === 'Refund' ? 'primary' : 'secondary'}
                  variant={selectPaymentType === 'Refund' ? 'outlined' : 'text'}
                >
                  Refund
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
                <CustomDatePicker
                  error={startDateDataError}
                  date={startDateData}
                  setDate={handleStartDateDataChange}
                  label={'Start Date'}
                  disableprop={clickDisable}
                />
                <CustomDatePicker
                  date={endDateData}
                  setDate={handleEndDateDataChange}
                  label={'End Date'}
                  disableprop={clickDisable}
                  shouldDisableDate={shouldDisableEndDateData}
                  error={endDateDataError}
                />
                {clickApply ? (
                  <Button
                    variant="outlined"
                    onClick={ApplyFilterData}
                    sx={{ padding: '7px 15px', width: '150px', fontWeight: 600, fontSize: '15px', marginTop: '35px !important' }}
                  >
                    Apply
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleDisable}
                    sx={{ padding: '7px 15px', width: '150px', fontWeight: 600, fontSize: '15px', marginTop: '35px !important' }}
                  >
                    Clear
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            {selectPaymentType === 'Online' ? (
              <PieChart selectData={paymentChartData} palette1="palette5" />
            ) : selectPaymentType === 'Cash' ? (
              <PieChart selectData={paymentChartData} palette1="palette7" />
            ) : selectPaymentType === 'UPI' ? (
              <PieChart selectData={paymentChartData} palette1="palette6" />
            ) : (
              <PieChart selectData={paymentChartData} palette1="palette8" selectPaymentType={selectPaymentType} />
            )}
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
