import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const InvoiceDetailTable = ({ items }) => {
  // Ensure items is an array before using
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <Box mt={4}>
      <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
        Chi tiết hóa đơn
      </Typography>
      {safeItems.length === 0 ? (
        <Typography variant="body2" color="textSecondary" mt={2}>
          Không có chi tiết hóa đơn.
        </Typography>
      ) : (
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Dịch vụ</TableCell>
              <TableCell>Đơn giá</TableCell>
              <TableCell>Số lượng/Chỉ số</TableCell>
              <TableCell>Thành tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {safeItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{new Intl.NumberFormat('vi-VN').format(item.unitPrice)} VNĐ</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{new Intl.NumberFormat('vi-VN').format(item.total)} VNĐ</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default InvoiceDetailTable;
