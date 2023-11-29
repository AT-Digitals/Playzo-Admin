// material-ui
import { Grid, Button, Stack } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const BookingPage = () => (
  <MainCard title="">
    <Stack direction="row" spacing={4}>
      <Button variant="contained" sx={{ backgroundColor: '' }}>
        Overall Bookings
      </Button>
      <Button variant="contained">Turf Bookings</Button>
      <Button variant="contained">Playstation Bookings</Button>
      <Button variant="contained">Board Games Bookings</Button>
      <Button variant="contained">Edit Bookings</Button>
      <Button variant="contained">New Bookings</Button>
    </Stack>
    <Grid container>
      <Grid></Grid>
    </Grid>
  </MainCard>
);

export default BookingPage;
