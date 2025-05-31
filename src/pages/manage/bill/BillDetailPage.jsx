import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Chip,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  List,
  ListItem,
} from "@mui/material";
import { ArrowBack, Add, Delete, Http } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import MainCard from 'components/MainCard';
import http from 'redux/api/http'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addBillRequest, updateBillRequest } from "redux/actions/billAction";
import { getAllRoomRequest } from "redux/actions/roomAction";
import { getAllRenterRequest } from "redux/actions/renterAction";
// Mock data

const BillDetailPage = () => {
  const { billId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(true);
  const [billData, setBillData] = useState({
    id: "",
    name: "",
    value: 0,
    dueDate: null,
    paymentDate: null,
    status: "UNPAID",
    discount: 0,
    paid: 0,
    isExpense: false,
    note: "",
    totalAmount: 0,
    room: {
      id: "",
      roomNumber: "",
      status: "available",
      cost: 0,
      isActive: false,
      furniture: [],
      description: "",
      number: 0
    },
    renter: {
      id: "",
      fullName: "",
      gender: "MALE",
      status: "inactive",
      phone: "",
      dob: null,
      identification: "",
      placeOfOrigin: "",
      address: "",
      familyPhone: "",
      isRegister: false,
    },
    createAt: null,
    updateAt: null,
    billDetails: []
  });
  const [formData, setFormData] = useState(billData);
  const roomData = useSelector((state) => state.room.all_rooms);
  const renterData = useSelector((state) => state.renter.all_renter);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const [room, setRoom] = useState("");
  const [renter, setRenter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const fetchBill = async (id) => {
  try {
    setLoading(true);
    console.log(id);

    const response = await http.get(`/bill/${id}`);

    if (response.data.code === "200") {
      setFormData(response.data.data);
      setBillData(response.data.data);
      setSelectedRoom(formData?.room?.roomNumber);
      setSearchTerm(formData?.renter?.identification);
      
    } else {
      toast.error({
        message: "Lỗi",
        description: "Không thể tải thông tin hóa đơn",
      });
    }
  } catch (error) {
    toast.error({
      message: "Lỗi kết nối",
      description: "Không thể kết nối đến máy chủ",
    });
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (billId) {
      fetchBill(billId);
    }
  }, [billId]);

  useEffect(() => {
    // Update totalAmount when value or discount changes
    setFormData((prev) => ({
      ...prev,
      totalAmount: prev.value - prev.discount,
    }));
  }, [formData?.value, formData?.discount]);

  useEffect(() =>{
    dispatch(getAllRoomRequest());
    dispatch(getAllRenterRequest());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.name) newErrors.name = "Tên hóa đơn là bắt buộc";
    if (formData?.value < 0) newErrors.value = "Giá trị phải lớn hơn hoặc bằng 0";
    if (formData?.discount < 0) newErrors.discount = "Giảm giá phải lớn hơn hoặc bằng 0";
    if (formData?.paid < 0) newErrors.paid = "Đã thanh toán phải lớn hơn hoặc bằng 0";
    if (!formData?.room?.roomNumber) newErrors["room.roomNumber"] = "Số phòng là bắt buộc";
    if (formData?.room?.cost < 0) newErrors["room.cost"] = "Giá phòng phải lớn hơn hoặc bằng 0";
    if (formData?.room?.number < 0) newErrors["room.number"] = "Số người ở phải lớn hơn hoặc bằng 0";
    if (!formData?.renter?.fullName) newErrors["renter.fullName"] = "Họ tên là bắt buộc";
    if (!formData?.renter?.phone || !/^\d{10}$/.test(formData?.renter?.phone))
      newErrors["renter.phone"] = "SĐT phải là 10 chữ số";
    formData?.billDetails.forEach((item, index) => {
      if (!item.name) newErrors[`billDetails[${index}].name`] = "Tên mục là bắt buộc";
      if (item.unitPrice < 0) newErrors[`billDetails[${index}].unitPrice`] = "Đơn giá phải lớn hơn hoặc bằng 0";
      if (item.quantity <= 0) newErrors[`billDetails[${index}].quantity`] = "Số lượng phải lớn hơn 0";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (path, value) => {
  const keys = path.split(".");

  setFormData((prev) => {
    const newData = structuredClone(prev); // ✅ clone sâu nếu trình duyệt hỗ trợ

    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    return newData;
  });
};

  const handleBillDetailChange = (index, field, value) => {
  setFormData((prev) => {
    const newBillDetails = [...prev.billDetails];

    // Cập nhật từng trường và tính lại total cho dòng hiện tại
    const updatedDetail = {
      ...newBillDetails[index],
      [field]: value,
    };

    // Tính lại total chỉ khi field là unitPrice hoặc quantity
    const unitPrice = field === "unitPrice" ? value : updatedDetail.unitPrice || 0;
    const quantity = field === "quantity" ? value : updatedDetail.quantity || 0;

    updatedDetail.total = unitPrice * quantity;

    newBillDetails[index] = updatedDetail;

    // Tính lại tổng toàn bộ hóa đơn
    const newTotal = newBillDetails.reduce((sum, item) => sum + (item.total || 0), 0);

    return {
      ...prev,
      billDetails: newBillDetails,
      value: newTotal
    };
  });
};


  const handleAddBillDetail = () => {
    setFormData((prev) => ({
      ...prev,
      billDetails: [
        ...prev.billDetails,
        {
          id: prev.billDetails.length + 1,
          name: "",
          unitPrice: 0,
          quantity: 1,
          total: 0,
        },
      ],
    }));
  };

  const handleRemoveBillDetail = (index) => {
    setFormData((prev) => ({
      ...prev,
      billDetails: prev.billDetails.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    if (!validateForm()) {
      setNotification({ open: true, message: "Vui lòng sửa các lỗi trong biểu mẫu", severity: "error" });
      return;
    }
    if(!formData.id){
      dispatch(addBillRequest(formData));
    }else{
      dispatch(updateBillRequest(formData));
    }
    setNotification({ open: true, message: "Lưu thành công", severity: "success" });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(billData);
    setErrors({});
    setIsEditing(false);
  };

  const InfoItem = ({ label, value, path, type = "text", options = [] }) => (
  <Box display="flex" justifyContent="space-between" mt={1} alignItems="center" gap={2}>
    <Typography color="text.secondary" fontSize={14} sx={{ minWidth: 150 }}>{label}</Typography>
    {isEditing ? (
      type === "select" ? (
        <FormControl fullWidth size="small" error={!!errors[path]}>
          <Select
            value={value || ""}
            onChange={(e) => handleChange(path, e.target.value)}
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
          {!!errors[path] && (
            <FormHelperText>{errors[path]}</FormHelperText>
          )}
        </FormControl>
      ) : type === "date" ? (
        <TextField
          type="date"
          fullWidth
          value={value}
          onChange={(e) => handleChange(path, e.target.value)}
          size="small"
          error={!!errors[path]}
          helperText={errors[path] || ""}
        />
      ) : type === "checkbox" ? (
        <Checkbox
          checked={value || false}
          onChange={(e) => handleChange(path, e.target.checked)}
        />
      ) : (
        <TextField
          value={value || ""}
          onChange={(e) => handleChange(path, e.target.value)}
          size="small"
          type={type}
          fullWidth
          error={!!errors[path]}
          helperText={errors[path] || ""}
        />
      )
    ) : (
      <Typography fontWeight="bold" fontSize={14}>
        {type === "checkbox" ? (value ? "Có" : "Không") :
         type === "date" ? (value || "N/A") :
         type === "select" ? (options.find(opt => opt.value === value)?.label || value || "N/A") :
         value || "N/A"}
      </Typography>
    )}
  </Box>
);

  const statusMap = {
    paid: { label: "Đã thanh toán", color: "success" },
    pending: { label: "Chưa thanh toán", color: "error" },
    partial: { label: "Thanh toán một phần", color: "warning" },
    overdue: { label: "Quá hạn", color: "error" },
    canceled: { label: "Đã hủy", color: "default" },
  };


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);


const handleSearchClick = () => {
  const matched = renterData.find(
    (r) => r.identification.toLowerCase() === searchTerm.toLowerCase()
  );

  if (matched) {
    setFormData((prev) => ({
      ...prev,
      renter: matched,
    }));
  } else {
    toast.error("Không tìm thấy người thuê ");
  }
};

const handleSearchRoomClick = () => {
  const matched = roomData.find(
    (r) => r.roomNumber === selectedRoom
  );
  if (matched) {
    setFormData((prev) => ({
      ...prev,
      room: matched,
    }));
  } else {
    toast.error("Không tìm thấy phòng thuê ");
  }
};



  const getStatusChip = (statusValue) => {
    const status = statusMap[statusValue?.toLowerCase()];
    return status ? (
      <Chip label={status.label} color={status.color} size="small" />
    ) : (
      <Chip label="Không xác định" color="default" size="small" />
    );
  };

  return (
    <MainCard>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          variant="text"
          color="primary"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          aria-label="Quay lại"
        >
          Quay lại
        </Button>
        <Typography id="bill-page-title" variant="h4" fontWeight="bold" ml={2}>
          Chi Tiết Hóa Đơn
        </Typography>
      </Box>

      {/* Content */}
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box justifyContent="space-between" borderBottom="1px solid #e5e7eb" pb={2} mb={3}>
          <Box>
            <Typography variant="h5" fontWeight="bold">Hóa đơn #{formData?.id}</Typography>
            <Typography color="text.secondary" fontSize={14}>
              Ngày tạo: {formData?.createAt || "N/A"}
            </Typography>
            <Typography color="text.secondary" fontSize={14}>
              Cập nhật lần cuối: {formData?.updateAt || "N/A"}
            </Typography>

            <Box display="flex" justifyContent="space-between" mt={1} alignItems="center" gap={2}>
              <Typography color="text.secondary" fontSize={14} sx={{ minWidth: 150 }}>Tên hóa đơn</Typography>
            <TextField
              type="text"
              value={formData?.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              size="small"
              error={!!errors?.name}
              helperText={errors?.name}
            />
            </Box>
            
            <InfoItem
              label="Hạn thanh toán:"
              value={formData?.dueDate}
              path="dueDate"
              type="date"
            />
            <InfoItem
              label="Ngày thanh toán:"
              value={formData?.paymentDate}
              path="paymentDate"
              type="date"
            />
            
            <Box display="flex" justifyContent="space-between" mt={1} alignItems="center" gap={2}>

              <Typography color="text.secondary" fontSize={14} sx={{ minWidth: 150 }}>Loại hóa đơn</Typography>
              <FormControl fullWidth size="small">
                  <Select
                    label={"Loại hóa đơn"}
                    value={formData?.isExpense || false}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        isExpense: e.target.value
                      }));
                    }}
                  >
                    <MenuItem value="true">Chi</MenuItem>
                    <MenuItem value="false">Thu</MenuItem>
                  </Select>
                </FormControl>
            </Box>

          </Box>
          <InfoItem
            label="Trạng thái:"
            value={formData?.status}
            path="status"
            type="select"
            options={[
              { value: "PAID", label: "Đã thanh toán" },
              { value: "UNPAID", label: "Chưa thanh toán" }
            ]}
          />
        </Box>

        <Grid container spacing={2}>
          {/* Thông tin phòng */}
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
                Thông tin phòng
              </Typography>

              <Box display="flex" gap={2} alignItems="center">
                  <TextField
                    label="CMND/CCCD"
                    variant="outlined"
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                  />
                  <Button variant="contained" onClick={handleSearchRoomClick}>
                    Tìm kiếm
                  </Button>
              </Box>

              <Typography><strong>Số phòng:</strong> {formData?.room?.roomNumber}</Typography>
              <Typography><strong>Trạng thái:</strong> {formData?.room?.status === 'occupied' ? 'Đang sử dụng' : 'Trống'}</Typography>
              <Typography><strong>Giá phòng:</strong> {formData?.room?.cost} VNĐ</Typography>
              <Typography><strong>Hoạt động:</strong> {formData?.room?.isActive ? 'Có' : 'Không'}</Typography>
              <Typography><strong>Nội thất:</strong> {formData?.room?.furniture?.join(', ')}</Typography>
              <Typography><strong>Mô tả:</strong> {formData?.room?.description}</Typography>
              <Typography><strong>Số người ở:</strong> {formData?.room?.number}</Typography>
            </Box>
          </Grid>

          {/* Thông tin người thuê */}
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
                Thông tin người thuê
              </Typography>
              
              <Box display="flex" gap={2} alignItems="center">
                  <TextField
                    label="CMND/CCCD"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="contained" onClick={handleSearchClick}>
                    Tìm kiếm
                  </Button>
              </Box>
              <Typography><strong>Họ tên:</strong> {formData?.renter?.fullName}</Typography>
              <Typography><strong>Giới tính:</strong> {formData?.renter?.gender === 'MALE' ? 'Nam' : 'Nữ'}</Typography>
              <Typography><strong>Trạng thái:</strong> {formData?.renter?.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}</Typography>
              <Typography><strong>SĐT:</strong> {formData?.renter?.phone}</Typography>
              <Typography><strong>Ngày sinh:</strong> {formData?.renter?.dob}</Typography>
              <Typography><strong>CMND/CCCD:</strong> {formData?.renter?.identification}</Typography>
              <Typography><strong>Nơi thường trú:</strong> {formData?.renter?.placeOfOrigin}</Typography>
              <Typography><strong>Địa chỉ hiện tại:</strong> {formData?.renter?.address}</Typography>
              <Typography><strong>SĐT người thân:</strong> {formData?.renter?.familyPhone}</Typography>
              <Typography><strong>Đăng ký tạm trú:</strong> {formData?.renter?.isRegister ? 'Có' : 'Không'}</Typography>
            </Box>
          </Grid>
        </Grid>


        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
            Chi tiết hóa đơn
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label="Bảng chi tiết hóa đơn">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Tên</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Đơn giá (VNĐ)</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Số lượng</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Tổng (VNĐ)</TableCell>
                  {isEditing && <TableCell sx={{ fontWeight: "bold" }}>Hành động</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {formData?.billDetails.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={item.name}
                          onChange={(e) => handleBillDetailChange(index, "name", e.target.value)}
                          size="small"
                          error={!!errors[`billDetails[${index}].name`]}
                        />
                      ) : (
                        item.name
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={item.unitPrice}
                          onChange={(e) => handleBillDetailChange(index, "unitPrice", Number(e.target.value))}
                          size="small"
                          type="number"
                          error={!!errors[`billDetails[${index}].unitPrice`]}
                        />
                      ) : (
                        item.unitPrice.toLocaleString()
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={item.quantity}
                          onChange={(e) => handleBillDetailChange(index, "quantity", Number(e.target.value))}
                          size="small"
                          type="number"
                          error={!!errors[`billDetails[${index}].quantity`]}
                        />
                      ) : (
                        item.quantity
                      )}
                    </TableCell>
                    <TableCell>{item.total.toLocaleString()}</TableCell>
                    {isEditing && (
                      <TableCell>
                        <IconButton onClick={() => handleRemoveBillDetail(index)} aria-label="Xóa mục">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {isEditing && (
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddBillDetail}
              sx={{ mt: 2 }}
              aria-label="Thêm mục"
            >
              Thêm mục
            </Button>
          )}
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold" borderBottom="1px solid #e5e7eb" pb={1}>
            Tổng kết
          </Typography>
           <Box display="flex" justifyContent="space-between" mt={1} alignItems="center" gap={2}>
              <Typography color="text.secondary" fontSize={14} sx={{ minWidth: 150 }}>Tổng giá trị: </Typography>
            <TextField
              type="number"
              value={formData?.value || ""}
              // onChange={(e) => setFormData({ ...formData, note: e.target.value })}
               InputProps={{ readOnly: true }}
              fullWidth
              size="small"
              error={!!errors?.name}
              helperText={errors?.name}
            />
            </Box>
             <Box display="flex" justifyContent="space-between" mt={1} alignItems="center" gap={2}>
              <Typography color="text.secondary" fontSize={14} sx={{ minWidth: 150 }}>Giảm giá</Typography>
            <TextField
              type="number"
              value={formData?.discount || 0}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              fullWidth
              size="small"
              error={!!errors?.name}
              helperText={errors?.name}
            />
            </Box>
             <Box display="flex" justifyContent="space-between" mt={1} alignItems="center" gap={2}>
              <Typography color="text.secondary" fontSize={14} sx={{ minWidth: 150 }}>Đã thanh toán</Typography>
            <TextField
              type="number"
              value={formData?.paid || 0}
              onChange={(e) => setFormData({ ...formData, paid: e.target.value })}
              fullWidth
              size="small"
              error={!!errors?.name}
              helperText={errors?.name}
            />
            </Box> <Box display="flex" justifyContent="space-between" mt={1} alignItems="center" gap={2}>
              <Typography color="text.secondary" fontSize={14} sx={{ minWidth: 150 }}>Còn lại:</Typography>
            <TextField
              type="text"
              value={formData?.totalAmount || 0}
              // onChange={(e) => setFormData({ ...formData, note: e.target.value })}
               InputProps={{ readOnly: true }}
              fullWidth
              size="small"
              error={!!errors?.name}
              helperText={errors?.name}
            />
            </Box>
        </Box>
          <Box display="flex" justifyContent="space-between" mt={1} alignItems="center" gap={2}>
              <Typography color="text.secondary" fontSize={14} sx={{ minWidth: 150 }}>Ghi chú</Typography>
            <TextField
              type="text"
              value={formData?.note || ""}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              fullWidth
              size="small"
              error={!!errors?.name}
              helperText={errors?.name}
            />
            </Box>
      </Paper>

      {/* Actions */}
      <Box mt={4} display="flex" justifyContent="space-between" gap={2}>
        {isEditing ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              aria-label="Lưu"
            >
              Lưu
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              aria-label="Hủy"
            >
              Hủy
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsEditing(true)}
              aria-label="Chỉnh sửa"
            >
              Chỉnh sửa
            </Button>
            {formData?.status.toLowerCase() !== "paid" && (
              <Button
                variant="outlined"
                color="success"
                onClick={() => navigate(`/manager/create-payment/${formData?.id}`)}
                aria-label="Thanh toán ngay"
              >
                Thanh toán ngay
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              sx={{ px: 4, py: 1.5, fontWeight: "bold" }}
              onClick={() => navigate(-1)}
              aria-label="Quay lại"
            >
              Quay lại
            </Button>
          </>
        )}
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

BillDetailPage.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
    dueDate: PropTypes.string,
    paymentDate: PropTypes.string,
    status: PropTypes.string,
    discount: PropTypes.number,
    paid: PropTypes.number,
    note: PropTypes.string,
    totalAmount: PropTypes.number,
    room: PropTypes.shape({
      id: PropTypes.number,
      roomNumber: PropTypes.string,
      status: PropTypes.string,
      cost: PropTypes.number,
      isActive: PropTypes.bool,
      furniture: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string,
      number: PropTypes.number
    }),
    renter: PropTypes.shape({
      id: PropTypes.string,
      fullName: PropTypes.string,
      gender: PropTypes.string,
      status: PropTypes.string,
      phone: PropTypes.string,
      dob: PropTypes.string,
      identification: PropTypes.string,
      placeOfOrigin: PropTypes.string,
      address: PropTypes.string,
      familyPhone: PropTypes.string,
      isRegister: PropTypes.bool,
    }),
    createAt: PropTypes.string,
    updateAt: PropTypes.string,
    billDetails: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        unitPrice: PropTypes.number,
        quantity: PropTypes.number,
        total: PropTypes.number,
      })
    ),
  }),
};

export default BillDetailPage;