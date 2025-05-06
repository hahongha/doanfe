import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid2, TablePagination } from '@mui/material';
import { Add, Group, LocationOn, Person, Phone } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import ContractMemberDialog from './ContractMemberDialog';
import { useDispatch, useSelector } from 'react-redux';
import { searchContractMemberRequest } from 'redux/actions/contractMemberAction';
import SearchBar from 'components/SearchBar';
import ContractMemberList from './contractMemberList';
function ContractMember() {
  const [open, setOpen] = useState(false);
  const [selectMember, setSelectMember] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const contractMembersData = useSelector((state) => state.contractMember.contractMembers);
  const totalRecords = useSelector((state) => state.contractMember.totalRecords);
  const dispatch = useDispatch();
  const handleClose = () => {
    setSelectMember(null);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(
      searchContractMemberRequest({
        page,
        size: rowsPerPage,
        value: `%${keyword}%`
      })
    );
  }, [dispatch, page, rowsPerPage, keyword]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleOpen = (card) => {
    setSelectMember(card);
    setOpen(true);
  };

  return (
    <MainCard>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <SearchBar keyword={keyword} onChange={handleSearchChange} />
        </Grid2>
        <Grid2 size={4}>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
            Thêm mới
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} mt={2}>
        <ContractMemberList contractMembersData={contractMembersData} handleOpen={handleOpen} />
      </Grid2>
      <TablePagination
        page={page}
        component="div"
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[1, 2, 4, 6, 8, 10, 20, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${`trong`} ${count !== -1 ? count : `more than ${to}`}`}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
      />
      <ContractMemberDialog open={open} handleClose={handleClose} member={selectMember} />
    </MainCard>
  );
}

export default ContractMember;
