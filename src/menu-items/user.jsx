// assets
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';  // Hợp đồng
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';                // Phòng
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';          // Nước
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';                // Điện
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';  // Hóa đơn
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';    // Thanh toán
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';          // Lịch sử thanh toán
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined'; // Khiếu nại

// icons
const icons = {
  DescriptionOutlinedIcon,
  HomeOutlinedIcon,
  OpacityOutlinedIcon,
  BoltOutlinedIcon,
  ReceiptLongOutlinedIcon,
  CreditCardOutlinedIcon,
  HistoryOutlinedIcon,
  ReportGmailerrorredOutlinedIcon
};

// menu
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
      id: 'userBill',
      title: 'Thông tin hóa đơn',
      type: 'item',
      url: '/user/bill',
      icon: icons.ReceiptLongOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'userMustPay',
      title: 'Thanh toán',
      type: 'item',
      url: '/user/payment',
      icon: icons.CreditCardOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'userPayment',
      title: 'Lịch sử thanh toán',
      type: 'item',
      url: '/user/paymentHistory',
      icon: icons.HistoryOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'userComplaint',
      title: 'Thông tin khiếu nại',
      type: 'item',
      url: '/user/blog',
      icon: icons.ReportGmailerrorredOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default user;
