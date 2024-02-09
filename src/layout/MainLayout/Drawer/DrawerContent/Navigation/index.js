// material-ui

import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { AccessType } from 'pages/authentication/auth-forms/AccessType';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// project import

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const [userData, serUserData] = useState({});
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    const user = localStorage.getItem('user');
    serUserData(JSON.parse(user));
  }, []);
  useEffect(() => {
    if (userData.accessType === AccessType.READ) {
      setMenuList(menuItem.readItems);
    } else if (userData.accessType === AccessType.WRITE) {
      setMenuList(menuItem.writeItems);
    } else {
      setMenuList(menuItem.allItems);
    }
  }, [userData.accessType]);
  const navGroups = menuList.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
