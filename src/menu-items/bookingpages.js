// assets

import { AccessType } from 'pages/authentication/auth-forms/AccessType';
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
const user = localStorage.getItem('user');
const userData = JSON.parse(user);
const bookingAll = [
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
];
const bookingRead = [
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
];
const bookingpages = {
  id: 'bookings',
  title: 'Bookings',
  type: 'group',
  children: userData.accessType === AccessType.READ ? bookingRead : bookingAll
};

export default bookingpages;
