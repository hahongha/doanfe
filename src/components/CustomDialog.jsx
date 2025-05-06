import { CloseOutlined } from '@ant-design/icons';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';

function CustomDialog({ open, handleCustom, handleClose, title, content }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" padding={0}>
          <Typography variant="h3">{title}</Typography>
          <IconButton onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      {handleCustom ? (
        <DialogActions>
          <Button
            sx={{
              backgroundColor: 'primary',
              '&:hover': {
                backgroundColor: 'secondary', // Màu khi hover
                transform: 'scale(1.05)', // Hiệu ứng phóng to nhẹ
                transition: 'all 0.3s ease-in-out'
              }
            }}
            onClick={handleClose}
            color="primary"
          >
            Đóng
          </Button>
          <Button
            sx={{
              backgroundColor: 'primary',
              '&:hover': {
                backgroundColor: 'secondary', // Màu khi hover
                transform: 'scale(1.05)', // Hiệu ứng phóng to nhẹ
                transition: 'all 0.3s ease-in-out'
              }
            }}
            onClick={handleCustom}
          >
            Xác nhận
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}

export default CustomDialog;
