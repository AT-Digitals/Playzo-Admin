import * as XLSX from 'xlsx';
import dayjs from 'dayjs';

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
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');

  const [isApplyMode, setIsApplyMode] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [paymentType, setPaymentType] = useState('');
  const [filterData, setFilterData] = useState();
  const [bool, setBool] = useState(false);

  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);

  const handleButtonClick = () => {
    setFilteredData(data);
    setBookingType('All');
    setMonthType('');
    setIsApplyMode(true);
    setStartDateValue('');
    setEndDateValue('');
    setPaymentType('');
    setButtonDisable(false);
    setBool(false);
    setStartDateError(false);
    setEndDateError(false);
  };

  const buttonhandleChange = (event, newValue) => {
    setMonthType(newValue);
    setStartDateValue('');
    setEndDateValue('');
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
    let startdatedata = newValue.$d;
    console.log('startdate', startdatedata);
    const parsedDate = moment(startdatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    console.log('startdate', formattedDate);
    setStartDateValue(formattedDate);
    setStartDateError(false);
  };
  const handleEndDateChange = (newValue) => {
    let enddatedata = newValue.$d;
    console.log('enddate', enddatedata);
    const parsedDate = moment(enddatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    console.log('enddate', formattedDate);
    setEndDateValue(formattedDate);
    setEndDateError(false);
  };

  const fetchInfo = useCallback(async () => {
    try {
      if (bool && filterData) {
        if (filterData.type === 'All') {
          filterData.type = '';
        }

        const res = await BookingApi.filterBook(filterData).then((data) => {
          setCount(data.length);
          setData(data);
        });
        let a = filterData;
        a.page = page + 1;
        a.limit = rowsPerPage;
        const res1 = await BookingApi.filterPage(a).then((data) => {
          setFilteredData(data);
        });
      } else {
        const res = await BookingApi.getAll({}).then((data) => {
          setCount(data.length);
          setData(data);
        });
        const res1 = await BookingApi.getAllPaging({ page: page + 1, limit: rowsPerPage }).then((data) => {
          setFilteredData(data);
        });
      }
    } catch {
      console.log('Error fetching data');
    }
  }, [bool, filterData, page, rowsPerPage]);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  // const isWithinLastMonths = (startDate, months) => {
  //   const currentDate = new Date();

  //   const currentYear = currentDate.getFullYear();
  //   const currentMonth = currentDate.getMonth();

  //   const startYear = startDate.getFullYear();
  //   const startMonth = startDate.getMonth();

  //   if (startYear > currentYear || (startYear === currentYear && startMonth > currentMonth)) {
  //     return false;
  //   }

  //   const monthDiff = (currentYear - startYear) * 12 + currentMonth - startMonth;

  //   return monthDiff <= months;
  // };

  const applyFilters = useCallback(async () => {
    if (startDateValue && endDateValue === '') {
      setEndDateError(true);
    }

    if (endDateValue && startDateValue === '') {
      setStartDateError(true);
    }

    if (bookingType !== 'All' || startDateValue !== '' || endDateValue !== '' || paymentType !== '' || monthType !== '') {
      const details = {
        type: bookingType,
        startDate: startDateValue,
        endDate: endDateValue,
        bookingtype: paymentType,
        monthType: monthType
      };

      let dateFilter = '';
      if (monthType === 'oneMonth') {
        dateFilter = DateUtils.subtract(new Date(), 1, 'month', 'yyyy-MM-DD');
      } else if (monthType === 'threeMonth') {
        dateFilter = DateUtils.subtract(new Date(), 3, 'month', 'yyyy-MM-DD');
      } else if (monthType === 'sixMonth') {
        dateFilter = DateUtils.subtract(new Date(), 6, 'month', 'yyyy-MM-DD');
      } else if (monthType === 'oneYear') {
        dateFilter = DateUtils.subtract(new Date(), 1, 'year', 'yyyy-MM-DD');
      }

      console.log('dateFilter', dateFilter);
      if (details.startDateValue && details.endDateValue && dateFilter === '') {
        const a = DateUtils.add(new Date(details.endDateValue), 1, 'day');
        details.endDateValue = DateUtils.formatDate(new Date(a), 'yyyy-MM-DD');
      }

      if (dateFilter !== '') {
        const currentDateValue = DateUtils.add(new Date(), 1, 'day');
        details.endDateValue = DateUtils.formatDate(new Date(currentDateValue), 'yyyy-MM-DD');
        details.startDateValue = DateUtils.formatDate(new Date(dateFilter), 'yyyy-MM-DD');
      }
      console.log('dateFilter', dateFilter);
      setFilterData(details);
      console.log('details', details);
      setBool(true);
    } else {
      setBool(false);
    }

    setIsApplyMode(false);
    //setPage(0);
    setButtonDisable(true);
  }, [bookingType, endDateValue, monthType, paymentType, startDateValue]);

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();

    const ModifiedData = filteredData.map((item) => ({
      ...item,
      startTime: DateUtils.formatMillisecondsToTime(item.startTime),
      endTime: DateUtils.formatMillisecondsToTime(item.endTime),
      startDate: moment(item.startDate).format('YYYY-MM-DD'),
      endDate: moment(item.endDate).format('YYYY-MM-DD'),
      user: JSON.parse(item.user).name,
      userType: JSON.parse(item.user).userType,
      email: JSON.parse(item.user).email
    }));

    const ws = XLSX.utils.json_to_sheet(ModifiedData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'table_data.xlsx');
  };

  const shouldDisableEndDate = (date) => {
    if (!startDateValue) {
      return false;
    }
    return dayjs(date).isBefore(dayjs(startDateValue), 'day');
  };

  const shouldDisableStartDate = (date) => {
    if (!endDateValue) {
      return false;
    }
    return dayjs(date).isAfter(dayjs(endDateValue), 'day');
  };

  const columns = [
    { id: 'No', label: 'No' },
    // { id: 'id', label: 'Id' },
    { id: 'type', label: 'Type' },
    { id: 'user', label: 'User Name' },
    { id: 'startDate', label: 'Start Date' },
    { id: 'endDate', label: 'End Date' },
    { id: 'startTime', label: 'Start Time' },
    { id: 'endTime', label: 'End Time' },
    { id: 'bookingtype', label: 'Booking Type' },
    {
      id: 'bookingAmount',

      label: 'Booking Amount'
    },
    { id: 'userType', label: 'User Type' },
    { id: 'userId', label: 'Email ID' },
    { id: 'bookingId', label: 'PaymentId' }
  ];

  return (
    <>
      <MainCard title="Booking List">
        <Stack direction="column" spacing={4}>
          <Stack direction="row" spacing={4} justifyContent="space-between" alignItems="center">
            <Box sx={{ width: '200px' }}>
              <Stack spacing={3}>
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
                date={startDateValue}
                setDate={handleStartDateChange}
                disablePast={false}
                disableprop={buttonDisable}
                shouldDisableDate={shouldDisableStartDate}
                error={startDateError}
              />
              <CustomDatePicker
                label="End Date"
                date={endDateValue}
                setDate={handleEndDateChange}
                disablePast={false}
                disableprop={buttonDisable}
                shouldDisableDate={shouldDisableEndDate}
                error={endDateError}
              />
              <Stack sx={{ minWidth: 200 }} spacing={3}>
                <Typography>Payment Type</Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={paymentType}
                    onChange={handlePaymentChange}
                    disabled={buttonDisable}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
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
        </Stack>
      </MainCard>
      <MainCard sx={{ marginTop: '30px' }}>
        <CommonTable
          columns={columns}
          count={count}
          data={filteredData}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChange={handleChangePage}
        />
      </MainCard>
    </>
  );
}
