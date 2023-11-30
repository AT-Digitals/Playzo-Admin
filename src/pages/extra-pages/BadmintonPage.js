// material-ui

// project import
import MainCard from 'components/MainCard';
import MembershipTable from './MembershipTable';

import { Box, FormControl, InputAdornment, OutlinedInput, Stack, TextField, MenuItem, Button, Grid } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
// ==============================|| SAMPLE PAGE ||============================== //

const status = [
  {
    value: 'Monthly Members',
    label: 'Monthly Members'
  },
  {
    value: 'Yearly Members',
    label: 'Yearly Members'
  },
  {
    value: 'All Members',
    label: 'All Members'
  }
];

const BadmintonPage = () => {
  const [value, setValue] = useState('All Members');
  return (
    <MainCard title="Badminton Membership">
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
                placeholder="All Members"
              />
            </FormControl>
          </Box>
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
            <AddIcon sx={{ paddingRight: '8px' }} /> Add Membership
          </Button>
          <Button variant="outlined" sx={{ width: '200px' }}>
            <EditIcon sx={{ paddingRight: '8px' }} /> Edit Membership
          </Button>
        </Stack>
        <Grid container>
          <Grid>
            <MembershipTable />
          </Grid>
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default BadmintonPage;
