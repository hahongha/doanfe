// import { QRCode } from "qrcode.react"; // Import thư viện tạo QR code

// const PaymentQRCode = () => {
//   // Dữ liệu thanh toán bạn muốn hiển thị trên QR Code
//   const accountInfo = {
//     accountNumber: "1234567890",
//     bankName: "Ngân Hàng XYZ",
//     accountHolder: "John Doe",
//     amount: "500.000 VND",
//     note: "Thanh toán hóa đơn tháng 5/2025"
//   };

//   // Tạo thông tin thanh toán cho QR code
//   const qrData = `
//     Tài khoản: ${accountInfo.accountNumber}
//     Ngân hàng: ${accountInfo.bankName}
//     Chủ tài khoản: ${accountInfo.accountHolder}
//     Số tiền: ${accountInfo.amount}
//     Nội dung thanh toán: ${accountInfo.note}
//   `;

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h3>Thanh toán hóa đơn qua QR Code</h3>
//       <QRCode
//         value={qrData}  // Dữ liệu thanh toán được mã hóa thành QR code
//         size={256}      // Kích thước của QR code
//         level={"H"}     // Mức độ bảo vệ lỗi của QR code (H - cao nhất)
//         includeMargin={true} // Bao quanh QR code với khoảng cách
//       />
//       <p style={{ marginTop: "10px" }}>Quét mã QR để thanh toán</p>
//     </div>
//   );
// };

// export default PaymentQRCode;

const PaymentQRCode = ({ bankCode, accountNumber, accountName, amount, description }) => {
  const encodedDesc = encodeURIComponent(description);
  const encodedName = encodeURIComponent(accountName);

  const qrImageUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact.png?amount=${amount}&addInfo=${encodedDesc}&accountName=${encodedName}`;

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Quét mã để thanh toán</h3>
      <img src={qrImageUrl} alt="QR VietQR" width={300} />
      <p><strong>Ngân hàng:</strong> {bankCode}</p>
      <p><strong>Số tài khoản:</strong> {accountNumber}</p>
      <p><strong>Tên tài khoản:</strong> {accountName}</p>
      <p><strong>Nội dung:</strong> {description}</p>
      <p><strong>Số tiền:</strong> {amount} VND</p>
    </div>
  );
};

export default PaymentQRCode;


