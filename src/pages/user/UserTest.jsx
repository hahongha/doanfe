function ManageTestPayment() {
  const fetchVNPAY = async () => {
    try {
      setLoading(true);
  
      if (!isAuthenticated) {
        setLoading(false);
        toast.warning({
          message: "Chưa đăng nhập",
          description: "Vui lòng đăng nhập để xem thông tin cá nhân",
        });
        return;
      }
  
      const response = await http.get('http://localhost:8080/api/payment/create-payment', {
          params: {
              amount: finalAmount, // Sử dụng giá sau khi đã giảm giá
              bookingId: createBookingResponse.data.data.id,
          },
      });

      
      
  
      if (response.data.code === "200") {
        setBillData(response.data.data);
        console.log(response.data.data);
        
      } else {
        toast.error({
          message: "Lỗi",
          description:
            response.message || "Không thể tải thông tin phòng",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error({
        message: "Lỗi kết nối",
        description: "Không thể kết nối đến máy chủ",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <><>
    </></>
    );
}

export default ManageTestPayment;