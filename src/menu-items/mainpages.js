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

const mainpages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'bookings',
      title: 'Bookings',
      type: 'item',
      url: '/bookings',
      icon: icons.AssignmentTurnedInIcon
    },
    {
      id: 'badminton',
      title: 'Badminton',
      type: 'item',
      url: '/badminton',
      icon: icons.ProfileOutlined
    },
    {
      id: 'expense-management',
      title: 'Expense Management',
      type: 'item',
      url: '/expense-management',
      icon: icons.AssignmentTurnedInIcon
    }
  ]
};

export default mainpages;
