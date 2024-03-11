// project import

import { bookingAll, bookingRead } from './bookingpages';
import { dashboardAll, dashboardRead, dashboardWrite } from './dashboard';
import { mainAll, mainRead } from './mainpages';
import Reports from './support';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  allItems: [dashboardAll, bookingAll, Reports, mainAll],
  writeItems: [dashboardWrite, bookingAll, mainRead],
  readItems: [dashboardRead, bookingRead, mainRead]
};

export default menuItems;
