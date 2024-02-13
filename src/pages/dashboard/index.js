import { useState, useEffect, useCallback } from 'react';

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import BookingApi from 'api/BookingApi';
import PieChart from './PieChart';
import EnquiryApi from 'api/EnquiryApi';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [value, setValue] = useState('today');
  //const [slot, setSlot] = useState('turf');
  const [count, setCount] = useState('');
  const [data, setData] = useState([]);
  const [enquiryData, setEnquiryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Booking Type');

  // const chartData = [
  //   { category: 'All Booking Type', onlineBookings: 30, cashBookings: 20, totalBookings: 100 },
  //   { category: 'Turf', onlineBookings: 30, cashBookings: 20, totalBookings: 20 },
  //   { category: 'Board Game', onlineBookings: 40, cashBookings: 10, totalBookings: 30 },
  //   { category: 'Play Station', onlineBookings: 20, cashBookings: 10, totalBookings: 40 },
  //   { category: 'Cricket Net', onlineBookings: 30, cashBookings: 10, totalBookings: 50 },
  //   { category: 'Bowling Machine', onlineBookings: 20, cashBookings: 20, totalBookings: 10 },
  //   { category: 'Badminton', onlineBookings: 50, cashBookings: 0, totalBookings: 25 }
  // ];

  // const filteredChartData =
  //   selectedCategory === 'All Booking Type' ? chartData : chartData.filter((data) => data.category === selectedCategory);

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await BookingApi.getAll({}).then((data) => {
        //setCount(res.length);
        setData(data);
      });
    } catch {
      console.log('data fetching failed');
    }
  }, []);

  const fetchEnquiry = useCallback(async () => {
    try {
      const res = await EnquiryApi.getAll({}).then((data) => {
        //setCount(res.length);
        setEnquiryData(data);
      });
    } catch {
      console.log('data fetching failed');
    }
  }, []);

  let cashBooking = data.filter((item) => item.bookingtype === 'cash');

  let onlineBooking = data.filter((item) => item.bookingtype === 'online');

  let totalBooking = cashBooking.length + onlineBooking.length;

  useEffect(() => {
    fetchData();
    fetchEnquiry();
  }, []);

  const allChartData = {
    'All Booking Type': { onlineBooking: 150, cashBooking: 150, totalBooking: 300 },
    Turf: { onlineBooking: 40, cashBooking: 10, totalBooking: 50 },
    'Board Game': { onlineBooking: 0, cashBooking: 50, totalBooking: 50 },
    'Play Station': { onlineBooking: 40, cashBooking: 10, totalBooking: 50 },
    'Cricket Net': { onlineBooking: 30, cashBooking: 30, totalBooking: 50 },
    'Bowling Machine': { onlineBooking: 40, cashBooking: 0, totalBooking: 50 },
    Badminton: { onlineBooking: 0, cashBooking: 50, totalBooking: 50 }
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
        <AnalyticEcommerce title="Total Bookings" count={data.length.toString()} percentage={59.3} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Cash Bookings" count={cashBooking.length.toString()} percentage={70.5} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Online Bookings" count={onlineBooking.length.toString()} percentage={27.4} isLoss color="warning" />
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
            {/* <IncomeAreaChart slot={slot} /> */}
            <PieChart selectData={chartData} />
          </Box>
        </MainCard>
      </Grid>
      {/* <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid> */}

      {/* row 3
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid> */}

      {/* row 4
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Sales Report</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 1.75 }}>
          <Stack spacing={1.5} sx={{ mb: -12 }}>
            <Typography variant="h6" color="secondary">
              Net Profit
            </Typography>
            <Typography variant="h4">$1560</Typography>
          </Stack>
          <SalesColumnChart />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'success.main',
                    bgcolor: 'success.lighter'
                  }}
                >
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    78%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                  }}
                >
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    8%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'error.main',
                    bgcolor: 'error.lighter'
                  }}
                >
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    16%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Need Help?
            </Button>
          </Stack>
        </MainCard> */}
      {/* {/* </Grid> */}
    </Grid>
  );
};

export default DashboardDefault;
