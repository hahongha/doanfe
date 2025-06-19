import React, { useState } from 'react';
import { Users, Home, FileText, Calendar, DollarSign, Check, X } from 'lucide-react';
import { Box, Typography, Button, Tab, Tabs, Paper, Grid, CircularProgress, Chip } from '@mui/material';
import ContractTab from './ContractTab';
import RoomTab from './RoomTab';
import ContractMemberTab from './ContractMemberTab';
import RenterTab from './RenterTab';
import OwnerTab from './OwnerTab';

export default function RentalContract({contract}) {
  const [activeTab, setActiveTab] = useState('contract');

  const [contractData, setContractData] = useState(contract?contract:{
    "id": "",
    "renter": {
      "id": "",
      "fullName": "",
      "gender": "",
      "status": "",
      "phone": "",
      "dob": "",
      "identification": "",
      "placeOfOrigin": "",
      "address": "",
      "familyPhone": "",
      "isRegister": false
    },
    "room": {
      "id": 0,
      "roomNumber": "",
      "status": "",
      "cost": 0,
      "isActive": false,
      "funiture": [],
      "description": "",
      "number": 0,
      "electricIndex": 0,
      "waterIndex": 0,
      "room_Type": {
        "id": 0,
        "name": "",
        "size": 0,
        "description": "",
        "imageList": []
      },
      "images": [],
      "contractId": ""
    },
    "month": 0,
    "startDate": "",
    "endDate": "",
    "realEndDate": "",
    "rentalPrice": 0,
    "deposit": 0,
    "isDeposit": false,
    "status": "",
    "signatureDate": ""
  }
  );

  const renderContractTab = () => (
    <ContractTab contractData={contractData}  />
  );

  const renderRoomTab = () => (
    <RoomTab roomData={contractData?.room} />
  );
  const renderContractMemberTab = () => {
    return <ContractMemberTab contractId={contractData?.id} />;
  };

  const renderTenantTab = () => (
    <RenterTab renterData={contract?.renter}/>
  );
  const renderOwnerTab = () => (
    <OwnerTab/>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs 
        value={activeTab} 
        onChange={(e, newValue) => setActiveTab(newValue)} 
        indicatorColor="primary" 
        textColor="primary" 
        variant="fullWidth"
      >
        <Tab label="Hợp đồng" value="contract" />
        <Tab label="Phòng" value="room" />
        <Tab label="Người thuê" value="tenant" />
        <Tab label="Chủ trọ" value="owner" />
        <Tab label="Người thuê cùng" value="contractmember" />
        
      </Tabs>
      {activeTab === 'contract' && renderContractTab()}
      {activeTab === 'room' && renderRoomTab()}
      {activeTab === 'tenant' && renderTenantTab()}
      {activeTab === 'owner' && renderOwnerTab()}
      {activeTab === 'contractmember' && renderContractMemberTab()}
    </Box>
  );
}
