import { Box, Button } from "@mui/material";

const InvoiceActions = ({ onConfirm }) => (
  <Box mt={4} textAlign="right">
    <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5, fontWeight: "bold" }} onClick={onConfirm}>
      Xác nhận đã thanh toán
    </Button>
  </Box>
);

export default InvoiceActions;
