import { Button, Grid, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import AmountApi from 'api/AmountApi';
import AmountTable from './AmountTable';
import { BookingLength } from 'pages/extra-pages/bookings/BookingLength';
import { BookingSubTypes } from 'pages/extra-pages/bookings/BookingSubTypes';
import CustomTextField from 'pages/extra-pages/bookings/bookingComponents/CustomTextField';
import DropDownComponent from 'pages/extra-pages/DropDownComponent';
import MainCard from 'components/MainCard';
import NotificationSuccessToast from 'pages/components-overview/NotificationSuccessToast';
import NotificationToast from 'pages/components-overview/NotificationToast';
import TypeDropdown from 'pages/extra-pages/bookings/bookingComponents/TypeDropdown';

// const Data = [
//   { value: 1, label: 1 },
//   { value: 2, label: 2 },
//   { value: 3, label: 3 },
//   { value: 4, label: 4 },
//   { value: 5, label: 5 }
// ];
const getNumberOptions1 = (Type) => {
  const length = BookingLength[Type] || 0;
  return Array.from({ length }, (_, index) => ({
    value: (index + 1).toString(),
    label: BookingSubTypes[Type][index + 1]
  }));
};
export default function AmountPage() {
  const [bookingType, setBookingType] = useState('');
  const [amount, setAmount] = useState('');
  const [selectCourt, setSelectCourt] = useState('');
  const [amountData, setAmountData] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [courtError, setCourtError] = useState(false);
  const [successtoast, setSuccesstoast] = useState('');
  const [updateSuccesstoast, setUpdateSuccesstoast] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toast, setToast] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [editedData, setEditedData] = useState([]);
  const [editableRowIndex, setEditableRowIndex] = useState(null);

  const handleChange = (event) => {
    setBookingType(event.target.value);
    setTypeError(false);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setAmountError(false);
  };
  const handleCourtChange = (event) => {
    setSelectCourt(event.target.value);
    setCourtError(false);
  };

  const handleClose = () => {
    setUpdateModal(false);
    setEditableRowIndex(null);
  };

  const addAmount = () => {
    if (!bookingType) {
      setTypeError(true);
    }
    if (!amount) {
      setAmountError(true);
    }
    if (!selectCourt) {
      setCourtError(true);
    }

    if (bookingType && amount && selectCourt) {
      const details = {
        bookingtype: bookingType,
        bookingAmount: amount,
        court: selectCourt
      };

      const booking = async () => {
        try {
          const response = await AmountApi.createAmount(details);
          setSuccesstoast('Your Amount is added.');
          if (response) {
            setAmountData([...amountData, response]);
          } else {
            console.error('Failed to add data:', response);
          }
        } catch (error) {
          console.log('please provide valid data', error);
        }
      };
      booking();
      setAmount('');
      setSelectCourt();
      setBookingType();
      setSuccesstoast('');
    }
  };

  const handleEditClick = (index) => {
    setEditableRowIndex(index);
    setUpdateModal(true);
    setEditedData(index);
  };

  const updateModalChange = async () => {
    const idToUpdate = editedData.id;
    const details = {
      bookingtype: editedData.bookingType,
      bookingAmount: editedData.bookingAmount,
      court: editedData.court,
      id: idToUpdate
    };
    try {
      const res = await AmountApi.updateAmount(details.id, {
        bookingtype: details.bookingtype,
        bookingAmount: details.bookingAmount,
        court: details.court
      });
      setUpdateSuccesstoast('Your Amount is updated successfully!');
    } catch (error) {
      console.log('please provide valid data', error);
    }

    fetchInfo();
    handleClose();
  };

  const columns = [
    { id: 'No', label: 'No' },
    { id: 'bookingType', label: 'Booking Type' },
    { id: 'bookingAmount', label: 'Amount' },
    { id: 'court', label: 'Court' },
    { id: 'action', label: 'Action' }
  ];

  const fetchInfo = useCallback(async () => {
    try {
      const res = await AmountApi.getAll({}).then((data) => {
        setAmountData(data);
      });
    } catch {
      console.log('Error fetching data');
    }
  }, []);

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <Stack direction="column" spacing={3}>
      <MainCard title="Amount List">
        <Stack direction="column" spacing={4} width="100%" maxWidth={1120} height={130}>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <TypeDropdown label="Select Booking Type" type={bookingType || ''} onChange={handleChange} error={typeError} />
            </Grid>
            <Grid item md={3}>
              <CustomTextField
                label="Enter Amount"
                value={amount || ''}
                setValue={handleAmountChange}
                error={amountError}
                errorText="please Enter a valid Amount"
              />
            </Grid>
            <Grid item md={3}>
              <DropDownComponent
                label="Select Court"
                value={selectCourt || ''}
                onChange={handleCourtChange}
                options={getNumberOptions1(bookingType)}
                error={courtError}
              />
            </Grid>
            <Grid item md={3}>
              <Button
                variant="outlined"
                sx={{ padding: '7px 15px', width: '150px', fontWeight: 600, fontSize: '15px', marginTop: '35px' }}
                onClick={addAmount}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Stack>
        {successtoast !== '' ? <NotificationSuccessToast success={successtoast} /> : <></>}
      </MainCard>
      <MainCard>
        <AmountTable
          columns={columns}
          data={amountData}
          handleClick={handleEditClick}
          Type={bookingType}
          editedData={editedData}
          setEditedData={setEditedData}
          details={getNumberOptions1(editedData.bookingType)}
          onSubmit={updateModalChange}
          onClose={handleClose}
          isOpen={updateModal}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {toast !== '' ? <NotificationToast error={toast} /> : <></>}
        {updateSuccesstoast !== '' ? <NotificationSuccessToast success={updateSuccesstoast} /> : <></>}
      </MainCard>
    </Stack>
  );
}
