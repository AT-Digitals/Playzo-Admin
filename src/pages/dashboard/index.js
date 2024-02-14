import { useState, useEffect, useCallback } from 'react';

// material-ui
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

import BookingApi from 'api/BookingApi';
import PieChart from './PieChart';
import EnquiryApi from 'api/EnquiryApi';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [data, setData] = useState([]);
  const [enquiryData, setEnquiryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Booking Type');

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
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

  const fetchEnquiry = useCallback(async () => {
    try {
      const res = await EnquiryApi.getAll({}).then((data) => {
        setEnquiryData(data);
      });
    } catch {
      console.log('data fetching failed');
    }
  }, []);

  const calculateBookings = () => {
    const cashBooking = data.filter((item) => item.bookingtype === 'cash');
    const onlineBooking = data.filter((item) => item.bookingtype === 'online');
    const cash = cashBooking.length;
    const online = onlineBooking.length;
    const totalBooking = cash + online;
    return { cash, online, totalBooking };
  };

  const calculateBookingTypes = (data, name) => {
    const BookingType = data.filter((item) => item.type === name);
    const cashBooking = BookingType.filter((item) => item.bookingtype === 'cash');
    const onlineBooking = BookingType.filter((item) => item.bookingtype === 'online');
    const cash = cashBooking.length;
    const online = onlineBooking.length;
    const totalBooking = cash + online;
    return { cash, online, totalBooking };
  };

  const [bookingInfo, setBookingInfo] = useState(calculateBookings());
  const bookingTypeInfo = calculateBookingTypes(data, 'turf');
  const bookingType2Info = calculateBookingTypes(data, 'boardGame');
  const bookingType3Info = calculateBookingTypes(data, 'playstation');
  const bookingType4Info = calculateBookingTypes(data, 'cricketNet');
  const bookingType5Info = calculateBookingTypes(data, 'bowlingMachine');
  const bookingType6Info = calculateBookingTypes(data, 'badminton');

  useEffect(() => {
    fetchData();
    fetchEnquiry();
    setBookingInfo(calculateBookings());
  }, [data]);

  const allChartData = {
    'All Booking Type': { onlineBooking: bookingInfo.online, cashBooking: bookingInfo.cash, totalBooking: bookingInfo.totalBooking },
    Turf: { onlineBooking: bookingTypeInfo.online, cashBooking: bookingTypeInfo.cash, totalBooking: bookingTypeInfo.totalBooking },
    'Board Game': {
      onlineBooking: bookingType2Info.online,
      cashBooking: bookingType2Info.cash,
      totalBooking: bookingType2Info.totalBooking
    },
    'Play Station': {
      onlineBooking: bookingType3Info.online,
      cashBooking: bookingType3Info.cash,
      totalBooking: bookingType3Info.totalBooking
    },
    'Cricket Net': {
      onlineBooking: bookingType4Info.online,
      cashBooking: bookingType4Info.cash,
      totalBooking: bookingType4Info.totalBooking
    },
    'Bowling Machine': {
      onlineBooking: bookingType5Info.online,
      cashBooking: bookingType5Info.cash,
      totalBooking: bookingType5Info.totalBooking
    },
    Badminton: { onlineBooking: bookingType6Info.online, cashBooking: bookingType6Info.cash, totalBooking: bookingType6Info.totalBooking }
  };

  const updateChartData = (category) => {
    if (category === null) {
      const labels = Object.keys(allChartData);
      const series = Object.values(allChartData).map((data) => data.onlineBooking + data.cashBooking + totalBooking);
      return { labels, series };
    } else {
      const data = allChartData[category];
      const labels = ['Online Bookings', 'Cash Bookings', 'Total Bookings'];
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
        <AnalyticEcommerce title="Total Bookings" count={bookingInfo.totalBooking.toString()} percentage={59.3} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Cash Bookings" count={bookingInfo.cash.toString()} percentage={70.5} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Online Bookings" count={bookingInfo.online.toString()} percentage={27.4} isLoss color="warning" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Total Enquiries"
          count={enquiryData.length.toString()}
          percentage={27.4}
          isLoss
          color="warning"
          extra="$20,395"
        />
      </Grid>

      {/* row 2 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Booking Types</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                onClick={() => handleButtonClick('All Booking Type')}
                color={selectedCategory === 'All Booking Type' ? 'primary' : 'secondary'}
                variant={selectedCategory === 'All Booking Type' ? 'outlined' : 'text'}
              >
                All Boooking Type
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
