import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  IconButton,
  Chip,
  Box,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import http from 'redux/api/http';
import { EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
function RenterService({id}) {

    const statusOptions = {
        ACTIVE: { label: 'Hoạt động', color: 'success' },     // Xanh lá
        SUSPEND: { label: 'Tạm dừng', color: 'warning' },     // Vàng/Cam
        STOP: { label: 'Ngừng cung cấp', color: 'error' }     // Đỏ
    };

    const StatusChip = ({ status }) => {
        const option = statusOptions[status] || { label: 'Không rõ', color: 'default' };
        return <Chip label={option.label} color={option.color} variant="outlined" />;
    };

    
    const [serviceDatas, setServiceDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchServiceData = async (id) => {
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
    
        const response = await http.get(`/userRental/getServiceByRoom/${id}`);
        
        
    
        if (response.data.code === "200") {
            setServiceDatas(response.data.data);
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
    useEffect(() => {
        if (isAuthenticated) {
        fetchServiceData(id);
        }else{
        navigate("/login");
        }
    }, [navigate, dispatch, isAuthenticated]);
    if (!serviceDatas || serviceDatas.length === 0) {
        return (
        <Box textAlign="center" mt={5}>
            <Typography variant="h6">Không có dịch vụ nào đã được đăng kí</Typography>
        </Box>
        );
    }
        return ( 
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>Tên dịch vụ</TableCell>
                <TableCell>Giá trị (VNĐ)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {serviceDatas.map((service) => (
                <TableRow key={service.id}>
                    <TableCell>{service?.serviceName}</TableCell>
                    <TableCell>{service.value}</TableCell>
                    <TableCell>
                        <StatusChip status={service?.status} />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default RenterService;