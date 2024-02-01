import DropDownComponent from 'pages/extra-pages/DropDownComponent';
import CustomTextField from 'pages/extra-pages/bookings/bookingComponents/CustomTextField';
import { useState } from 'react';

import { Button, Stack, Typography, Grid, Select } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import MainCard from 'components/MainCard';
import MenuItem from '@mui/material/MenuItem';
import AmountTable from './AmountTable';

const Data = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 }
];

export default function AmountPage() {
  const [bookingType, setBookingType] = useState('');
  const [amount, setAmount] = useState('');
  const [selectCourt, setSelectCourt] = useState('');
  // const [data, setData] = useState([]);

  const handleChange = (event) => {
    setBookingType(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleCourtChange = (event) => {
    setSelectCourt(event.target.value);
  };

  const addAmount = () => {
    const details = {
      bookingType: bookingType,
      amount: amount,
      court: selectCourt
    };
    console.log(details, ' amountdata');
    // if (bookingType && amount && selectCourt) {
    //   setData([...data, details]);
    // }

    setAmount('');
    setSelectCourt();
    setBookingType();
  };

  const columns = [
    { id: 'No', label: 'No' },
    { id: 'type', label: 'Booking Type' },
    { id: 'amount', label: 'Amount' },
    { id: 'court', label: 'Court' },
    { id: 'action', label: 'Action' }
  ];

  const data = [
    {
      type: 'turf',
      amount: 400,
      court: 2
    },
    {
      type: 'turf',
      amount: 400,
      court: 2
    },
    {
      type: 'turf',
      amount: 400,
      court: 2
    }
  ];

  return (
    <>
      <MainCard title="Add Amount">
        <Stack direction="column" spacing={4} width="100%" maxWidth={1120}>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Stack spacing={2}>
                <Typography>Select Booking Type</Typography>
                <FormControl fullWidth>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={bookingType || ''} onChange={handleChange}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="turf">Turf</MenuItem>
                    <MenuItem value="boardGame">Board Game</MenuItem>
                    <MenuItem value="playstation">Play Station</MenuItem>
                    <MenuItem value="cricketNet">Cricket Net</MenuItem>
                    <MenuItem value="ballMachine">Ball Machine</MenuItem>
                    <MenuItem value="badminton">Badminton</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item md={3}>
              <CustomTextField label="Enter Amount" value={amount} setValue={handleAmountChange} />
            </Grid>
            <Grid item md={3}>
              <DropDownComponent label="Select Court" value={selectCourt || ''} onChange={handleCourtChange} options={data} />
            </Grid>
            <Grid item md={3}>
              <Button variant="outlined" onClick={addAmount}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </MainCard>
      <AmountTable columns={columns} data={data} />
    </>
  );
}
