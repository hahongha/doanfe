import { AccessTime, CalendarToday, CheckCircle, MonetizationOn } from "@mui/icons-material";
import { Box, Button, Chip, Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";
import BillPanelDialog from "./BillPanelDialog";

function BillDTO({invoiceData}) {
      const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
      const formatDate = (dateString) => new Date(dateString).toLocaleDateString('vi-VN');
    
      const billSubtotal = invoiceData.billDetails.reduce((sum, item) => sum + item.value, 0);
      const otherFees = invoiceData.totalAmount - billSubtotal;
      const [open, setOpen] = useState(false);
    
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
    return ( 
        
    <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">{invoiceData.name}</Typography>
            <Chip
                icon={invoiceData.status === 'PAID' ? <CheckCircle /> : <AccessTime />}
                label={invoiceData.status === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                color={invoiceData.status === 'PAID' ? 'success' : 'warning'}
                variant="outlined"
            />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
            <Box display="flex" alignItems="center" mb={1}>
                <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                Hạn thanh toán: <strong>{formatDate(invoiceData.dueDate)}</strong><br />
                Ngày thanh toán: <strong>{formatDate(invoiceData.paymentDate)}</strong> <br />
                Ngày tạo: {formatDate(invoiceData.createAt)} <br />
                Cập nhật: {formatDate(invoiceData.updateAt)}
                </Typography>
                </Box>
            <Box display="flex" alignItems="center">
                <MonetizationOn fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" fontWeight="bold">
                {formatCurrency(invoiceData.totalAmount)}
                </Typography>
            </Box>
            
            </Box>
            <Box display="flex" alignItems="center" padding={2}>
            <Button variant="contained" sx={{margin:2}} onClick={handleOpen}>Chi tiết hóa đơn</Button>
           
            <Button variant="outlined" sx={{margin:2}}>In hóa đơn</Button>

            {invoiceData.status !== 'PAID'&& (
                <Button variant="contained" sx={{ margin: 2 }}>
                    Thanh toán
                </Button>
            )}
            </Box>
        </Paper>
        <BillPanelDialog invoiceData= {invoiceData} open= {open} handleClose = {handleClose}/>
    </Box>

     );
}

export default BillDTO;