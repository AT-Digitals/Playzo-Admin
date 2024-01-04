import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import React, { useState } from 'react';
import MainCard from 'components/MainCard';
import moment from 'moment';

const localizer = momentLocalizer(moment);
const CalendarComponent = ({ data, label }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().toDate());

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleNavigate = (date) => {
    setSelectedDate(date);
  };

  console.log('data', selectedEvent, selectedDate);

  return (
    <MainCard title={label}>
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

export default CalendarComponent;
