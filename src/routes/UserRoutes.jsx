import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import UserLayout from '../layout/UserDashboard';

// Lazy load các trang user
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const BlogDetail = Loadable(lazy(() => import('pages/user/blog/BlogDetail')));
const RenterBill = Loadable(lazy(() => import('pages/user/RenterBill')));
const RenterPayment = Loadable(lazy(() => import('pages/user/RenterPayment')));
const RenterBillDetail = Loadable(lazy(() => import('pages/user/RenterBillDetail')));
const RenterContract = Loadable(lazy(() => import('pages/user/RenterContract')));
const RenterContractHistory = Loadable(lazy(() => import('pages/user/RenterContractHistory')));
const RenterPaymentHistory = Loadable(lazy(() => import('pages/user/RenterPaymentHistory')));
const RenterProfile = Loadable(lazy(() => import('pages/user/RenterProfile')));
const RenterBlog = Loadable(lazy(() => import('pages/user/RenterBlog')));
const RenterE = Loadable(lazy(() => import('pages/user/RenterE')));
const RenterW = Loadable(lazy(() => import('pages/user/RenterW')));
const RenterRoom = Loadable(lazy(() => import('pages/user/RenterRoom')));
const UserTest = Loadable(lazy(() => import('pages/user/UserTest')));
const UserTest2 = Loadable(lazy(() => import('pages/user/UserTest2')));
const MyAccount = Loadable(lazy(() => import('pages/common/Account')));

// ==============================|| MAIN ROUTING ||============================== //

const UserRoutes = {
  path: '/user',
  element: <UserLayout />,
  children: [
    { path: 'home', element: <DashboardDefault /> },
    { path: 'test', element: <UserTest /> },
    { path: 'test2', element: <UserTest2 /> },
    { path: 'account', element: <MyAccount /> },
    { path: 'profile', element: <RenterProfile /> },
    { path: 'contract', element: <RenterContract /> },
    { path: 'paymentHistory', element: <RenterPaymentHistory /> },
    { path: 'payment', element: <RenterPayment /> },
    { path: 'room', element: <RenterRoom /> },
    { path: 'electric', element: <RenterE /> },
    { path: 'water', element: <RenterW /> },
    { path: 'bill', element: <RenterBill /> },
    { path: 'blog', element: <RenterBlog /> },
    {
      path:'blog/:statusId', // Thêm tham số renterId và roomId
      element: <BlogDetail />
    },
  ],
};

export default UserRoutes;
