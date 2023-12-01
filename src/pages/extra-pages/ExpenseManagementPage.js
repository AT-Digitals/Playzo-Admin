// material-ui

// project import
import MainCard from 'components/MainCard';

import { Stack, TextField, MenuItem, Button, Grid } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import ExpenseTable from './ExpenseTable';
import SearchComponent from './SearchComponent';
// ==============================|| SAMPLE PAGE ||============================== //

const status = [
  {
    value: 'Today',
    label: 'Today'
  },
  {
    value: 'Weekly',
    label: 'Weekly'
  },
  {
    value: 'Monthly',
    label: 'Monthly'
  },
  {
    value: 'Yearly',
    label: 'Yearly'
  }
];

// ==============================|| SAMPLE PAGE ||============================== //

const ExpenseManagementPage = () => {
  const [value, setValue] = useState('Today');
  return (
    <MainCard title="Expense Management">
      <Stack direction="column" spacing={3}>
        <Stack direction="row" spacing={4}>
          <SearchComponent placeholder="All Purchase" />
          <TextField
            id="standard-select-currency"
            size="medium"
            select
            value={value}
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
            <AddIcon sx={{ paddingRight: '8px' }} /> Add Purchase
          </Button>
          <Button variant="outlined" sx={{ width: '200px' }}>
            <EditIcon sx={{ paddingRight: '8px' }} /> Edit Purchase
          </Button>
        </Stack>
        <Grid container>
          <Grid>
            <ExpenseTable />
          </Grid>
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default ExpenseManagementPage;
