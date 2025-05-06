import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, Avatar, TablePagination, Grid2 } from '@mui/material';
import Button from '@mui/material/Button';
import { searchContractRequest } from 'src/redux/actions/contractAction';
import SearchBar from 'components/SearchBar';
import MainCard from 'components/MainCard';
import ContractCard from './ContractCard';
import { useNavigate } from 'react-router';

export default function Contract() {
  const [keyword, setKeyword] = useState('');
  const [contractId, setContractId] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const contractData = useSelector((state) => state.contract.contracts);
  const totalRecords = useSelector((state) => state.contract.totalRecords);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchContractRequest({
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

  const handleOpen = (contract) => {
    setSelectedContract({ ...contract });
    setContractId(contract?.id);
    setOpen(true);
  };
  return (
    <MainCard title="Danh sách hợp đồng">
      <Grid2 container spacing={2} alignItems="center" mb={4}>
        <Grid2 size={6}>
          <SearchBar keyword={keyword} onChange={handleSearchChange} />
        </Grid2>
        <Grid2 size={6} justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={()=>navigate("/manager/createContract")}>
            Tạo hợp đồng mới
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container justifyContent="center">
        {contractData.map((contract) => (
          <ContractCard key={contract.id} contract={contract} onEdit={() => handleOpen(contract)} />
        ))}
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
    </MainCard>
  );
}
