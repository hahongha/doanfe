import { lazy } from 'react';
import ManageLayout from '../layout/ManageDashboard';
// project imports
import Loadable from 'components/Loadable';
// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const ManageRenter = Loadable(lazy(() => import('pages/manage/ManageRenter')));
const ManageBill = Loadable(lazy(() => import('pages/manage/ManageBill')));
const ManagePayment = Loadable(lazy(() => import('pages/manage/ManagePayment')));
// const ManageBillDetail = Loadable(lazy(() => import('pages/manage/ManageBillDetail')));
const ManageContract = Loadable(lazy(() => import('pages/manage/ManageContract')));
// const ManageContractHistory = Loadable(lazy(() => import('pages/manage/ManageContractHistory')));
const ManageRoomType = Loadable(lazy(() => import('pages/manage/ManageRoomType')));
const ManageProfile = Loadable(lazy(() => import('pages/manage/ManageProfile')));
const ManageRoom = Loadable(lazy(() => import('pages/manage/ManageRoom')));
const ManageContractMember = Loadable(lazy(() => import('pages/manage/ManageContractMember')));
// // const ManageEW = Loadable(lazy(() => import('pages/manage/ManageEW')));
const ManageE = Loadable(lazy(() => import('pages/manage/ManageE')));
// const ManageBillType = Loadable(lazy(() => import('pages/manage/ManageBillType')));
const BillDetailPage = Loadable(lazy(() => import('pages/manage/bill/BillDetailPage')));
const ManageEW = Loadable(lazy(() => import('pages/manage/ManageEW')));
const Blog = Loadable(lazy(() => import('pages/manage/blog/Blog')));
const BlogDetail = Loadable(lazy(() => import('pages/manage/blog/BlogDetail')));
const ManageTest = Loadable(lazy(() => import('pages/manage/ManageTest')));
const ManageStaff = Loadable(lazy(() => import('pages/manage/ManageStaff')));
const ManageTest2 = Loadable(lazy(() => import('pages/manage/ManageTest2')));
const ManageService = Loadable(lazy(() => import('pages/manage/ManageService')));
const ManageRoomReturn = Loadable(lazy(() => import('pages/manage/ManageRoomReturn')));
const ManageRoomService = Loadable(lazy(() => import('pages/manage/ManageRoomService')));
const AddContract = Loadable(lazy(() => import('pages/manage/contract/AddContract')));
const MyAccount = Loadable(lazy(() => import('pages/common/Account')));
const CreatePayment = Loadable(lazy(() => import('pages/manage/payment/PaymentForm')));
const Income = Loadable(lazy(() => import('pages/manage/report/Income')));
const Expense = Loadable(lazy(() => import('pages/manage/report/Expense')));
const Report = Loadable(lazy(() => import('pages/manage/report/Report')));
const RoomReturnFormPage = Loadable(lazy(() => import('pages/manage/roomReturn/RoomReturnPage')));
// ==============================|| MAIN ROUTING ||============================== //

const ManageRoutes = {
  path: '/manager',
  element: <ManageLayout/>,
  children: [
    {
      path: 'home',
      element: <DashboardDefault />
    },
    {
      path: 'test',
      element: <ManageTest />
    },
    {
      path: 'test2',
      element: <ManageTest2 />
    },
    ,
    {
      path: 'account',
      element: <MyAccount />
    },
    {
      path: 'profile',
      element: <ManageProfile />
    },
    {
      path: 'renter',
      element: <ManageRenter />
    },
    {
      path: 'roomType',
      element: <ManageRoomType />
    },
    {
      path: 'contract',
      element: <ManageContract />
    },
    {
      path: 'payment',
      element: <ManagePayment />
    },
    {
      path: 'room',
      element: <ManageRoom />
    },
    {
      path: 'service',
      element: <ManageService />
    },
    {
      path: 'contractMember',
      element: <ManageContractMember />
    },
    {path:"createContract",
       element: <AddContract />},
    {
      path: 'electric',
      element: <ManageE />
    },
    {
      path: 'electricwater',
      element: <ManageEW />
    },
    {
      path: 'bill',
      element: <ManageBill />
    },
    {
      path: 'roomService',
      element: <ManageRoomService />
    },
    {
      path: 'roomReturn',
      element: <ManageRoomReturn />
    },
    {
      path: 'staff',
      element: <ManageStaff />
    },
    {
      path: 'createContract/:roomId', // Thêm tham số renterId và roomId
      element: <AddContract />
    },
    {
      path: 'createRoomReturn/:contractId/:roomId', // Thêm tham số renterId và roomId
      element: <RoomReturnFormPage />
    },
    {
      path:'create-payment/:billId', // Thêm tham số renterId và roomId
      element: <CreatePayment />
    },
    {
      path:'income', // Thêm tham số renterId và roomId
      element: <Income />
    },
    {
      path:'expense', // Thêm tham số renterId và roomId
      element: <Expense />
    },
    {
      path:'report', // Thêm tham số renterId và roomId
      element: <Report />
    },
    // {
    //   path:'billType', // Thêm tham số renterId và roomId
    //   element: <ManageBillType />
    // },
    {
      path:'billDetail/bill/:billId', // Thêm tham số renterId và roomId
      element: <BillDetailPage />
    },
    {
      path:'blog', // Thêm tham số renterId và roomId
      element: <Blog />
    },
    {
      path:'blog/:statusId', // Thêm tham số renterId và roomId
      element: <BlogDetail />
    },
  ]
};

export default ManageRoutes;
