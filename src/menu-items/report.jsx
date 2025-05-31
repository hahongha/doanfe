// assets
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

// icons
const icons = {
  DescriptionOutlinedIcon, // fallback icon
  HomeOutlinedIcon,        // Phòng
  OpacityOutlinedIcon,     // Nước
  BoltOutlinedIcon,        // Điện
  BuildOutlinedIcon,       // Dịch vụ phòng
  PaymentOutlinedIcon,     // Thanh toán
  InsertChartOutlinedIcon, // Tổng quan thống kê
  ArticleOutlinedIcon      // Hợp đồng
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const report = {
  id: 'reportRoom',
  title: 'Thống kê',
  type: 'group',
  children: [
    {
      id: 'report',
      title: 'Thu Chi',
      type: 'item',
      url: '/report/profit',
      icon: icons.InsertChartOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'reportRoom',
      title: 'Phòng',
      type: 'item',
      url: '/report/room',
      icon: icons.HomeOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'reportContract',
      title: 'Hợp đồng',
      type: 'item',
      url: '/report/contract',
      icon: icons.ArticleOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'reportIndex',
      title: 'Điện nước',
      type: 'item',
      url: '/report/index',
      icon: icons.OpacityOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'reportService',
      title: 'Dịch vụ phòng',
      type: 'item',
      url: '/report/service',
      icon: icons.BuildOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default report;
