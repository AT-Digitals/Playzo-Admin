import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import dayjs from 'dayjs';

import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import BookingApi from 'api/BookingApi';
import EnquiryApi from 'api/EnquiryApi';
import MainCard from 'components/MainCard';
import PieChart from './PieChart';
import CustomDatePicker from '../extra-pages/bookings/bookingComponents/CustomDatePicker';

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
  const [count, setCount] = useState(0);
  const [bookingFilter, setBookingFilter] = useState([]);

  const [isApplyMode, setIsApplyMode] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState(false);

  const [selectPaymentType, setSelectPaymentType] = useState('All Payments');
  const [bookingDetails, setBookingDetails] = useState(initialBookingInfo);

  const updateBookingInfo = (newBookingInfo) => {
    setBookingDetails({ ...bookingDetails, ...newBookingInfo });
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

  const bookingTypeInfo = calculateBookingTypes(data, 'turf');
  const bookingType2Info = calculateBookingTypes(data, 'boardGame');
  const bookingType3Info = calculateBookingTypes(data, 'playstation');
  const bookingType4Info = calculateBookingTypes(data, 'cricketNet');
  const bookingType5Info = calculateBookingTypes(data, 'bowlingMachine');
  const bookingType6Info = calculateBookingTypes(data, 'badminton');

  const bookingInfo = calculateBookings(data);

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

  const onlinePayment = getOnlineAmountCount(data);
  const cashPayment = getCashAmountCount(data);
  const UpiPayment = getUpiAmountCount(data);
  const refundPayment = getRefundAmountCount(data);

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

  const shouldDisableEndDate = (date) => {
    if (!startDate) {
      return false;
    }
    return dayjs(date).isBefore(dayjs(startDate), 'day');
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

  useEffect(() => {
    fetchEnquiry();
    fetchInfo();
  }, [fetchInfo]);

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
          <Grid item>
            <Typography variant="h3">Booking Service Chart</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                onClick={() => handleButtonClick('All Services')}
                color={selectedCategory === 'All Services' ? 'primary' : 'secondary'}
                variant={selectedCategory === 'All Services' ? 'outlined' : 'text'}
              >
                All Services
              </Button>
              <Button
                onClick={() => handleButtonClick('turf')}
                color={selectedCategory === 'turf' ? 'primary' : 'secondary'}
                variant={selectedCategory === 'turf' ? 'outlined' : 'text'}
              >
                Turf
              </Button>
              <Button
                onClick={() => handleButtonClick('boardGame')}
                color={selectedCategory === 'boardGame' ? 'primary' : 'secondary'}
                variant={selectedCategory === 'boardGame' ? 'outlined' : 'text'}
              >
                Board Game
              </Button>
              <Button
                onClick={() => handleButtonClick('playstation')}
                color={selectedCategory === 'playstation' ? 'primary' : 'secondary'}
                variant={selectedCategory === 'playstation' ? 'outlined' : 'text'}
              >
                Play Station
              </Button>
              <Button
                onClick={() => handleButtonClick('cricketNet')}
                color={selectedCategory === 'cricketNet' ? 'primary' : 'secondary'}
                variant={selectedCategory === 'cricketNet' ? 'outlined' : 'text'}
              >
                Cricket Net
              </Button>
              <Button
                onClick={() => handleButtonClick('bowlingMachine')}
                color={selectedCategory === 'bowlingMachine' ? 'primary' : 'secondary'}
                variant={selectedCategory === 'bowlingMachine' ? 'outlined' : 'text'}
              >
                Bowling Machine
              </Button>
              <Button
                onClick={() => handleButtonClick('badminton')}
                color={selectedCategory === 'badminton' ? 'primary' : 'secondary'}
                variant={selectedCategory === 'badminton' ? 'outlined' : 'text'}
              >
                Badminton
              </Button>
            </Stack>
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
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h3">Payment Chart</Typography>
          </Grid>
          <Grid item>
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
