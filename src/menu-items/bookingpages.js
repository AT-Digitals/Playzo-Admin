// assets
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddBoxIcon from '@mui/icons-material/AddBox';

// icons
const icons = {
  FormatListBulletedIcon,
  CalendarMonthIcon,
  AddBoxIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const bookingpages = {
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

export default bookingpages;
