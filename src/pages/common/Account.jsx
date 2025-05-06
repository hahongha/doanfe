import React, { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Avatar, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Title } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import UpdatePassword from './UpdatePassword';
function Account() {
  const userReducer = useSelector((state) => state.auth.userInfo);
  const [userData, setUserData] = useState(userReducer);
  const [open, setOpen] = useState(false);  
  return (
    <Paper sx={{ p: 3 }}>

      <div
                style={{
                  background:
                    "linear-gradient(135deg, #1677ff 0%, #0958d9 100%)",
                  padding: "20px",
                  marginTop: "-24px",
                  marginLeft: "-24px",
                  marginRight: "-24px",
                  color: "white",
                  borderRadius: "12px 12px 0 0",
                }}
              >
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} sm={12} md={6} lg={6}>
                    <Avatar
                      size={120}
                      src={userData?.userAvatar || null}
                      icon={!userData?.userAvatar  && <UserOutlined />}
                      style={{
                        boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.4)",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={18} lg={18}>
                  <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
        Quản lý tài khoản
      </Typography>

      <Typography variant="body2" sx={{ mb: 3 }}>
        Quản lý tài khoản và mật khẩu của bạn
      </Typography>
                  </Col>
                </Row>
              </div>

      <Box>
        {/* Password field */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            py: 2,
            borderBottom: '1px solid #e7e7e7'
          }}
        >
          <Box>
            <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
              Tên tài khoản
            </Typography>
            <Typography variant="body1">{userData?.userName}</Typography>
          </Box>
          <Button color="secondary" sx={{ textTransform: 'none' }}>
            Chỉnh sửa
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            py: 2,
            borderBottom: '1px solid #e7e7e7'
          }}
        >
          <Box>
            <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
              Email
            </Typography>
            <Typography variant="body1">{userData?.email}</Typography>
          </Box>
          <Button color="secondary" sx={{ textTransform: 'none' }}>
            Chỉnh sửa
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            py: 2,
            borderBottom: '1px solid #e7e7e7'
          }}
        >
          <Box>
            <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
              Trạng thái
            </Typography>
            <Typography variant="body1">{userData?.status}</Typography>
          </Box>
        </Box>
        {/* Password field */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            py: 2,
            borderBottom: '1px solid #e7e7e7'
          }}
        >
          <Box>
            <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
              Mật khẩu
            </Typography>
            <Typography variant="body1">********</Typography>
            <Typography variant="caption" color="text.secondary">
              Mật khẩu của bạn phải có ít nhất 8 ký tự và bao gồm chữ và số.
            </Typography>
          </Box>
          <Button color="secondary" sx={{ textTransform: 'none' }} onClick={()=> setOpen(true)}>
            Chỉnh sửa
          </Button>
        </Box>
      </Box>
      <UpdatePassword userId={userReducer.userId} userName={userReducer.userName} open={open} onClose={()=> setOpen(false)} />
    </Paper>
  );
}
export default Account;