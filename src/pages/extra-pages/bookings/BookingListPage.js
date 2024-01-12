import * as XLSX from 'xlsx';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import BookingApi from 'api/BookingApi';
import CommonTable from './bookingComponents/CommonTable';
import CustomDatePicker from './bookingComponents/CustomDatePicker';
import DateUtils from 'utils/DateUtils';
import FormControl from '@mui/material/FormControl';
import MainCard from 'components/MainCard';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButtonComponent from './ToggleButtonComponent';
import moment from 'moment';

export default function BookingListPage() {
  const [bookingType, setBookingType] = useState('All');
  const [data, setData] = useState([]);
  const [monthType, setMonthType] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [isApplyMode, setIsApplyMode] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [paymentType, setPaymentType] = useState('');

  const handleButtonClick = () => {
    setFilteredData(data);
    setBookingType('All');
    setMonthType('');
    setIsApplyMode(true);
    setStartDate('');
    setEndDate('');
    setPaymentType('');
    setButtonDisable(false);
  };

  const buttonhandleChange = (event, newValue) => {
    setMonthType(newValue);
  };

  const handleChange = (event) => {
    setBookingType(event.target.value);
  };

  const handlePaymentChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStartDateChange = (newValue) => {
    let enddatedata = newValue.$d;
    const parsedDate = moment(enddatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setStartDate(formattedDate);
  };
  const handleEndDateChange = (newValue) => {
    let enddatedata = newValue.$d;
    const parsedDate = moment(enddatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setEndDate(formattedDate);
  };

  const fetchInfo = useCallback(async () => {
    try {
      const res = await BookingApi.getAll({}).then((data) => {
        setCount(data.length);
        setData(data);
      });
      const res1 = await BookingApi.getAllPaging({ page: page + 1, limit: rowsPerPage }).then((data) => {
        setFilteredData(data);
      });
    } catch {
      console.log('Error fetching data');
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  const isWithinLastMonths = (startDate, months) => {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();

    if (startYear > currentYear || (startYear === currentYear && startMonth > currentMonth)) {
      return false;
    }

    const monthDiff = (currentYear - startYear) * 12 + currentMonth - startMonth;

    return monthDiff <= months;
  };

  const applyFilters = useCallback(async () => {
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
          dateFilter = isWithinLastMonths(startDate, 2);
        } else if (monthType === '6month') {
          dateFilter = isWithinLastMonths(startDate, 5);
        }
      }
      return typeFilter && dateFilter;
    });

    const details = {
      type: bookingType,
      startdate: startDate,
      enddate: endDate,
      month: monthType,
      paymentType: paymentType
    };

    console.log('details', details);

    setCount(updatedFilteredData.length);
    setFilteredData(updatedFilteredData);
    setIsApplyMode(false);
    setPage(0);
    setButtonDisable(true);
  }, []);

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();

    const ModifiedData = filteredData.map((item) => ({
      ...item,
      startTime: DateUtils.formatMillisecondsToTime(item.startTime),
      endTime: DateUtils.formatMillisecondsToTime(item.endTime),
      dateOfBooking: moment(item.dateOfBooking).format('YYYY-MM-DD'),
      user: JSON.parse(item.user).name,
      userType: JSON.parse(item.user).userType,
      email: JSON.parse(item.user).email
    }));

    const ws = XLSX.utils.json_to_sheet(ModifiedData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'table_data.xlsx');
  };

  const columns = [
    { id: 'No', label: 'No' },
    // { id: 'id', label: 'Id' },
    { id: 'type', label: 'Type' },
    { id: 'user', label: 'User Name' },
    { id: 'dateOfBooking', label: 'Selected Date' },
    { id: 'startTime', label: 'Start Time' },
    { id: 'endTime', label: 'End Time' },
    { id: 'bookingType', label: 'Booking Type' },
    {
      id: 'bookingAmount',

      label: 'Booking Amount'
    },
    { id: 'userType', label: 'User Type' },
    { id: 'userId', label: 'Email ID' },
    { id: 'bookingId', label: 'PaymentId' }
  ];

  return (
    <MainCard title="Booking List">
      <Stack direction="column" spacing={4}>
        <Stack direction="row" spacing={4} justifyContent="space-between" alignItems="center">
          <Box sx={{ width: '150px' }}>
            <Stack sx={{ minWidth: 150 }} spacing={3}>
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
                  <MenuItem value="cricketNet">Cricket Net</MenuItem>
                  <MenuItem value="ballMachine">Ball Machine</MenuItem>
                  <MenuItem value="badminton">Badminton</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <CustomDatePicker
              label="Start Date"
              date={startDate}
              setDate={handleStartDateChange}
              disablePast={false}
              disableprop={buttonDisable}
            />
            <CustomDatePicker
              label="End Date"
              date={endDate}
              setDate={handleEndDateChange}
              disablePast={false}
              disableprop={buttonDisable}
            />
            <Stack sx={{ minWidth: 150 }} spacing={3}>
              <Typography>Payment Type</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={paymentType}
                  onChange={handlePaymentChange}
                  disabled={buttonDisable}
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="online">Online</MenuItem>
                </Select>
              </FormControl>
            </Stack>
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
        <CommonTable
          columns={columns}
          count={count}
          data={filteredData}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChange={handleChangePage}
        />
      </Stack>
    </MainCard>
  );
}
