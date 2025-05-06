// material-ui
import Grid2 from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AuthLogin from '../../sections/auth/AuthLogin';
import AuthWrapper from '../../sections/auth/AuthWrapper';

// project import

// ================================|| LOGIN ||================================ //

export default function Login() {
  return (
    <AuthWrapper>
      <Grid2 container spacing={3}>
        <Grid2 size={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Đăng nhập</Typography>
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <AuthLogin />
        </Grid2>
      </Grid2>
    </AuthWrapper>
  );
}
