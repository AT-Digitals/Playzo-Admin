// project import

import { bookingAll, bookingRead } from './bookingpages';
import { dashboardAll, dashboardRead, dashboardWrite } from './dashboard';
import mainpages, { mainAll, mainRead } from './mainpages';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  allItems: [dashboardAll, bookingAll, mainAll],
  writeItems: [dashboardWrite, bookingRead, mainRead],
  readItems: [dashboardRead, bookingRead, mainRead]
};

export default menuItems;
