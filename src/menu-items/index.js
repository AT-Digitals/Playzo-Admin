// project import

import { bookingAll } from './bookingpages';
import { dashboardAll, dashboardRead, dashboardWrite } from './dashboard';
import { mainAll, mainRead } from './mainpages';
import Reports from './support';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  allItems: [dashboardAll, bookingAll, Reports, mainAll],
  writeItems: [dashboardWrite, bookingAll, Reports, mainRead],
  readItems: [dashboardRead, Reports, mainRead]
};

export default menuItems;
