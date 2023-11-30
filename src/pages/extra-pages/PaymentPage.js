// material-ui
import { Grid, Stack, MenuItem, Box, TextField } from '@mui/material';
import { useState } from 'react';

import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import PaymentTable from './PaymentTable';

const status = [
  {
    value: 'All Payments',
    label: 'All Payments'
  },
  {
    value: 'Pending Payments',
    label: 'Pending Payments'
  },
  {
    value: 'Paid Payments',
    label: 'Paid Payments'
  },
  {
    value: 'Partialy Paid Payments',
    label: 'Partialy Paid Payments'
  }
];

// ==============================|| SAMPLE PAGE ||============================== //

const PaymentPage = () => {
  const [value, setValue] = useState('All Payments');
  return (
    <MainCard title="Payments">
      <Stack direction="column" spacing={3}>
        <Stack direction="row" spacing={4}>
          <Box sx={{ width: '250px', ml: { xs: 0, md: 1 } }}>
            <FormControl>
              <OutlinedInput
                size="small"
                id="header-search"
                startAdornment={
                  <InputAdornment position="start" sx={{ mr: -0.5 }}>
                    <SearchOutlined />
                  </InputAdornment>
                }
                aria-describedby="header-search-text"
                inputProps={{
                  'aria-label': 'weight'
                }}
                sx={{ '.MuiInputBase-input.MuiOutlinedInput-input': { padding: '15px 20px' } }}
                placeholder="All Payments"
              />
            </FormControl>
          </Box>
          <TextField
            id="standard-select-currency"
            size="medium"
            select
            value={value}
            maxWidth="200px"
            onChange={(e) => setValue(e.target.value)}
            sx={{ '& .MuiInputBase-input': { padding: '15px 20px', fontSize: '0.875rem', width: '250px' } }}
          >
            {status.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Grid container>
          <Grid>
            <PaymentTable />
          </Grid>
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default PaymentPage;
