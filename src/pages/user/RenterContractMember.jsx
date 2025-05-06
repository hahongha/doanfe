import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import http from "../../redux/api/http";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function RenterContractMember({contract}) {

const [members, setMembers] = useState(null); 
const [loading, setLoading] = useState(true);
const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
const navigate = useNavigate();
const dispatch = useDispatch();

  const [openRowId, setOpenRowId] = useState(null);

  const fetchMember = async () => {
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
  
      const response = await http.get(`/contractMember/getByContract?contract=${contract}`);
      
      
  
      if (response.data.code === "200") {
        setMembers(response.data.data);
        
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
      fetchMember(contract);
    }else{
      navigate("/login");
    }
  }, [contract]);

  const handleToggle = (id) => {
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  if (!members || members.length === 0) {
      return (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6">Không có phòng nào nào</Typography>
        </Box>
      );
    }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Ảnh</TableCell>
            <TableCell>Họ tên</TableCell>
            <TableCell>Giới tính</TableCell>
            <TableCell>SĐT</TableCell>
            <TableCell>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <React.Fragment key={member.id}>
              <TableRow hover>
                <TableCell>
                  <IconButton onClick={() => handleToggle(member.id)}>
                    {openRowId === member.id ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Avatar src={member.imageUrl} alt={member.fullName} />
                </TableCell>
                <TableCell>{member.fullName}</TableCell>
                <TableCell>{member.gender}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>
                  <Typography color="green">{member.status}</Typography>
                </TableCell>
              </TableRow>

              {/* Expandable Row */}
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={openRowId === member.id} timeout="auto" unmountOnExit>
                    <Box margin={2}>
                      <Typography variant="subtitle1" gutterBottom>
                        Thông tin chi tiết
                      </Typography>
                      <Typography>Ngày sinh: {member.dob}</Typography>
                      <Typography>CMND/CCCD: {member.identification}</Typography>
                      <Typography>Quan hệ thuê: {member.rentalRelationship}</Typography>
                      <Typography>Địa chỉ: {member.address}</Typography>
                      <Typography>Nguyên quán: {member.placeOfOrigin}</Typography>
                      <Typography>SĐT người thân: {member.familyPhone}</Typography>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
