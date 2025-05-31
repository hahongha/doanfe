import { lazy } from 'react';
import ManageLayout from '../layout/ManageDashboard';
// project imports
import Loadable from 'components/Loadable';
// render- Dashboard
const RoomReport = Loadable(lazy(() => import('pages/manage/report/RoomDashboard')));
const ContractReport = Loadable(lazy(() => import('pages/manage/report/ContractStats')));
const IndexReport = Loadable(lazy(() => import('pages/manage/report/ElectricityWaterStats')));
const ReportDashboard = Loadable(lazy(() => import('pages/manage/report/Report')));
const BillReport = Loadable(lazy(() => import('pages/manage/report/RoomDashboard')));
const ServiceReport = Loadable(lazy(() => import('pages/manage/report/RoomServiceStats')));
// ==============================|| MAIN ROUTING ||============================== //

const ReportRoutes = {
  path: '/report',
  element: <ManageLayout/>,
  children: [
    {
      path: 'profit',
      element: <ReportDashboard />
    },
    {
      path: 'room',
      element: <RoomReport />
    },
    {
      path: 'contract',
      element: <ContractReport />
    },
    {
      path: 'index',
      element: <IndexReport />
    },
    {
      path: 'bill',
      element: <BillReport />
    },
     {
      path: 'service',
      element: <ServiceReport />
    },
  ]
};

export default ReportRoutes;
