import * as XLSX from 'xlsx';

import { Button, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { AccessType } from 'pages/authentication/auth-forms/AccessType';
import BookingApi from 'api/BookingApi';
import { BookingLength } from './BookingLength';
import { BookingSubTypes } from './BookingSubTypes';
import CommonTable from './bookingComponents/CommonTable';
import CustomDatePicker from './bookingComponents/CustomDatePicker';
import DateUtils from 'utils/DateUtils';
import DropDownComponent from '../DropDownComponent';
import FormControl from '@mui/material/FormControl';
import MainCard from 'components/MainCard';
import MenuItem from '@mui/material/MenuItem';
import NotificationSuccessToast from 'pages/components-overview/NotificationSuccessToast';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import moment from 'moment';
import NotificationToast from 'pages/components-overview/NotificationToast';

const Data = [
  {
    value: 'previous',
    label: 'Previous'
  },
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'future',
    label: 'Future'
  }
];

const BookingTypeData = [
  {
    value: 'manual',
    label: 'Manual'
  },
  {
    value: 'online',
    label: 'Online'
  }
];

const monthData = [
  {
    value: 'oneMonth',
    label: '1 Month'
  },
  {
    value: 'threeMonth',
    label: '3 Month'
  },
  {
    value: 'sixMonth',
    label: '6 Month'
  },
  {
    value: 'oneYear',
    label: '1 year'
  }
];

const paymentData = [
  {
    value: 'cash',
    label: 'Cash'
  },
  {
    value: 'online',
    label: 'Online'
  },
  {
    value: 'upi',
    label: 'UPI'
  },
  {
    value: 'refund',
    label: 'Refund'
  }
];
const getNumberOptions1 = (Type) => {
  const length = BookingLength[Type] || 0;
  return Array.from({ length }, (_, index) => ({
    value: (index + 1).toString(),
    label: BookingSubTypes[Type][index + 1]
  }));
};

