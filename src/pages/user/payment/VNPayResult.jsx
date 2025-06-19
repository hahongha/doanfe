import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
// hoặc axios từ axios nếu bạn dùng axios trực tiếp
import http from "redux/api/http";
const VNPayResult = () => {
  const [missingParams, setMissingParams] = useState([]);
  const [paramData, setParamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Lấy và validate các params
  useEffect(() => {
    const requiredParams = [
      "bookingId",
      "vnp_Amount",
      "vnp_BankCode",
      "vnp_CardType",
      "vnp_OrderInfo",
      "vnp_PayDate",
      "vnp_ResponseCode",
      "vnp_TmnCode",
      "vnp_TransactionNo",
      "vnp_TransactionStatus",
      "vnp_TxnRef",
      "vnp_SecureHash"
    ];

    const searchParams = new URLSearchParams(window.location.search);
    const missing = [];
    const data = {};

    requiredParams.forEach(param => {
      const value = searchParams.get(param);
      if (!value || value.trim() === "") {
        missing.push(param);
      } else {
        data[param] = decodeURIComponent(value);
      }
    });

    if (missing.length > 0) {
      setMissingParams(missing);
    } else {
      setParamData(data);
    }
  }, []);

  const fetchPaymentInfo = async () => {
      try {
        setLoading(true);
        const response = await http.get('/paymentVNPAY/payment-infor', {
          params: {
            vnp_Amount: paramData?.vnp_Amount,
            vnp_PayDate: paramData?.vnp_PayDate,
            vnp_TransactionStatus: paramData?.vnp_TransactionStatus,
            billId: paramData?.bookingId
          },
        });
        console.log(response);
        
        if (response.data.code === "200") {
          toast.success("Thanh toán thành công");
          setLoading(false);
           // Quay lại trang trước (trang thanh toán)
        } else {
          toast.error({
            message: "Lỗi",
            description: response.message || "Thanh toán thất bại",
          });
        }
      } catch (error) {
        console.error("Error fetching payment info:", error);
        toast.error({
          message: "Lỗi kết nối",
          description: "Không thể kết nối đến máy chủ",
        });
      } finally {
        navigate("/user/paymentHistory");
        setLoading(false);
      }
    };

  // Gọi API sau khi paramData đã sẵn sàng
  useEffect(() => {
    if (paramData) {
      fetchPaymentInfo();
    }
  }, [paramData]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
    </div>
  );
};

export default VNPayResult;
