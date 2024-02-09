// assets

import { DashboardOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  UsergroupAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

export const dashboardAll = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
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
  ]
};

export const dashboardWrite = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
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
  ]
};

export const dashboardRead = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};
