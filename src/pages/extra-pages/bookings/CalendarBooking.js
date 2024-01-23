import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useEffect, useState } from 'react';

import BookingApi from 'api/BookingApi';
import DateUtils from 'utils/DateUtils';
import CalendarComponent from './CalendarComponent';
import { Box, Button, Stack, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MainCard from 'components/MainCard';

const CalendarBooking = () => {
  const [data, setData] = useState([]);

  const [bookingType, setBookingType] = useState('All');

  const [isApplyMode, setIsApplyMode] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);

  const handleChange = (event) => {
    setBookingType(event.target.value);
  };

  const handleButtonClick = () => {
    setBookingType('All');
    setIsApplyMode(true);
    setButtonDisable(false);
    fetchInfo();
  };

  const fetchInfo = async () => {
    const listDate = [];
    try {
      await BookingApi.getAll().then((dataList) => {
        dataList.map((list) => {
          const dateObject = new Date(list.startDate);

          const day = dateObject.getDate();
          const month = dateObject.getMonth();
          const year = dateObject.getFullYear();

          const endDate = new Date(list.endDate);
          const endday = endDate.getDate();
          const endmonth = endDate.getMonth();
          const endyear = endDate.getFullYear();

          const startMilliseconds = parseInt(list.startTime);
          const endMilliseconds = parseInt(list.endTime);

          const startTime = DateUtils.formatMillisecondsToTime(startMilliseconds);
          const endTime = DateUtils.formatMillisecondsToTime(endMilliseconds);

          const startTime24 = DateUtils.convertTo24HourFormat(startTime);
          const endTime24 = DateUtils.convertTo24HourFormat(endTime);

          const startHour = parseInt(startTime24.split(':')[0], 10);
          const startMinute = parseInt(startTime24.split(':')[1], 10);
          const endHour = parseInt(endTime24.split(':')[0], 10);
          const endMinute = parseInt(endTime24.split(':')[1], 10);

          const calendarDataList = {
            title: list.type,
            start: new Date(year, month, day, startHour, startMinute, 0, 0),
            end: new Date(endyear, endmonth, endday, endHour, endMinute, 0, 0)
          };
          listDate.push(calendarDataList);
        });

        setData(listDate);
      });
    } catch {
      console.log('vcxvcxv');
    }
  };

  const filterType = async () => {
    const listDate = [];
    try {
      await BookingApi.filterBook({ type: bookingType }).then((dataList) => {
        setData(dataList);
        dataList.map((list) => {
          const dateObject = new Date(list.startDate);
          const day = dateObject.getDate();
          const month = dateObject.getMonth();
          const year = dateObject.getFullYear();
          const endDate = new Date(list.endDate);
          const endday = endDate.getDate();
          const endmonth = endDate.getMonth();
          const endyear = endDate.getFullYear();
          const startMilliseconds = parseInt(list.startTime);
          const endMilliseconds = parseInt(list.endTime);
          const startTime = DateUtils.formatMillisecondsToTime(startMilliseconds);
          const endTime = DateUtils.formatMillisecondsToTime(endMilliseconds);
          const startTime24 = DateUtils.convertTo24HourFormat(startTime);
          const endTime24 = DateUtils.convertTo24HourFormat(endTime);
          const startHour = parseInt(startTime24.split(':')[0], 10);
          const startMinute = parseInt(startTime24.split(':')[1], 10);
          const endHour = parseInt(endTime24.split(':')[0], 10);
          const endMinute = parseInt(endTime24.split(':')[1], 10);
          const calendarDataList = {
            title: list.type,
            start: new Date(year, month, day, startHour, startMinute, 0, 0),
            end: new Date(endyear, endmonth, endday, endHour, endMinute, 0, 0)
          };
          listDate.push(calendarDataList);
        });
        setData(listDate);
      });
    } catch {
      console.log('vcxvcxv');
    }
  };

  const applyFilters = () => {
    if (bookingType !== 'All') {
      filterType();
      setIsApplyMode(false);
      setButtonDisable(true);
    } else {
      fetchInfo();
      setIsApplyMode(true);
      setButtonDisable(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <MainCard title="Calendar Booking">
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" pb={5}>
        <Box sx={{ width: '150px' }}>
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
                <MenuItem value="cricketNet">Cricket Net</MenuItem>
                <MenuItem value="ballMachine">Ball Machine</MenuItem>
                <MenuItem value="badminton">Badminton</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>
        {isApplyMode ? (
          <Button variant="outlined" onClick={applyFilters}>
            Apply
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleButtonClick}>
            Clear
          </Button>
        )}
      </Stack>
      <CalendarComponent data={data} />
    </MainCard>
  );
};

export default CalendarBooking;
