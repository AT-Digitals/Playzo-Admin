import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MainCard from 'components/MainCard';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Event 1',
    start: new Date(2023, 11, 12, 10, 30, 0, 0),
    end: new Date(2023, 11, 12, 12, 30, 0, 0)
  },
  {
    title: 'Event 2',
    start: new Date(2023, 11, 15, 18, 30, 0, 0),
    end: new Date(2023, 11, 15, 22, 30, 0, 0)
  },
  {
    title: 'Event 3',
    start: new Date(2023, 11, 3, 2, 0, 0, 0),
    end: new Date(2023, 11, 3, 4, 0, 0, 0)
  },
  {
    title: 'Event 4',
    start: new Date(2023, 11, 22, 2, 30, 0, 0),
    end: new Date(2023, 11, 22, 4, 30, 0, 0)
  },
  {
    title: 'Event 5',
    start: new Date(2023, 11, 30, 8, 0, 0, 0),
    end: new Date(2023, 11, 30, 12, 0, 0, 0)
  },
  {
    title: 'Event 6',
    start: new Date(2023, 11, 12, 8, 0, 0, 0),
    end: new Date(2023, 11, 12, 10, 0, 0, 0)
  },
  {
    title: 'Event 7',
    start: new Date(2023, 11, 12, 14, 0, 0, 0),
    end: new Date(2023, 11, 12, 17, 0, 0, 0)
  },
  {
    title: 'Event 8',
    start: new Date(2023, 11, 12, 18, 0, 0, 0),
    end: new Date(2023, 11, 12, 19, 0, 0, 0)
  },
  {
    title: 'Event 9',
    start: new Date(2023, 11, 12, 19, 30, 0, 0),
    end: new Date(2023, 11, 12, 22, 30, 0, 0)
  },
  {
    title: 'Event 10',
    start: new Date(2023, 11, 12, 1, 30, 0, 0),
    end: new Date(2023, 11, 12, 2, 30, 0, 0)
  },
  {
    title: 'Event 11',
    start: new Date(2023, 11, 12, 3, 30, 0, 0),
    end: new Date(2023, 11, 12, 6, 30, 0, 0)
  },
  {
    title: 'Event 12',
    start: new Date(2023, 11, 12, 7, 0, 0, 0),
    end: new Date(2023, 11, 12, 8, 0, 0, 0)
  },
  {
    title: 'Event 13',
    start: new Date(2023, 11, 13, 1, 30, 0, 0),
    end: new Date(2023, 11, 13, 2, 30, 0, 0)
  }
];

const CalendarBooking = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().toDate());

  const handleSelectEvent = (event) => {
    console.log('event', event);
    setSelectedEvent(event);
  };
  console.log('select', selectedEvent);

  //   const convertedEvents = events.map((event) => ({
  //     ...event,
  //     start: moment(event.BookingDate, 'DD/MM/YYYY').toDate(),
  //     end: moment(event.BookingDate, 'DD/MM/YYYY').toDate()
  //   }));

  const handleNavigate = (date) => {
    setSelectedDate(date);
  };
  console.log('date', selectedDate);

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
            defaultDate={moment().toDate()}
            onSelectSlot={handleSelectEvent}
            toolbar
            onNavigate={handleNavigate}
            timeslots={3}
          />
        </div>
        {selectedEvent && (
          <div>
            <h2>{selectedEvent.title}</h2>
            <p>start:{selectedEvent.start}</p>
            <p>end: {selectedEvent.end}</p>
          </div>
        )}
      </div>
    </MainCard>
  );
};

export default CalendarBooking;
