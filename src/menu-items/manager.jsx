// assets
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

// icons
const icons = {
  DescriptionOutlinedIcon,  // Thông tin khách thuê
  GroupOutlinedIcon,        // Thông tin nhân viên
  ApartmentOutlinedIcon,    // Thông tin loại phòng
  HomeOutlinedIcon,         // Thông tin phòng
  AssignmentOutlinedIcon,   // Thông tin hợp đồng
  GroupAddOutlinedIcon,     // Thông tin người ở cùng
  BuildOutlinedIcon,        // Dịch vụ phòng
  OpacityOutlinedIcon,      // Chỉ số điện nước
  BoltOutlinedIcon,         // Dịch vụ phòng
  ReceiptOutlinedIcon,      // Thông tin hóa đơn
  PaymentOutlinedIcon,      // Lịch sử thanh toán
  EqualizerOutlinedIcon,    // Thống kê
  ReportProblemOutlinedIcon // Thông tin khiếu nại
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const manager = {
  id: 'managerRenter',
  title: 'Quản lý',
  type: 'group',
  children: [
    {
      id: 'managerRenter',
      title: 'Thông tin khách thuê',
      type: 'item',
      url: '/manager/renter',
      icon: icons.DescriptionOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerStaff',
      title: 'Thông tin nhân viên',
      type: 'item',
      url: '/manager/staff',
      icon: icons.GroupOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerRoomType',
      title: 'Thông tin loại phòng',
      type: 'item',
      url: '/manager/roomType',
      icon: icons.ApartmentOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerRoom',
      title: 'Thông tin phòng',
      type: 'item',
      url: '/manager/room',
      icon: icons.HomeOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerContract',
      title: 'Thông tin hợp đồng',
      type: 'item',
      url: '/manager/contract',
      icon: icons.AssignmentOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerContractMember',
      title: 'Thông tin người ở cùng',
      type: 'item',
      url: '/manager/contractMember',
      icon: icons.GroupAddOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerService',
      title: 'Thông tin dịch vụ',
      type: 'item',
      url: '/manager/service',
      icon: icons.BuildOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerElectricWater',
      title: 'Chỉ số điện nước',
      type: 'item',
      url: '/manager/electricwater',
      icon: icons.OpacityOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerRoomService',
      title: 'Dịch vụ phòng',
      type: 'item',
      url: '/manager/roomService',
      icon: icons.BoltOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerRoomReturn',
      title: 'Trả phòng',
      type: 'item',
      url: '/manager/roomReturn',
      icon: icons.HomeOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerBill',
      title: 'Thông tin hóa đơn',
      type: 'item',
      url: '/manager/bill',
      icon: icons.ReceiptOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerPayment',
      title: 'Lịch sử thanh toán',
      type: 'item',
      url: '/manager/payment',
      icon: icons.PaymentOutlinedIcon,
      breadcrumbs: false
    },

    // {
    //   id: 'managerTK',
    //   title: 'Thống kê',
    //   type: 'item',
    //   url: '/manager/report',
    //   icon: icons.EqualizerOutlinedIcon,
    //   breadcrumbs: false
    // },
    {
      id: 'managerComplaint',
      title: 'Thông tin khiếu nại',
      type: 'item',
      url: '/manager/blog',
      icon: icons.ReportProblemOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default manager;
