import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import { HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { Lock, Person, Security } from '@mui/icons-material';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab({ handleLogout }) {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index, nv) => {
    setSelectedIndex(index);
    if (index === 0) {
      navigate('/profile');
    }
    if (index === 1) {
      navigate('/test');
    }
  };

  return (
    <>
      <List
        component="nav"
        // sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 25 } }}
      >
        <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0, '/apps/profiles/user/personal')}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Thông tin cá nhân" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1, '/apps/profiles/user')}>
          <ListItemIcon>
            <Lock />
          </ListItemIcon>
          <ListItemText primary="Quản lý tài khoản" />
        </ListItemButton>

        <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItemButton>
      </List>
    </>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
