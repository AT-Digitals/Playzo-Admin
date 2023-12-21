import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import React, { useEffect, useState } from 'react';

import BookingApi from 'api/BookingApi';
import MainCard from 'components/MainCard';
import moment from 'moment';
import DateUtils from 'utils/DateUtils';

const localizer = momentLocalizer(moment);
const CalendarBooking = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().toDate());
  const [data, setData] = useState([]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleNavigate = (date) => {
    setSelectedDate(date);
  };

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
  console.log('data', selectedEvent, selectedDate);

  return (
    <MainCard title="Calendar Booking">
      <div style={{ height: '900px' }}>
        <Calendar
          selectable
          localizer={localizer}
          events={data}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onNavigate={handleNavigate}
          defaultDate={moment().toDate()}
          toolbar
          timeslots={3}
        />
      </div>
    </MainCard>
  );
};

export default CalendarBooking;
