import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AnimateButton from 'components/@extended/AnimateButton'; // Adjust path based on your project structure

import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { useNavigate } from 'react-router';
import { getUserInfoRequest, loginRequest } from '../../redux/actions/authActions';

export default function AuthLogin({ isDemo = false }) {
  // State để lưu trạng thái của các checkbox
  const [isManager, setIsManager] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
  const isLoading = useSelector((state) => state.auth.loading);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserInfoRequest());
      const scope = localStorage.getItem("scope");
        if (scope === "USER") {
          navigate("/user");
        } else if (scope === "STAFF") {
          navigate("/manager");
        } else if (scope === "ADMIN") {
          navigate("/manager");
        } else {
          navigate("/"); // hoặc một trang mặc định nếu không xác định được scope
        }
        }
    
  }, [navigate, dispatch, isAuthenticated]);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginRequest(values));
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          userName: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          userName: Yup.string().max(255).required('Bắt buộc nhập'),
          password: Yup.string().max(255).required('Bắt buộc nhập')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid2 container spacing={3}>
              <Grid2 size={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="userName-login">Tên tài khoản</InputLabel>
                  <OutlinedInput
                    id="userName-login"
                    type="userName"
                    value={values.userName}
                    name="userName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tên tài khoản"
                    fullWidth
                    error={Boolean(touched.userName && errors.userName)}
                  />
                </Stack>
                {touched.userName && errors.userName && <FormHelperText error>{errors.userName}</FormHelperText>}
                {touched.userName && !errors.userName && values.userName && (
                  <FormHelperText sx={{ color: '#52C41A' }}>Tên tài khoản hợp lệ!</FormHelperText>
                )}
              </Grid2>
              <Grid2 size={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Mật khẩu</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Nhập mật khẩu"
                  />
                </Stack>
                {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
              </Grid2>
              {errors.submit && (
                <Grid2 size={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid2>
              )}
              <Grid2 size={12}></Grid2>
              <Grid2 size={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isLoading} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {isLoading ? (
                      <>
                        Đang đăng nhập... <CircularProgress size={20} disableShrink style={{ marginLeft: '8px' }} />
                      </>
                    ) : (
                      'Đăng nhập'
                    )}
                  </Button>
                </AnimateButton>
              </Grid2>
            </Grid2>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthLogin.propTypes = {
  isDemo: PropTypes.bool
};
