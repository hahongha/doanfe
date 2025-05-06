import { Box, Typography, Paper, Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";

const InvoiceHeader = ({ onPrint, onExportPDF }) => (
  <Paper elevation={2} sx={{ display: "flex", justifyContent: "space-between", p: 2, mb: 2, borderBottom: "4px solid #4f46e5" }}>
    <Box display="flex" alignItems="center" gap={1}>
      <Box sx={{ bgcolor: "#4f46e5", color: "#fff", px: 2, py: 1, borderRadius: 1, fontWeight: "bold" }}>QT</Box>
      <Typography variant="h6" fontWeight="bold" color="text.primary">
        Nhà trọ Hạnh Phúc
      </Typography>
    </Box>
    <Box display="flex" gap={1}>
      <Button variant="outlined" startIcon={<PictureAsPdfIcon />} onClick={onExportPDF}>
        Xuất PDF
      </Button>
      <Button variant="contained" startIcon={<PrintIcon />} sx={{ bgcolor: "#4f46e5" }} onClick={onPrint}>
        In hóa đơn
      </Button>
    </Box>
  </Paper>
);

export default InvoiceHeader;
