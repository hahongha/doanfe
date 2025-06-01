import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import http from "../../redux/api/http";

function RenterBillDetail({billDetailData}) {
    const [billDetailData, setBillDetailData] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const fetchBillDetailData = async () => {
    //   try {
    //     setLoading(true);
    
    //     if (!isAuthenticated) {
    //       setLoading(false);
    //       toast.warning({
    //         message: "Chưa đăng nhập",
    //         description: "Vui lòng đăng nhập để xem thông tin cá nhân",
    //       });
    //       return;
    //     }
    
    //     const response = await http.get("/userRental/getRoom");
        
        
    
    //     if (response.data.code === "200") {
    //       setBillDetailData(response.data.data);
    //       console.log(response.data.data);
          
    //     } else {
    //       toast.error({
    //         message: "Lỗi",
    //         description:
    //           response.message || "Không thể tải thông tin",
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //     toast.error({
    //       message: "Lỗi kết nối",
    //       description: "Không thể kết nối đến máy chủ",
    //     });
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // useEffect(() => {
    //   if (isAuthenticated) {
    //     fetchBillDetailData();
    //   }else{
    //     navigate("/login");
    //   }
    // }, [navigate, dispatch, isAuthenticated]);
    if (!billDetailData || billDetailData.length === 0) {
      return (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6">Không có chi tiết hóa đơn nào cả nào</Typography>
        </Box>
      );
    }
    return ( <><></></> );
}

export default  RenterBillDetail;