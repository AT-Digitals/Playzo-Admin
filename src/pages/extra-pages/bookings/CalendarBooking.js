import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import React, { useEffect, useState } from 'react';

import BookingApi from 'api/BookingApi';
import DateUtils from 'utils/DateUtils';
import MainCard from 'components/MainCard';
import moment from 'moment';

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
            const month = DateUtils.formatDate(dateObject, 'MM');
            const year = dateObject.getFullYear();

            const startMilliseconds = parseInt(list.startTime);
            const endMilliseconds = parseInt(list.endTime);

            // const seconds = Math.floor((milliseconds / 1000) % 60);

            const startMinutes = Math.floor((startMilliseconds / 1000 / 60) % 60);

            const startHours = Math.floor((startMilliseconds / 1000 / 60 / 60) % 24);
            const endMinutes = Math.floor((endMilliseconds / 1000 / 60) % 60);

            const endHours = Math.floor((endMilliseconds / 1000 / 60 / 60) % 24);

            const calendarDataList = {
              title: list.type,
              start: new Date(year, month, day, startHours.toString().padStart(2, '0'), startMinutes.toString().padStart(2, '0'), 0, 0),
              end: new Date(year, month, day, endHours.toString().padStart(2, '0'), endMinutes.toString().padStart(2, '0'), 0, 0)
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
      <div>
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
        {/* {selectedEvent && (
          <div>
            <h2>{selectedEvent.title}</h2>
            <p>start:{selectedEvent.start}</p>
            <p>end: {selectedEvent.end}</p>
          </div>
        )} */}
      </div>
    </MainCard>
  );
};

export default CalendarBooking;
