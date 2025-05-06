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

const user = {
  id: 'userRenter',
  title: 'Khách thuê',
  type: 'group',
  children: [
    {
      id: 'userContract',
      title: 'Thông tin hợp đồng',
      type: 'item',
      url: '/user/contract',
      icon: icons.DescriptionOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'userRoom',
      title: 'Thông tin phòng',
      type: 'item',
      url: '/user/room',
      icon: icons.HomeOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'userWater',
      title: 'Chỉ số nước',
      type: 'item',
      url: '/user/water',
      icon: icons.OpacityOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'userElectric',
      title: 'Chỉ số điện',
      type: 'item',
      url: '/user/electric',
      icon: icons.BoltOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'userTest',
      title: 'Trang để test',
      type: 'item',
      url: '/user/test',
      icon: icons.BuildOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'userPayment',
      title: 'Lịch sử thanh toán',
      type: 'item',
      url: '/user/payment',
      icon: icons.PaymentOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'userComplaint',
      title: 'Thông tin khiếu nại',
      type: 'item',
      url: '/user/complaint',
      icon: icons.ReportProblemOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default user;
