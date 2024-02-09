// assets

import { DashboardOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';

import { AccessType } from 'pages/authentication/auth-forms/AccessType';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  UsergroupAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const user = localStorage.getItem('user');
console.log(user);
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
    icon: icons.UsergroupAddOutlined,
    breadcrumbs: false
  },
  {
    id: 'adminusers',
    title: 'Admin Users',
    type: 'item',
    url: '/admin-users',
    icon: icons.UserOutlined,
    breadcrumbs: false
  },
  {
    id: 'users',
    title: 'Users',
    type: 'item',
    url: '/users',
    icon: icons.UserOutlined,
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
