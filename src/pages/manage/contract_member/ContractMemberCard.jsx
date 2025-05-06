import { Card, CardContent, Typography, Grid2, Avatar, CardMedia, CardHeader } from '@mui/material';
import { Add, Group, LocationOn, Person, Phone } from '@mui/icons-material';
function ContractMemberCard({ card, onOpen }) {
  return (
    <Grid2 size={4} key={card.id}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }} onClick={() => onOpen(card)}>
        <CardHeader avatar={<Avatar src={card.imageUrl} aria-label="recipe" title={card.fullName}></Avatar>} />
        <CardContent sx={{ minHeight: 200, justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', justifyItems: 'baseline' }}>
            <Person />
            {card.fullName}
          </Typography>
          <Typography variant="body1">
            <Phone /> {card.phone}
          </Typography>
          <Typography variant="body1">
            <LocationOn /> {card.address}
          </Typography>
          <Typography variant="body1">
            <Group /> {card.rentalRelationship}
          </Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
}

export default ContractMemberCard;
