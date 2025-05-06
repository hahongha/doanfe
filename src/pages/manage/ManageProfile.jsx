// src/components/UserProfile.js
import { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Statistic,
  Divider,
  Badge,
  Avatar,
  Skeleton,
  Typography,
  Tag
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
  TrophyOutlined,
  IdcardOutlined,
  PhoneOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import http from "src/redux/api/http";
import { toast } from "react-toastify";
import { getUserInfoRequest } from "../../redux/actions/authActions";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

function ManageProfile() {
  const [userData, setUserData] = useState(null);
  const userReducer = useSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => !!state.auth.accessToken);

  // Function to format date string from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  // Function to get badge color based on membership type
  const getIsRegister = (type) => {
    switch (type) {
      case true:
        return "Bạn đã đăng kí thường trú rồi.";
      case false:
        return "Bạn chưa đăng kí thường trú";
      default:
        return "Không có thông tin";
    }
  };

  const getRole = (type) => {
    console.log(type);
    
    const roleMap = {
      USER: "Khách thuê",
      STAFF: "Nhân viên",
      OWNER: "Chủ trọ",
      ADMIN: "Chủ hệ thống"
    };
  
    return roleMap[type] || "Không xác định";
  };
  

  function formatVietnamPhoneNumber(phone) {
    // Xóa ký tự không phải số
    const digits = phone.replace(/\D/g, '');
  
    // Kiểm tra độ dài hợp lệ
    if (digits.length !== 10 || !digits.startsWith('0')) {
      return 'Số điện thoại không hợp lệ';
    }
  
    // Format: 090 123 4567
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  const getGender = (type) => {
    switch (type) {
      case "MALE":
      case "Male":
        return "Nam";
      case "FEMALE":
      case "Female":
        return "Nữ";
      default:
        return "Không xác định";
    }
  };

  const fetchUserData = async () => {
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

      const response = await http.get("/manager/getProfile");
      

      if (response.data.code === "200") {
        setUserData(response.data.data);

        
      } else {
        toast.error({
          message: "Lỗi",
          description:
            response.message || "Không thể tải thông tin người dùng",
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserInfoRequest());
      fetchUserData();
    }else{
      navigate("/login");
    }
  }, [navigate, dispatch, isAuthenticated]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          loading={loading}
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          {loading ? (
            <Skeleton active avatar paragraph={{ rows: 6 }} />
          ) : (
            <>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #1677ff 0%, #0958d9 100%)",
                  padding: "20px",
                  marginTop: "-24px",
                  marginLeft: "-24px",
                  marginRight: "-24px",
                  color: "white",
                  borderRadius: "12px 12px 0 0",
                }}
              >
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} sm={12} md={6} lg={6}>
                    <Avatar
                      size={120}
                      src={userData?.imageUrl || null}
                      icon={!userData?.imageUrl  && <UserOutlined />}
                      style={{
                        boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.4)",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={18} lg={18}>
                    <Title level={3} style={{ color: "white", margin: 0 }}>
                      {userData?.fullName || "N/A"}
                    </Title>
                    <Row gutter={[16, 8]} style={{ marginTop: "8px" }}>
                      <Col>
                        <Text style={{ color: "white" }}>
                          {getRole(userReducer.userType)}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>

                <Col xs={24} md={16}>
                  <Title level={4}>Thông tin cá nhân</Title>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Text strong style={{ marginRight: "8px" }}>
                        <UserOutlined /> Chức vụ:
                      </Text>
                      <Text>{userData?.note}</Text>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Text strong style={{ marginRight: "8px" }}>
                        <UserOutlined /> Giới tính:
                      </Text>
                      <Text>{getGender(userData?.gender)}</Text>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Text strong style={{ marginRight: "8px" }}>
                        <CalendarOutlined /> Ngày sinh:
                      </Text>
                      <Text>{formatDate(userData?.dob) || "N/A"}</Text>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Text strong style={{ marginRight: "8px" }}>
                        <PhoneOutlined /> Số điện thoại:
                      </Text>
                      <Text>{userData?.phone || "N/A"}</Text>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Text strong style={{ marginRight: "8px" }}>
                        <SnippetsOutlined /> Ngày bắt đầu:
                      </Text>
                      <Text>{formatDate(userData?.startDate) || "N/A"}</Text>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Text strong style={{ marginRight: "8px" }}>
                        <CalendarOutlined /> Ngày tạo tài khoản:
                      </Text>
                      <Text>{formatDate(userData?.createAt) || "N/A"}</Text>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Text strong style={{ marginRight: "8px" }}>
                        <CalendarOutlined /> Ngày cập nhật gần nhất:
                      </Text>
                      <Text>
                        {formatDate(userData?.updateAt) || userData?.createAt}
                      </Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
}

export default ManageProfile;