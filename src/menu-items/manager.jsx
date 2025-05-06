// assets
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

// icons
const icons = {
  DescriptionOutlinedIcon,
  HomeOutlinedIcon,
  OpacityOutlinedIcon,
  BoltOutlinedIcon,
  BuildOutlinedIcon,
  PaymentOutlinedIcon,
  ReportProblemOutlinedIcon
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
      icon: icons.PaymentOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerRoomType',
      title: 'Thông tin loại phòng',
      type: 'item',
      url: '/manager/roomType',
      icon: icons.HomeOutlinedIcon,
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
      icon: icons.HomeOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerContractMember',
      title: 'Thông tin người ở cùng',
      type: 'item',
      url: '/manager/contractMember',
      icon: icons.HomeOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerService',
      title: 'Thông tin dịch vụ',
      type: 'item',
      url: '/manager/service',
      icon: icons.HomeOutlinedIcon,
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
      id: 'managerElectric',
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
      icon: icons.BoltOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerBill',
      title: 'Thông tin hóa đơn',
      type: 'item',
      url: '/manager/bill',
      icon: icons.BoltOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'managerTest',
      title: 'Trang để test',
      type: 'item',
      url: '/manager/test',
      icon: icons.BuildOutlinedIcon,
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
    {
      id: 'managerTK',
      title: 'Thống kê',
      type: 'item',
      url: '/manager/TK',
      icon: icons.PaymentOutlinedIcon,
      breadcrumbs: false
    },
    // {
    //   id: 'managerPayment',
    //   title: 'Lịch sử thanh toán',
    //   type: 'item',
    //   url: '/manager/payment',
    //   icon: icons.PaymentOutlinedIcon,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'managerComplaint',
    //   title: 'Thông tin khiếu nại',
    //   type: 'item',
    //   url: '/manager/complaint',
    //   icon: icons.ReportProblemOutlinedIcon,
    //   breadcrumbs: false
    // }
  ]
};

export default manager;
