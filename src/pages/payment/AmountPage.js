import DropDownComponent from 'pages/extra-pages/DropDownComponent';
import CustomTextField from 'pages/extra-pages/bookings/bookingComponents/CustomTextField';
import { useState, useEffect } from 'react';
import AmountApi from 'api/AmountApi';

import { Button, Stack, Typography, Grid, Select } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import MainCard from 'components/MainCard';
import MenuItem from '@mui/material/MenuItem';
import AmountTable from './AmountTable';
import UpdateAmountModal from './UpdateAmountModal';

const Data = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 }
];

export default function AmountPage() {
  const [bookingType, setBookingType] = useState('');
  const [amount, setAmount] = useState('');
  const [selectCourt, setSelectCourt] = useState('');
  const [amountData, setAmountData] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);

  const handleChange = (event) => {
    setBookingType(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleCourtChange = (event) => {
    setSelectCourt(event.target.value);
  };

  const handleClose = () => {
    setUpdateModal(false);
    setEditableRowIndex(null);
    setEditedData({ type: '', amount: '', count: '' });
  };

  const addAmount = () => {
    const details = {
      bookingtype: bookingType,
      bookingAmount: amount,
      court: selectCourt
    };
    console.log(details, ' amountdata');
    // if (bookingType && amount && selectCourt) {
    //   setData([...data, details]);
    // }
    const booking = async () => {
      try {
        const response = await AmountApi.createAmount(details);
        alert('success');
        //setAmountData(response);
      } catch (error) {
        console.log('please provide valid data', error);
      }
    };
    booking();

    setAmount('');
    setSelectCourt();
    setBookingType();
  };
  //   const handleClick = () => {
  //     setUpdateModal(true);
  //   };

  const updateModalChange = () => {
    // setUpdateModal(true);
    const details = {
      bookingType: bookingType,
      amount: amount,
      court: selectCourt
    };
    console.log(details, ' amountdata');
    handleModalClose();
  };

  const columns = [
    { id: 'No', label: 'No' },
    { id: 'bookingType', label: 'Booking Type' },
    { id: 'bookingAmount', label: 'Amount' },
    { id: 'court', label: 'Court' },
    { id: 'action', label: 'Action' }
  ];

  const details = [
    {
      type: 'turf',
      amount: 400,
      court: 2
    },
    {
      type: 'turf',
      amount: 400,
      court: 2
    },
    {
      type: 'turf',
      amount: 400,
      court: 2
    }
  ];

  const [editableRowIndex, setEditableRowIndex] = useState(null);
  //const [modalOpen, setModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({ type: '', amount: '', count: '' });

  const handleEditClick = (index) => {
    setEditableRowIndex(index);
    // Clone the data of the clicked row to prevent directly modifying the state
    setEditedData({ ...data[index] });
    setUpdateModal(true);
  };

  const fetchInfo = async () => {
    try {
      const res = await AmountApi.getAll({}).then((data) => {
        //setCount(data.length);
        setAmountData(data);
      });
    } catch {
      console.log('Error fetching data');
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  return (
    <>
      <MainCard title="Add Amount">
        <Stack direction="column" spacing={4} width="100%" maxWidth={1120}>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Stack spacing={2}>
                <Typography>Select Booking Type</Typography>
                <FormControl fullWidth>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={bookingType || ''} onChange={handleChange}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="turf">Turf</MenuItem>
                    <MenuItem value="boardGame">Board Game</MenuItem>
                    <MenuItem value="playstation">Play Station</MenuItem>
                    <MenuItem value="cricketNet">Cricket Net</MenuItem>
                    <MenuItem value="ballMachine">Ball Machine</MenuItem>
                    <MenuItem value="badminton">Badminton</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item md={3}>
              <CustomTextField label="Enter Amount" value={amount} setValue={handleAmountChange} />
            </Grid>
            <Grid item md={3}>
              <DropDownComponent label="Select Court" value={selectCourt || ''} onChange={handleCourtChange} options={Data} />
            </Grid>
            <Grid item md={3}>
              <Button variant="outlined" onClick={addAmount}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </MainCard>
      <AmountTable columns={columns} data={amountData} handleClick={handleEditClick} />
      <UpdateAmountModal
        Type={bookingType}
        TypeChange={handleChange}
        value={amount}
        onChange={handleAmountChange}
        Court={selectCourt}
        CourtChange={handleCourtChange}
        data={Data}
        onSubmit={updateModalChange}
        onClose={handleClose}
        isOpen={updateModal}
      />
    </>
  );
}
