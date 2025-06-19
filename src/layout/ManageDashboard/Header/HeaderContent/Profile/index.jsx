import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import auth from 'redux/api/auth.api';
import { getUserInfoRequest } from 'redux/actions/authActions';
// import AvatarEmployee from 'pages/leave/avatar-employee';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile() {
  const theme = useTheme();
  const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
  const userReducer = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, [dispatch]);

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogout = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const dataTemp = {
      accessToken,
      refreshToken
    };
    try {
      await auth.logout(dataTemp);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const iconBackColorOpen = 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      {!isAuthenticated ? (
        <ButtonBase
          component={Link}
          to="/login"
          variant="outlined"
          sx={{
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.dark',
              backgroundColor: 'primary.lighter',
              color: 'primary.dark'
            }
          }}
        >
          Đăng nhập
        </ButtonBase>
      ) : (
        <>
          <ButtonBase
            sx={{
              p: 0.25,
              bgcolor: open ? iconBackColorOpen : 'transparent',
              borderRadius: 1,
              '&:hover': { bgcolor: 'secondary.lighter' },
              '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 }
            }}
            aria-label="open profile"
            ref={anchorRef}
            aria-controls={open ? 'profile-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
              {/* <AvatarEmployee alt="profile user" src={userReducer?.avatar} triggerFetch={true} /> */}
              <Avatar src={userReducer?.userAvatar} />
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                {userReducer?.userName}
              </Typography>
            </Stack>
          </ButtonBase>

          <Popper
            placement="bottom-end"
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            popperOptions={{
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 9]
                  }
                }
              ]
            }}
          >
            {({ TransitionProps }) => (
              <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
                <Paper sx={{ boxShadow: theme.customShadows.z1, width: 350, minWidth: 350, maxWidth: { xs: 280, md: 350 } }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MainCard elevation={0} border={false} content={false}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Avatar src={userReducer?.userAvatar} alt="Avatar" sx={{ minWidth: 100, minHeight: 100 }} />
                        <Typography variant="h3" sx={{ textTransform: 'capitalize' }}>
                          {userReducer?.userName}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                          {userReducer?.email}
                        </Typography>
                      </Box>
                      <ProfileTab handleLogout={handleLogout} />
                    </MainCard>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </Popper>
        </>
      )}
    </Box>
  );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };
