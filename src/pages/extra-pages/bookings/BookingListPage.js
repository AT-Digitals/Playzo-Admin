import { Box, Stack, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import moment from 'moment';
import DateUtils from 'utils/DateUtils';

import BookingApi from 'api/BookingApi';
import BookingTable from './bookingComponents/BookingTable';
import FormControl from '@mui/material/FormControl';
import MainCard from 'components/MainCard';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButtonComponent from './ToggleButtonComponent';
import * as XLSX from 'xlsx';

export default function BookingListPage() {
  const [bookingType, setBookingType] = useState('All');
  const [data, setData] = useState([]);
  const [monthType, setMonthType] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [isApplyMode, setIsApplyMode] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);

  const handleButtonClick = () => {
    setFilteredData(data);
    setBookingType('All');
    setMonthType('');
    setIsApplyMode(true);
    setButtonDisable(false);
  };

  const buttonhandleChange = (event, newValue) => {
    setMonthType(newValue);
  };

  const handleChange = (event) => {
    setBookingType(event.target.value);
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await BookingApi.getAll().then((data) => {
          setData(data);
          setFilteredData(data);
        });
        const details = await res.json();
        setData(details);
      } catch {
        console.log('Error fetching data');
      }
    };

    fetchInfo();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const applyFilters = () => {
    const updatedFilteredData = data.filter((item) => {
      let typeFilter;
      if (bookingType === 'All') {
        typeFilter = true;
      } else {
        typeFilter = item.type === bookingType;
      }

      let dateFilter = true;
      const currentDate = new Date();

      if (monthType) {
        const startDate = new Date(item.dateOfBooking);

        if (monthType === '1month') {
          dateFilter = currentDate.getMonth() === startDate.getMonth();
        } else if (monthType === '3month') {
          dateFilter = currentDate.getMonth() - startDate.getMonth() <= 2;
        } else if (monthType === '6month') {
          dateFilter = currentDate.getMonth() - startDate.getMonth() <= 5;
        }
      }
      return typeFilter && dateFilter;
    });

    setFilteredData(updatedFilteredData);
    setIsApplyMode(false);
    setPage(0);
    setButtonDisable(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const value = (id) => {
    const localId = localStorage.getItem('id');
    if (id === localId) {
      const name = localStorage.getItem('name');
      return name;
    }
  };

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();

    const ModifiedData = filteredData.map((item) => ({
      ...item,
      startTime: DateUtils.formatMillisecondsToTime(item.startTime),
      endTime: DateUtils.formatMillisecondsToTime(item.endTime),
      dateOfBooking: moment(item.dateOfBooking).format('YYYY-MM-DD'),
      user: value(item.user)
    }));
    console.log('modify', ModifiedData);

    const ws = XLSX.utils.json_to_sheet(ModifiedData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'table_data.xlsx');
  };

  return (
    <MainCard title="Booking List">
      <Stack direction="column" spacing={4}>
        <Stack direction="row" spacing={4} justifyContent="space-between" alignItems="center">
          <Box sx={{ width: '300px' }}>
            <Stack sx={{ minWidth: 200 }} spacing={3}>
              <Typography>Select Booking Type</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bookingType}
                  onChange={handleChange}
                  disabled={buttonDisable}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="turf">Turf</MenuItem>
                  <MenuItem value="boardGame">Board Game</MenuItem>
                  <MenuItem value="playstation">Play Station</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <ToggleButtonComponent value={monthType} setValue={buttonhandleChange} disableprop={buttonDisable} />
            {isApplyMode ? (
              <Button variant="outlined" onClick={applyFilters}>
                Apply
              </Button>
            ) : (
              <Button variant="outlined" onClick={handleButtonClick}>
                Clear
              </Button>
            )}
            <Button variant="outlined" onClick={handleDownload}>
              Download
            </Button>
          </Stack>
        </Stack>
        <BookingTable
          bookingList={filteredData}
          handleChange={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Stack>
    </MainCard>
  );
}
