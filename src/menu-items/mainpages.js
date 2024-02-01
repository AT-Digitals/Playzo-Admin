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
      id: 'enquiries',
      title: 'Enquiries',
      type: 'item',
      url: '/enquiries',
      icon: icons.ProfileOutlined
    },
    {
      id: 'amount',
      title: 'Add Amount',
      type: 'item',
      url: '/amount',
      icon: icons.ProfileOutlined
    }
  ]
};

export default mainpages;
