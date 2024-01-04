import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useEffect, useState } from 'react';

import BookingApi from 'api/BookingApi';
import DateUtils from 'utils/DateUtils';
import CalendarComponent from './CalendarComponent';

const CalendarBooking = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      const listDate = [];
      try {
        await BookingApi.getAll().then((dataList) => {
          dataList.map((list) => {
            const dateObject = new Date(list.dateOfBooking);

            const day = dateObject.getDate();
            const month = dateObject.getMonth();
            const year = dateObject.getFullYear();

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
              end: new Date(year, month, day, endHour, endMinute, 0, 0)
            };
            listDate.push(calendarDataList);
          });

          setData(listDate);
        });
      } catch {
        console.log('vcxvcxv');
      }
    };

    fetchInfo();
  }, []);

  return (
    <>
      <CalendarComponent label="Calendar Booking" data={data} />
    </>
  );
};

export default CalendarBooking;
