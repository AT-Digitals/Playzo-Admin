import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import BookingApi from 'api/BookingApi';
import BookingTable from './bookingComponents/BookingTable';
import FormControl from '@mui/material/FormControl';
import MainCard from 'components/MainCard';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TimeSlotButton from './bookingComponents/TimeSlotButton';

export default function BookingListPage() {
  const [bookingType, setBookingType] = useState('All');
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setBookingType(event.target.value);
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await BookingApi.getAll().then((data) => {
          setData(data);
        });
        const details = await res.json();
        setData(details);
      } catch {
        console.log('vcxvcxv');
      }
    };

    fetchInfo();
  }, []);

  return (
    <MainCard title="Booking List">
      <Stack direction="column" spacing={4}>
        <Stack direction="row" spacing={4}>
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
          <TimeSlotButton label="Start Time" />
          <TimeSlotButton label="End Time" />
        </Stack>
        <BookingTable bookingList={data} bookingtype={bookingType} />
      </Stack>
    </MainCard>
  );
}
