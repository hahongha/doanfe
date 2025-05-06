import { Grid2 } from '@mui/material';
import ContractMemberCard from './ContractMemberCard';
function ContractMemberList({ contractMembersData, handleOpen }) {
  return (
    <Grid2 container spacing={2} mt={2}>
      {contractMembersData.map((card) => (
        <ContractMemberCard card={card} key={card.id} onOpen={(e) => handleOpen(card)} />
      ))}
    </Grid2>
  );
}

export default ContractMemberList;
