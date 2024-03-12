// assets
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

// icons
const icons = {
  FormatListBulletedIcon,
  CalendarMonthIcon
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const Reports = {
  id: 'reports',
  title: 'Reports',
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
      id: 'Calendar Bulk Bookings',
      title: 'Calendar Bulk Bookings',
      type: 'item',
      url: '/calendar-bulk-Bookings',
      icon: icons.CalendarMonthIcon
    }
  ]
};

export default Reports;
