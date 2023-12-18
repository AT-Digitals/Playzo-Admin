// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  AssignmentTurnedInIcon
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
      icon: icons.AssignmentTurnedInIcon
    },
    {
      id: 'calendar booking',
      title: 'Calendar Booking',
      type: 'item',
      url: '/calendarBooking',
      icon: icons.ProfileOutlined
    },
    {
      id: 'Add Bookings',
      title: 'Add Bookings',
      type: 'item',
      url: '/expense-management',
      icon: icons.AssignmentTurnedInIcon
    },
    {
      id: 'payments',
      title: 'Payments',
      type: 'item',
      url: '/payments',
      icon: icons.ProfileOutlined
    }
  ]
};

export default bookingpages;
