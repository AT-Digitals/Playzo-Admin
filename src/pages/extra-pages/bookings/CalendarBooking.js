import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Grid, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import BookingApi from 'api/BookingApi';
import CalendarComponent from './CalendarComponent';
import DateUtils from 'utils/DateUtils';
import FormControl from '@mui/material/FormControl';
import MainCard from 'components/MainCard';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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
        console.log('datalist', dataList);
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
          // const name = JSON.parse(list.user).name;
          // const emailaddress = JSON.parse(list.user).email;
          // const userTypeDetails = JSON.parse(item.user).userType;

          const calendarDataList = {
            title: list.type,
            start: new Date(year, month, day, startHour, startMinute, 0, 0),
            end: new Date(endyear, endmonth, endday, endHour, endMinute, 0, 0)
            // court: list.court
            // userName: name
            // email: emailaddress,
            // userType: userTypeDetails
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
    <Stack direction="column" spacing={3}>
      <MainCard title="Calendar Booking">
        <Stack direction="row" spacing={2} pb={5}>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Stack direction="column" spacing={2}>
                <Typography>All Booking Type</Typography>
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
                    <MenuItem value="bowlingMachine">Bowling Machine</MenuItem>
                    <MenuItem value="badminton">Badminton</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item md={3}>
              {isApplyMode ? (
                <Button
                  variant="outlined"
                  onClick={applyFilters}
                  sx={{ padding: '7px 15px', width: '150px', fontWeight: 600, fontSize: '15px', marginTop: '38px' }}
                >
                  Apply
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={handleButtonClick}
                  sx={{ padding: '7px 15px', width: '150px', fontWeight: 600, fontSize: '15px', marginTop: '38px' }}
                >
                  Clear
                </Button>
              )}
            </Grid>
          </Grid>
        </Stack>
      </MainCard>
      <MainCard>
        <CalendarComponent data={data} />
      </MainCard>
    </Stack>
  );
};

export default CalendarBooking;