export default function BookingListPage() {
  const [bookingType, setBookingType] = useState('All');
  const [data, setData] = useState([]);
  const [monthType, setMonthType] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');

  const [isApplyMode, setIsApplyMode] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [filterData, setFilterData] = useState();
  const [bool, setBool] = useState(false);

  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [selectData, setSelectData] = useState('');
  const [updateModal, setUpdateModal] = useState(false);
  const [payAmount, setPayAmount] = useState('');
  const [payError, setPayError] = useState(false);
  const [UpiError, setUpiError] = useState(false);
  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [updateToast, setUpdateToast] = useState('');
  const [refundCheck, setRefundCheck] = useState(false);
  const [selectBooking, setSelectBooking] = useState('');
  const [selectServiceType, setSelectServiceType] = useState('');
  const [errorToast, setErrorToast] = useState('');
  const [upiAmount, setUpiAmount] = useState('');
  const [cashChecked, setCashChecked] = useState(false);
  const [upiChecked, setUpiChecked] = useState(false);
  const [showCashField, setShowCashField] = useState(false);
  const [showUpiField, setShowUpiField] = useState(false);
  const [paymentType, setPaymentType] = useState('');

  const handleRefundChange = (event) => {
    setRefundCheck(event.target.checked);
  };

  const handleBookingChange = (event) => {
    setSelectBooking(event.target.value);
  };

  const handleCourtChange = (event) => {
    setSelectServiceType(event.target.value);
  };

  const handleUpiChange = (event) => {
    setUpiChecked(event.target.checked);
    if (event.target.checked) {
      setShowUpiField(true);
    } else {
      setShowUpiField(false);
    }
  };

  const handleCashChange = (event) => {
    setCashChecked(event.target.checked);
    if (event.target.checked) {
      setShowCashField(true);
    } else {
      setShowCashField(false);
    }
  };

  const handleButtonClick = async () => {
    setFilteredData(data);
    setBookingType('All');
    setMonthType('');
    setIsApplyMode(true);
    setStartDateValue('');
    setEndDateValue('');
    setSelectBooking('');
    setSelectData('');
    setButtonDisable(false);
    setBool(false);
    setStartDateError(false);
    setEndDateError(false);
    setSelectServiceType('');
    setPaymentType('');
    await BookingApi.getAll({}).then((data) => {
      setCount(data.length);
      setData(data);
    });
    await BookingApi.getAllPaging({ page: page + 1, limit: rowsPerPage }).then((data) => {
      setFilteredData(data);
    });
    setPage(0);
  };

  const buttonhandleChange = (event) => {
    setMonthType(event.target.value);
    setStartDateValue('');
    setEndDateValue('');
    setSelectData('');
  };

  const PaymenthandleChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleChange = (event) => {
    setBookingType(event.target.value);
  };
  const handleDataChange = (event) => {
    setSelectData(event.target.value);
    setMonthType('');
    setStartDateValue('');
    setEndDateValue('');
  };

  const handleUpiAmountChange = (event) => {
    setUpiAmount(event.target.value);
    setUpiError(false);
    setErrorToast('');
  };

  const handleAmountChange = (event) => {
    setPayAmount(event.target.value);
    setPayError(false);
    setErrorToast('');
  };

  const handleModalChange = (index) => {
    setEditableRowIndex(index);
    setUpdateModal(true);
    setUpdateToast('');
  };
  const handleClose = () => {
    setUpdateModal(false);
    setPayError(false);
    setRefundCheck(false);
    setPayAmount('');
    setUpiError(false);
    setUpiAmount('');
    setCashChecked(false);
    setUpiChecked(false);
    setShowCashField(false);
    setShowUpiField(false);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStartDateChange = (newValue) => {
    let startdatedata = newValue.$d;
    const parsedDate = moment(startdatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setStartDateValue(formattedDate);
    setStartDateError(false);
    setMonthType('');
    setSelectData('');
    if (endDateValue && new Date(endDateValue) < new Date(formattedDate)) {
      setEndDateValue('');
    }
  };
  const handleEndDateChange = (newValue) => {
    let enddatedata = newValue.$d;
    const parsedDate = moment(enddatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setEndDateValue(formattedDate);
    setEndDateError(false);
    setMonthType('');
    setSelectData('');
  };

  const fetchInfo = useCallback(async () => {
    try {
      if (bool && filterData) {
        if (filterData.type === 'All') {
          filterData.type = '';
        }
        await BookingApi.filterBook(filterData).then((data) => {
          setCount(data.length);
          setData(data);
        });
        const filter = { ...filterData };
        filter.page = page + 1;
        filter.limit = rowsPerPage;
        await BookingApi.filterPage(filter).then((data) => {
          setFilteredData(data);
        });
      } else {
        await BookingApi.getAll({}).then((data) => {
          setCount(data.length);
          setData(data);
        });
        await BookingApi.getAllPaging({ page: page + 1, limit: rowsPerPage }).then((data) => {
          setFilteredData(data);
        });
      }
    } catch {
      console.log('Error fetching data');
    }
  }, [bool, filterData, page, rowsPerPage]);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  const applyFilters = useCallback(async () => {
    if (startDateValue && endDateValue === '') {
      setEndDateError(true);
      return;
    }

    if (endDateValue && startDateValue === '') {
      setStartDateError(true);
      return;
    }

    if (
      bookingType !== 'All' ||
      startDateValue !== '' ||
      endDateValue !== '' ||
      selectBooking !== '' ||
      monthType !== '' ||
      selectData !== ''
    ) {
      const details = {
        type: bookingType,
        startDate: startDateValue,
        endDate: endDateValue
        // bookingtype: paymentType
        // monthType: monthType,
        // day: selectData
      };

      let dateFilter = '';
      if (monthType === 'oneMonth') {
        dateFilter = DateUtils.subtract(new Date(), 1, 'month', 'yyyy-MM-DD');
      } else if (monthType === 'threeMonth') {
        dateFilter = DateUtils.subtract(new Date(), 3, 'month', 'yyyy-MM-DD');
      } else if (monthType === 'sixMonth') {
        dateFilter = DateUtils.subtract(new Date(), 6, 'month', 'yyyy-MM-DD');
      } else if (monthType === 'oneYear') {
        dateFilter = DateUtils.subtract(new Date(), 1, 'year', 'yyyy-MM-DD');
      }

      let dayFilter = '';
      if (selectData === 'previous') {
        dayFilter = DateUtils.subtract(new Date(), 1, 'day', 'yyyy-MM-DD');
        details.endDate = DateUtils.formatDate(new Date(dayFilter), 'yyyy-MM-DD');
      } else if (selectData === 'today') {
        dayFilter = DateUtils.formatDate(new Date(), 'yyyy-MM-DD');
        // const currentDateValue = DateUtils.add(new Date(), 1, 'day');
        details.endDate = DateUtils.formatDate(new Date(dayFilter), 'yyyy-MM-DD');
        details.startDate = DateUtils.formatDate(new Date(dayFilter), 'yyyy-MM-DD');
      } else if (selectData === 'future') {
        dayFilter = DateUtils.formatDate(DateUtils.add(new Date(), 1, 'day'), 'yyyy-MM-DD');
        details.startDate = DateUtils.formatDate(new Date(dayFilter), 'yyyy-MM-DD');
      }

      if (details.startDate && details.endDate && dateFilter === '' && dayFilter === '') {
        // const a = DateUtils.add(new Date(details.endDate), 1, 'day');
        details.endDate = DateUtils.formatDate(new Date(details.endDate), 'yyyy-MM-DD');
      }

      if (dateFilter !== '') {
        // const currentDateValue = DateUtils.add(new Date(), 1, 'day');
        details.endDate = DateUtils.formatDate(new Date(), 'yyyy-MM-DD');
        details.startDate = DateUtils.formatDate(new Date(dateFilter), 'yyyy-MM-DD');
      }
      if (selectServiceType) {
        details['court'] = selectServiceType.toString();
      }
      if (selectBooking) {
        details['userBookingType'] = selectBooking;
      }
      setFilterData(details);
      setBool(true);
    } else {
      setBool(false);
    }

    setIsApplyMode(false);
    setPage(0);
    setButtonDisable(true);
  }, [bookingType, endDateValue, monthType, selectBooking, selectData, selectServiceType, startDateValue, paymentType]);

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();

    const ModifiedData = data.map((item, index) => {
      const userData = JSON.parse(item.user);
      if (userData !== null) {
        return {
          No: index + 1,
          userName: userData.name,
          service: item.type,
          serviceType: BookingSubTypes[item.type][item.court],
          startDate: moment(item.startDate).format('DD-MM-YYYY'),
          endDate: moment(item.endDate).format('DD-MM-YYYY'),
          startTime: DateUtils.formatMillisecondsToTime(item.startTime),
          endTime: DateUtils.formatMillisecondsToTime(item.endTime),
          bookingType: item.userBookingType,
          email: userData.email,
          dateOfBooking: moment(item.dateOfBooking).format('DD-MM-YYYY'),
          duration: item.duration,
          cashPayment: item.bookingAmount.cash,
          onlinePayment: item.bookingAmount.online,
          totalAmount: item.bookingAmount.total
        };
      }
    });

    const ws = XLSX.utils.json_to_sheet(ModifiedData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'table_data.xlsx');
  };

  const shouldDisableEndDate = (date) => {
    if (!startDateValue) {
      return false;
    }
    return dayjs(date).isBefore(dayjs(startDateValue), 'day');
  };

  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);
  const columns = [
    { id: 'No', label: 'No' },
    { id: 'user', label: 'User Name' },
    { id: 'type', label: 'Services' },
    { id: 'court', label: 'Service Type' },
    { id: 'startDate', label: 'Start Date' },
    { id: 'endDate', label: 'End Date' },
    { id: 'startTime', label: 'Start Time' },
    { id: 'endTime', label: 'End Time' },
    { id: 'userBookingType', label: 'Booking Type' },
    { id: 'cashPayment', label: 'Cash Payment' },
    { id: 'onlinePayment', label: 'Online Payment' },
    { id: 'total', label: 'Total' },
    { id: 'refund', label: 'Refund' }
  ];
  if (userData.accessType !== AccessType.READ) {
    columns.push({
      id: 'action',
      label: 'Action'
    });
  }
  const UpdateChange = async () => {
    const idToUpdate = editableRowIndex.id;
    const value = {
      amount: payAmount,
      id: idToUpdate,
      refund: refundCheck,
      upiamount: upiAmount
    };
    console.log('valuedetails', value);

    if (!upiChecked && !cashChecked) {
      setErrorToast('Please select any one payment option');
    } else if (cashChecked && !payAmount) {
      setPayError(true);
    } else if (upiChecked && !upiAmount) {
      setUpiError(true);
      // if (!payAmount) {
      //   setPayError(true);
      // } else if (upiChecked && upiAmount) {
      //   setUpiError(false);
    } else {
      setPayError(false);
      setUpiError(false);
      try {
        const response = await BookingApi.updateAmount(value.id, {
          bookingAmount: {
            online: 0,
            cash: value.refund ? 0 : value.amount,
            total: value.refund ? 0 : value.amount,
            refund: value.refund ? value.amount : 0
          },
          isRefund: value.refund
        });
        setUpdateToast('Your Amount is updated successfully!');
        handleClose();
      } catch (error) {
        setErrorToast(error.message);
        console.log('error', error.message);
      }
    }
    fetchInfo();
  };

  return (
    <>
      <MainCard title="Booking List">
        <Stack direction="column" spacing={4} width="100%" maxWidth={1120} height={280}>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Stack spacing={2}>
                <Typography>All Services</Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={bookingType}
                    onChange={handleChange}
                    disabled={buttonDisable}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="turf">Turf</MenuItem>
                    <MenuItem value="boardGame">Board Game</MenuItem>
                    <MenuItem value="playstation">Play Station</MenuItem>
                    <MenuItem value="cricketNet">Cricket Net</MenuItem>
                    <MenuItem value="bowlingMachine">Bowling Machine</MenuItem>
                    <MenuItem value="badminton">Badminton</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item md={3}>
              <DropDownComponent
                label="Select Service Type"
                value={selectServiceType || ''}
                onChange={handleCourtChange}
                options={getNumberOptions1(bookingType)}
                disabled={buttonDisable}
              />
            </Grid>
            <Grid item md={3}>
              <CustomDatePicker
                label="Start Date"
                date={startDateValue}
                setDate={handleStartDateChange}
                disablePast={false}
                disableprop={buttonDisable}
                error={startDateError}
              />
            </Grid>
            <Grid item md={3}>
              <CustomDatePicker
                label="End Date"
                date={endDateValue}
                setDate={handleEndDateChange}
                disablePast={false}
                disableprop={buttonDisable}
                shouldDisableDate={shouldDisableEndDate}
                error={endDateError}
              />
            </Grid>
            <Grid item md={3}>
              <DropDownComponent
                label="Booking Type"
                value={selectBooking}
                onChange={handleBookingChange}
                options={BookingTypeData}
                disabled={buttonDisable}
              />
            </Grid>
            <Grid item md={3}>
              <DropDownComponent
                label="Monthly Report"
                value={monthType}
                onChange={buttonhandleChange}
                options={monthData}
                disabled={buttonDisable}
              />
            </Grid>
            <Grid item md={3}>
              <DropDownComponent
                label="Current Bookings"
                value={selectData}
                onChange={handleDataChange}
                options={Data}
                disabled={(startDateValue && endDateValue) || monthType ? true : buttonDisable}
              />
            </Grid>
            <Grid item md={3}>
              <DropDownComponent
                label="Payment Type"
                value={paymentType}
                onChange={PaymenthandleChange}
                options={paymentData}
                disabled={buttonDisable}
              />
            </Grid>

            <Grid item md={5}>
              <Stack direction="row" spacing={2}>
                {isApplyMode ? (
                  <Button
                    variant="outlined"
                    onClick={applyFilters}
                    sx={{ padding: '7px 15px', width: '150px', height: '43px', fontWeight: 600, fontSize: '15px' }}
                  >
                    Apply
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleButtonClick}
                    sx={{ padding: '7px 15px', width: '150px', height: '43px', fontWeight: 600, fontSize: '15px' }}
                  >
                    Clear
                  </Button>
                )}

                <Button
                  variant="outlined"
                  onClick={handleDownload}
                  sx={{ padding: '7px 15px', width: '200px', height: '43px', fontWeight: 600, fontSize: '15px' }}
                >
                  Download Report
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </MainCard>
      {errorToast !== '' ? <NotificationToast error={errorToast} /> : <></>}
      {updateToast !== '' ? <NotificationSuccessToast success={updateToast} /> : <></>}
      <MainCard sx={{ marginTop: '30px' }}>
        <CommonTable
          columns={columns}
          count={count}
          data={filteredData}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChange={handleChangePage}
          payAmount={payAmount}
          onChange={handleAmountChange}
          onClose={handleClose}
          handleModalChange={handleModalChange}
          updateModal={updateModal}
          UpdateChange={UpdateChange}
          error={payError}
          editableRowIndex={editableRowIndex}
          handleRefundChange={handleRefundChange}
          refund={refundCheck}
          Upichecked={upiChecked}
          handleUPIChange={handleUpiChange}
          Cashchecked={cashChecked}
          handleCashChange={handleCashChange}
          handleUpiAmountChange={handleUpiAmountChange}
          UpiAmount={upiAmount}
          showUpi={showUpiField}
          showCash={showCashField}
          UpiError={UpiError}
        />
      </MainCard>
    </>
  );
}
