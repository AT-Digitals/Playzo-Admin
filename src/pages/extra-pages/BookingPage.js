// material-ui
import { Grid, Button, Stack, MenuItem, TextField } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

// project import
import MainCard from 'components/MainCard'
import BookingTable from './BookingTable'
import SearchComponent from './SearchComponent'
import TimeSlotComponet from './TimeSlotComponent'

const status = [
  {
    value: 'All Bookings',
    label: 'All Bookings',
  },
  {
    value: 'Turf Booking',
    label: 'Turf Booking',
  },
  {
    value: 'play Station Booking',
    label: 'play Station Booking',
  },
  {
    value: 'Board Games Booking',
    label: 'Board Games Booking',
  },
]

// ==============================|| SAMPLE PAGE ||============================== //

const BookingPage = () => {
  const [value, setValue] = useState('All Bookings')
  return (
    <MainCard title="Bookings">
      <Stack direction="column" spacing={3}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} gutterBottom>
                  Total Members
                </Typography>
                <Typography variant="body2">200</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} gutterBottom>
                  Turf Bookings
                </Typography>
                <Typography variant="body2">50</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} gutterBottom>
                  Play station Bookings
                </Typography>
                <Typography variant="body2">80</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} gutterBottom>
                  Board Game Bookings
                </Typography>
                <Typography variant="body2">70</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={4}>
          <SearchComponent placeholder="All Bookings" />
          <TextField
            id="standard-select-currency"
            size="medium"
            select
            value={value}
            width="200px"
            onChange={(e) => setValue(e.target.value)}
            sx={{ '& .MuiInputBase-input': { padding: '15px 20px', fontSize: '0.875rem', width: '250px' } }}
          >
            {status.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" sx={{ width: '200px' }}>
            <AddIcon sx={{ paddingRight: '8px' }} /> Add booking
          </Button>
          <Button variant="outlined" sx={{ width: '200px' }}>
            <EditIcon sx={{ paddingRight: '8px' }} /> Edit Bookings
          </Button>
        </Stack>
        <Grid container>
          <Grid>
            <BookingTable />
          </Grid>
        </Grid>
        <TimeSlotComponet />
      </Stack>
    </MainCard>
  )
}

export default BookingPage
