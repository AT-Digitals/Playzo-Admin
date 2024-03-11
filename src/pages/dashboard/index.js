import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import BookingApi from 'api/BookingApi';
import EnquiryApi from 'api/EnquiryApi';
import MainCard from 'components/MainCard';
import PieChart from './PieChart';
import CustomDatePicker from '../extra-pages/bookings/bookingComponents/CustomDatePicker';

// material-ui

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [data, setData] = useState([]);
  const [enquiryData, setEnquiryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [date, setDate] = useState('');

  const [selectPaymentType, setSelectPaymentType] = useState('All Payments');

  const handlePaymentTypeChange = (type) => {
    setSelectPaymentType(type);
  };

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  const dateHandler = (newValue) => {
    let datedata = newValue.$d;
    const parsedDate = moment(datedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setDate(formattedDate);
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await BookingApi.getAll({}).then((data) => {
        setData(data);
      });
    } catch {
      console.log('data fetching failed');
    }
  }, []);

  console.log('data', data);

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

  useEffect(() => {
    fetchData();
    fetchEnquiry();
  }, []);

  const allChartData = {
    'All Services': { onlineBooking: bookingInfo.online, cashBooking: bookingInfo.manual, totalBooking: bookingInfo.totalBooking },
    Turf: { onlineBooking: bookingTypeInfo.online, cashBooking: bookingTypeInfo.manual, totalBooking: bookingTypeInfo.totalBooking },
    'Board Game': {
      onlineBooking: bookingType2Info.online,
      cashBooking: bookingType2Info.manual,
      totalBooking: bookingType2Info.totalBooking
    },
    'Play Station': {
      onlineBooking: bookingType3Info.online,
      cashBooking: bookingType3Info.manual,
      totalBooking: bookingType3Info.totalBooking
    },
    'Cricket Net': {
      onlineBooking: bookingType4Info.online,
      cashBooking: bookingType4Info.manual,
      totalBooking: bookingType4Info.totalBooking
    },
    'Bowling Machine': {
      onlineBooking: bookingType5Info.online,
      cashBooking: bookingType5Info.manual,
      totalBooking: bookingType5Info.totalBooking
    },
    Badminton: { onlineBooking: bookingType6Info.online, cashBooking: bookingType6Info.manual, totalBooking: bookingType6Info.totalBooking }
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

  const updateChartPaymentData = (category) => {
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

  const chartData = updateChartData(selectedCategory);

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
          <Grid item xs={12} marginBottom={3}>
            <Typography variant="h3">Booking Chart</Typography>
          </Grid>
          <Grid item xs={12} marginBottom={3}>
            <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
              <CustomDatePicker date={date} setDate={dateHandler} />
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button
                  onClick={() => handleButtonClick('All Services')}
                  color={selectedCategory === 'All Services' ? 'primary' : 'secondary'}
                  variant={selectedCategory === 'All Services' ? 'outlined' : 'text'}
                >
                  All Services
                </Button>
                <Button
                  onClick={() => handleButtonClick('Turf')}
                  color={selectedCategory === 'Turf' ? 'primary' : 'secondary'}
                  variant={selectedCategory === 'Turf' ? 'outlined' : 'text'}
                >
                  Turf
                </Button>
                <Button
                  onClick={() => handleButtonClick('Board Game')}
                  color={selectedCategory === 'Board Game' ? 'primary' : 'secondary'}
                  variant={selectedCategory === 'Board Game' ? 'outlined' : 'text'}
                >
                  Board Game
                </Button>
                <Button
                  onClick={() => handleButtonClick('Play Station')}
                  color={selectedCategory === 'Play Station' ? 'primary' : 'secondary'}
                  variant={selectedCategory === 'Play Station' ? 'outlined' : 'text'}
                >
                  Play Station
                </Button>
                <Button
                  onClick={() => handleButtonClick('Cricket Net')}
                  color={selectedCategory === 'Cricket Net' ? 'primary' : 'secondary'}
                  variant={selectedCategory === 'Cricket Net' ? 'outlined' : 'text'}
                >
                  Cricket Net
                </Button>
                <Button
                  onClick={() => handleButtonClick('Bowling Machine')}
                  color={selectedCategory === 'Bowling Machine' ? 'primary' : 'secondary'}
                  variant={selectedCategory === 'Bowling Machine' ? 'outlined' : 'text'}
                >
                  Bowling Machine
                </Button>
                <Button
                  onClick={() => handleButtonClick('Badminton')}
                  color={selectedCategory === 'Badminton' ? 'primary' : 'secondary'}
                  variant={selectedCategory === 'Badminton' ? 'outlined' : 'text'}
                >
                  Badminton
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <PieChart selectData={chartData} />
          </Box>
        </MainCard>
      </Grid>

      {/* row 3 */}
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
            <PieChart selectData={chartData} />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
