// assets

import { AccessType } from 'pages/authentication/auth-forms/AccessType';
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //
const user = localStorage.getItem('user');
const userData = JSON.parse(user);
const dashboardAll = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    url: '/dashboard/default',
    icon: icons.DashboardOutlined,
    breadcrumbs: false
  },
  {
    id: 'register',
    title: 'Register',
    type: 'item',
    url: '/register',
    icon: icons.DashboardOutlined,
    breadcrumbs: false
  }
];
const dashboardRead = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    url: '/dashboard/default',
    icon: icons.DashboardOutlined,
    breadcrumbs: false
  }
];
const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: userData && userData.accessType === AccessType.ALL ? dashboardAll : dashboardRead
  // children: dashboardAll
};

export default dashboard;
