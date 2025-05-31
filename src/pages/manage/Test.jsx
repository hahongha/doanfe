import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import EWDetail from './EWDetail'; // Giả sử đã có EWDetail với onSave
import UtilitySummaryBox from './UtilitySummaryBox'; // Từ yêu cầu trước
import { updateRoomStatusRequest, addCheckoutHistoryRequest } from 'src/redux/actions/roomAction';

// Dữ liệu giả lập
const mockRooms = [
  {
    id: 1,
    roomNumber: "101",
    status: "occupied",
    electricIndex: 1000,
    waterIndex: 50,
    tenantId: 123,
  },
  {
    id: 2,
    roomNumber: "102",
    status: "occupied",
    electricIndex: 800,
    waterIndex: 40,
    tenantId: 124,
  },
];

export default function CheckoutDialog({ open, roomId, onClose }) {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.all_rooms || mockRooms); // Sử dụng mockRooms nếu cần
  const loading = useSelector((state) => state.room.loading || state.ew.loading || false);
  const [step, setStep] = useState(1); // 1: Nhập chỉ số, 2: Xem hóa đơn
  const [billDetails, setBillDetails] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const room = rooms.find((r) => r.id === roomId);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification((prev) => ({ ...prev, show: false })), 3000);
  };

  const handleUtilitySaved = (utilityData) => {
    // Giả lập hóa đơn
    const mockBillDetails = {
      roomId,
      roomNumber: room?.roomNumber,
      checkoutDate: "2025-05-31",
      utilities: [
        {
          type: utilityData.type,
          startDate: "2025-05-01",
          endDate: "2025-05-31",
          roomId: parseInt(utilityData.roomId, 10),
          totalAmount: utilityData.totalAmount,
        },
      ],
      otherFees: 500000,
      total: utilityData.totalAmount + 500000,
    };
    setBillDetails(mockBillDetails);
    setStep(2);
  };

  const handleConfirmCheckout = () => {
    if (!billDetails) {
      showNotification('Chưa có thông tin hóa đơn', 'error');
      return;
    }

    // Cập nhật trạng thái phòng
    dispatch(updateRoomStatusRequest({
      id: roomId,
      status: 'available',
      electricIndex: billDetails.utilities[0].type === 'ELECTRIC' ? billDetails.utilities[0].currentIndex || room.electricIndex : room.electricIndex,
      waterIndex: billDetails.utilities[0].type === 'WATER' ? billDetails.utilities[0].currentIndex || room.waterIndex : room.waterIndex,
    }))
      .then(() => {
        // Lưu lịch sử trả phòng
        dispatch(addCheckoutHistoryRequest({
          roomId,
          checkoutDate: billDetails.checkoutDate,
          billDetails,
          status: 'completed',
        }))
          .then(() => {
            showNotification(`Trả phòng ${room?.roomNumber} thành công`, 'success');
            onClose();
          })
          .catch(() => showNotification('Lưu lịch sử trả phòng thất bại', 'error'));
      })
      .catch(() => showNotification('Cập nhật trạng thái phòng thất bại', 'error'));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth aria-labelledby="checkout-dialog-title">
      <DialogContent>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 2, padding: 3 }}>
          <Typography id="checkout-dialog-title" variant="h5" gutterBottom>
            Trả Phòng {room?.roomNumber || ''}
          </Typography>
          {step === 1 && (
            <EWDetail
              open={open}
              index={{ room: { id: roomId } }}
              onClose={() => setStep(1)}
              onSave={handleUtilitySaved}
            />
          )}
          {step === 2 && billDetails && (
            <>
              <Typography variant="h6" gutterBottom>
                Hóa Đơn Tiện Ích
              </Typography>
              {billDetails.utilities.map((utility, index) => (
                <UtilitySummaryBox
                  key={index}
                  type={utility.type}
                  startDate={utility.startDate}
                  endDate={utility.endDate}
                  roomId={utility.roomId}
                />
              ))}
              <Typography variant="body1" sx={{ mt: 2 }}>
                Phí khác: {billDetails.otherFees.toLocaleString()} VND
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                Tổng chi phí: {billDetails.total.toLocaleString()} VND
              </Typography>
            </>
          )}
        </Box>
        <Snackbar open={notification.show} autoHideDuration={3000} onClose={() => setNotification((prev) => ({ ...prev, show: false }))}>
          <Alert severity={notification.type} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {step === 2 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmCheckout}
              disabled={loading}
              aria-label="Xác nhận trả phòng"
            >
              Xác Nhận Trả Phòng
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            onClick={onClose}
            disabled={loading}
            aria-label="Đóng"
          >
            Đóng
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

CheckoutDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  roomId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};