import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MainCard from 'components/MainCard';
import BookingApi from 'api/BookingApi';
import DateUtils from 'utils/DateUtils';

const localizer = momentLocalizer(moment);

const events = [
  // {
  //   title: 'Event 1',
  //   start: new Date(2023, 11, 12, 10, 30, 0, 0),
  //   end: new Date(2023, 11, 12, 12, 30, 0, 0)
  // },
  // {
  //   title: 'Event 2',
  //   start: new Date(2023, 11, 15, 18, 30, 0, 0),
  //   end: new Date(2023, 11, 15, 22, 30, 0, 0)
  // },
  // {
  //   title: 'Event 3',
  //   start: new Date(2023, 11, 3, 2, 0, 0, 0),
  //   end: new Date(2023, 11, 3, 4, 0, 0, 0)
  // },
  // {
  //   title: 'Event 4',
  //   start: new Date(2023, 11, 22, 2, 30, 0, 0),
  //   end: new Date(2023, 11, 22, 4, 30, 0, 0)
  // },
  // {
  //   title: 'Event 5',
  //   start: new Date(2023, 11, 30, 8, 0, 0, 0),
  //   end: new Date(2023, 11, 30, 12, 0, 0, 0)
  // },
  // {
  //   title: 'Event 6',
  //   start: new Date(2023, 11, 12, 8, 0, 0, 0),
  //   end: new Date(2023, 11, 12, 10, 0, 0, 0)
  // },
  // {
  //   title: 'Event 7',
  //   start: new Date(2023, 11, 12, 14, 0, 0, 0),
  //   end: new Date(2023, 11, 12, 17, 0, 0, 0)
  // },
  // {
  //   title: 'Event 8',
  //   start: new Date(2023, 11, 12, 18, 0, 0, 0),
  //   end: new Date(2023, 11, 12, 19, 0, 0, 0)
  // },
  // {
  //   title: 'Event 9',
  //   start: new Date(2023, 11, 12, 19, 30, 0, 0),
  //   end: new Date(2023, 11, 12, 22, 30, 0, 0)
  // },
  // {
  //   title: 'Event 10',
  //   start: new Date(2023, 11, 12, 1, 30, 0, 0),
  //   end: new Date(2023, 11, 12, 2, 30, 0, 0)
  // },
  // {
  //   title: 'Event 11',
  //   start: new Date(2023, 11, 12, 3, 30, 0, 0),
  //   end: new Date(2023, 11, 12, 6, 30, 0, 0)
  // },
  // {
  //   title: 'Event 12',
  //   start: new Date(2023, 11, 12, 7, 0, 0, 0),
  //   end: new Date(2023, 11, 12, 8, 0, 0, 0)
  // },
  // {
  //   title: 'Event 13',
  //   start: new Date(2023, 11, 13, 1, 30, 0, 0),
  //   end: new Date(2023, 11, 13, 2, 30, 0, 0)
  // }
];

const CalendarBooking = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().toDate());
  const [data, setData] = useState([]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };
  console.log('select', selectedEvent);

  const handleNavigate = (date) => {
    setSelectedDate(date);
  };
  console.log('date', selectedDate);

  // const formatMillisecondsToTime = (ms) => {
  //   if (ms === null) {
  //     return '';
  //   }
  //   const formattedTime = moment(ms).format('hh:mm:ss a');
  //   return formattedTime;
  // };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        await BookingApi.getAll().then((data) => {
          console.log('dateofbooking', data.dateOfBooking);
          const day = DateUtils.formatDate(new Date(data.dateOfBooking), 'DD');
          const month = DateUtils.formatDate(new Date(data.dateOfBooking), 'MM');
          const year = DateUtils.formatDate(new Date(data.dateOfBooking), 'YYYY');
          console.log('day', day, month, year);
          setData(data);
        });
        // const details = await res.json();
        // setData(details);
      } catch {
        console.log('vcxvcxv');
      }
    };

    fetchInfo();
  }, []);
  console.log('data', data);

  // const newArray = data.map((array) => {
  //   const dateObject = new Date(array.dateOfBooking);
  //   const year = dateObject.getFullYear();
  //   const month = dateObject.getMonth() + 1;
  //   const day = dateObject.getDate();
  //   console.log(typeof year, typeof day, typeof month);

  //   const value = new Date(year, month, day);
  //   console.log('value', value);

  // const startTime = formatMillisecondsToTime(array.startTime);
  // const endTime = formatMillisecondsToTime(array.endTime);

  // const momentStartObject = moment.utc(array.startTime);
  // const hours = momentStartObject.hours();
  // const minutes = momentStartObject.minutes();
  // const seconds = momentStartObject.seconds();

  // const momentEndObject = moment.utc(array.endTime);

  // const ehours = momentEndObject.hours();
  // const eminutes = momentEndObject.minutes();
  // const eseconds = momentEndObject.seconds();

  //   return {
  //     title: array.type,
  //     start: array.dateOfBooking,
  //     end: array.dateOfBooking
  //   };
  // });

  return (
    <MainCard title="Calendar Booking">
      <div>
        <div style={{ height: '900px' }}>
          <Calendar
            selectable
            localizer={localizer}
            events={events}
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
