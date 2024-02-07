// assets

import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

import { AccessType } from 'pages/authentication/auth-forms/AccessType';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  AssignmentTurnedInIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //
const user = localStorage.getItem('user');
const userData = JSON.parse(user);
const mainAll = [
  {
    id: 'enquiries',
    title: 'Enquiries',
    type: 'item',
    url: '/enquiries',
    icon: icons.ProfileOutlined
  },
  {
    id: 'amount',
    title: 'Amount List',
    type: 'item',
    url: '/amount',
    icon: icons.ProfileOutlined
  }
];
const mainRead = [
  {
    id: 'enquiries',
    title: 'Enquiries',
    type: 'item',
    url: '/enquiries',
    icon: icons.ProfileOutlined
  }
];
const mainpages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  // children: userData.accessType === AccessType.READ ? mainRead : mainAll
  children: mainAll
};

export default mainpages;
