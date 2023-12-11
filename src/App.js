// project import

import Api from '../src/utils/Api';
import Routes from 'routes';
import ScrollTop from 'components/ScrollTop';
import StoreInstance from '../src/store/StoreInstance';
import ThemeCustomization from 'themes';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
StoreInstance.setApi(Api);
StoreInstance.setToast(() => toast);
const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <Routes />
    </ScrollTop>
  </ThemeCustomization>
);

export default App;
