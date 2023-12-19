import { useState, useEffect } from 'react';
import BookingTable from './bookingComponents/BookingTable';
import MainCard from 'components/MainCard';
//import BookingApi from 'api/BookingApi';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography, Stack, Box } from '@mui/material';
import BookingApi from 'api/BookingApi';

export default function BookingListPage() {
  const [bookingType, setBookingType] = useState('All');
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setBookingType(event.target.value);
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await BookingApi.getAll();
        const details = await res.json();
        console.log('dsf', details);
        setData(details);
      } catch {
        console.log('vcxvcxv');
      }
    };

    fetchInfo();
    console.log('bookingdata', data);
  }, []);

  return (
    <MainCard title="Booking List">
      <Stack direction="column" spacing={4}>
        <Box sx={{ width: '300px' }}>
          <Stack sx={{ minWidth: 200 }} spacing={3}>
            <Typography>Select Booking Type</Typography>
            <FormControl fullWidth>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={bookingType} onChange={handleChange}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="turf">Turf</MenuItem>
                <MenuItem value="boardGame">Board Game</MenuItem>
                <MenuItem value="playstation">Play Station</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>
        <BookingTable />
      </Stack>
    </MainCard>
  );
}
