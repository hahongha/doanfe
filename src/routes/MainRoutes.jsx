import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// // render - color
// const Color = Loadable(lazy(() => import('pages/component-overview/color')));
// const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
// const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// // render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    }
  ]
};

export default MainRoutes;
