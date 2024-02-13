// assets

import { LoginOutlined, ProfileOutlined, WalletOutlined } from '@ant-design/icons';

import { AccessType } from 'pages/authentication/auth-forms/AccessType';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CampaignIcon from '@mui/icons-material/Campaign';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  AssignmentTurnedInIcon,
  WalletOutlined,
  CampaignIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

export const mainAll = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'enquiries',
      title: 'Enquiries',
      type: 'item',
      url: '/enquiries',
      icon: icons.CampaignIcon
    },
    {
      id: 'amount',
      title: 'Amount List',
      type: 'item',
      url: '/amount',
      icon: icons.WalletOutlined
    }
  ]
};

export const mainRead = {
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
    }
  ]
};
