// assets

import AddBoxIcon from '@mui/icons-material/AddBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

// icons
const icons = {
  FormatListBulletedIcon,
  CalendarMonthIcon,
  AddBoxIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

export const bookingAll = {
  id: 'bookings',
  title: 'Bookings',
  type: 'group',
  children: [
    {
      id: 'booking list',
      title: 'Booking List',
      type: 'item',
      url: '/bookingList',
      icon: icons.FormatListBulletedIcon
    },
    {
      id: 'calendar booking',
      title: 'Calendar Booking',
      type: 'item',
      url: '/calendarBooking',
      icon: icons.CalendarMonthIcon
    },
    {
      id: 'Add Bookings',
      title: 'Add Bookings',
      type: 'item',
      url: '/addBookings',
      icon: icons.AddBoxIcon
    }
  ]
};

export const bookingRead = {
  id: 'bookings',
  title: 'Bookings',
  type: 'group',
  children: [
    {
      id: 'booking list',
      title: 'Booking List',
      type: 'item',
      url: '/bookingList',
      icon: icons.FormatListBulletedIcon
    },
    {
      id: 'calendar booking',
      title: 'Calendar Booking',
      type: 'item',
      url: '/calendarBooking',
      icon: icons.CalendarMonthIcon
    }
  ]
};
