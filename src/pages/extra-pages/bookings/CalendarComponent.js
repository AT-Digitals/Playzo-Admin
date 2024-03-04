import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import React, { useState } from 'react';

import moment from 'moment';
import CalendarModalComponent from './CalendarModalComponent';

const localizer = momentLocalizer(moment);
const CalendarComponent = ({ data }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().toDate());
  const [eventModal, setEventModal] = useState(false);

  const handleSelectEvent = (event) => {
    console.log('event', event);
    setSelectedEvent(event);
    setEventModal(true);
  };

  const handleNavigate = (date) => {
    setSelectedDate(date);
  };
  const handleClose = () => {
    setEventModal(false);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      textTransform: 'capitalize' // Example background color
    };

    return {
      style: style
    };
  };

  return (
    <div style={{ height: '900px' }}>
      <Calendar
        selectable
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(e) => handleSelectEvent(e)}
        onNavigate={handleNavigate}
        defaultDate={moment().toDate()}
        toolbar
        timeslots={3}
        eventPropGetter={eventStyleGetter}
      />
      <CalendarModalComponent isOpen={eventModal} onClose={handleClose} data={selectedEvent} />
    </div>
  );
};

export default CalendarComponent;
