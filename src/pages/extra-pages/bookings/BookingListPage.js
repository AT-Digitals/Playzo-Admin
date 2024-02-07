import * as XLSX from 'xlsx';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import BookingApi from 'api/BookingApi';
import CommonTable from './bookingComponents/CommonTable';
import CustomDatePicker from './bookingComponents/CustomDatePicker';
import DateUtils from 'utils/DateUtils';
import DropDownComponent from '../DropDownComponent';
import FormControl from '@mui/material/FormControl';
import MainCard from 'components/MainCard';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButtonComponent from './ToggleButtonComponent';
import dayjs from 'dayjs';
import moment from 'moment';
import NotificationSuccessToast from 'pages/components-overview/NotificationSuccessToast';

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
  const [paymentType, setPaymentType] = useState('');
  const [filterData, setFilterData] = useState();
  const [bool, setBool] = useState(false);

  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [selectData, setSelectData] = useState('');
  const [updateModal, setUpdateModal] = useState(false);
  const [payAmount, setPayAmount] = useState('');
  const [payError, setPayError] = useState(false);
  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [updateToast, setUpdateToast] = useState('');
  const [refundCheck, setRefundCheck] = useState(false);

  const handleRefundChange = (event) => {
    setRefundCheck(event.target.checked);
  };

  const handleButtonClick = async () => {
    setFilteredData(data);
    setBookingType('All');
    setMonthType('');
    setIsApplyMode(true);
    setStartDateValue('');
    setEndDateValue('');
    setPaymentType('');
    setSelectData('');
    setButtonDisable(false);
    setBool(false);
    setStartDateError(false);
    setEndDateError(false);
    const res = await BookingApi.getAll({}).then((data) => {
      setCount(data.length);
      setData(data);
    });
    const res1 = await BookingApi.getAllPaging({ page: page + 1, limit: rowsPerPage }).then((data) => {
      setFilteredData(data);
    });
    setPage(0);
  };

  const buttonhandleChange = (event, newValue) => {
    setMonthType(newValue);
    setStartDateValue('');
    setEndDateValue('');
  };

  const handleChange = (event) => {
    setBookingType(event.target.value);
  };
  const handleDataChange = (event) => {
    setSelectData(event.target.value);
  };

  const handlePaymentChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleModalChange = (index) => {
    setEditableRowIndex(index);
    setUpdateModal(true);
  };

  const handleAmountChange = (event) => {
    setPayAmount(event.target.value);
    setPayError(false);
  };

  const handleClose = () => {
    setUpdateModal(false);
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
  };
  const handleEndDateChange = (newValue) => {
    let enddatedata = newValue.$d;
    const parsedDate = moment(enddatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setEndDateValue(formattedDate);
    setEndDateError(false);
    setMonthType('');
  };

  const fetchInfo = useCallback(async () => {
    try {
      if (bool && filterData) {
        if (filterData.type === 'All') {
          filterData.type = '';
        }
        const res = await BookingApi.filterBook(filterData).then((data) => {
          setCount(data.length);
          setData(data);
        });
        let a = filterData;
        a.page = page + 1;
        a.limit = rowsPerPage;
        const res1 = await BookingApi.filterPage(a).then((data) => {
          setFilteredData(data);
        });
      } else {
        const res = await BookingApi.getAll({}).then((data) => {
          setCount(data.length);
          setData(data);
        });
        const res1 = await BookingApi.getAllPaging({ page: page + 1, limit: rowsPerPage }).then((data) => {
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
      paymentType !== '' ||
      monthType !== '' ||
      selectData !== ''
    ) {
      const details = {
        type: bookingType,
        startDate: startDateValue,
        endDate: endDateValue,
        bookingtype: paymentType
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
      console.log('dayFilter', dayFilter);

      console.log('dateFilter', dateFilter);
      if (details.startDate && details.endDate && dateFilter === '' && dayFilter === '') {
        const a = DateUtils.add(new Date(details.endDate), 1, 'day');
        details.endDate = DateUtils.formatDate(new Date(a), 'yyyy-MM-DD');
      }

      if (dateFilter !== '') {
        const currentDateValue = DateUtils.add(new Date(), 1, 'day');
        details.endDate = DateUtils.formatDate(new Date(currentDateValue), 'yyyy-MM-DD');
        details.startDate = DateUtils.formatDate(new Date(dateFilter), 'yyyy-MM-DD');
      }

      // if(dayFilter!== ''){
      //   const currentDateValue = DateUtils.add(new Date(), 1, 'day');
      //   details.endDate = DateUtils.formatDate(new Date(currentDateValue), 'yyyy-MM-DD');
      //   details.startDate = DateUtils.formatDate(new Date(dateFilter), 'yyyy-MM-DD');
      // }

      console.log('dateFilter', dateFilter);
      setFilterData(details);
      console.log('details', details);
      setBool(true);
    } else {
      setBool(false);
    }

    setIsApplyMode(false);
    setPage(0);
    setButtonDisable(true);
  }, [bookingType, endDateValue, monthType, paymentType, selectData, startDateValue]);

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();

    const ModifiedData = data.map((item) => ({
      ...item,
      startTime: DateUtils.formatMillisecondsToTime(item.startTime),
      endTime: DateUtils.formatMillisecondsToTime(item.endTime),
      startDate: moment(item.startDate).format('YYYY-MM-DD'),
      endDate: moment(item.endDate).format('YYYY-MM-DD'),
      user: JSON.parse(item.user).name,
      userType: JSON.parse(item.user).userType,
      email: JSON.parse(item.user).email
    }));

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

  const shouldDisableStartDate = (date) => {
    if (!endDateValue) {
      return false;
    }
    return dayjs(date).isAfter(dayjs(endDateValue), 'day');
  };

  const columns = [
    { id: 'No', label: 'No' },
    //{ id: 'id', label: 'Id' },
    { id: 'user', label: 'User Name' },
    { id: 'type', label: 'Services' },
    { id: 'court', label: 'Service Type' },
    { id: 'startDate', label: 'Start Date' },
    { id: 'endDate', label: 'End Date' },
    { id: 'startTime', label: 'Start Time' },
    { id: 'endTime', label: 'End Time' },
    { id: 'bookingtype', label: 'Booking Type' },
    { id: 'userType', label: 'User Type' },
    { id: 'cashPayment', label: 'Cash Payment' },
    { id: 'onlinePayment', label: 'Online Payment' },
    { id: 'action', label: 'Action' }
  ];

  const UpdateChange = async (event) => {
    event.preventDefault();
    if (!payAmount) {
      setPayError(true);
    }

    if (payAmount) {
      setPayError(false);
      setUpdateModal(false);
      setEditableRowIndex(null);
      setPayAmount('');
    }
    const idToUpdate = filteredData[editableRowIndex].id;
    const value = {
      amount: payAmount,
      id: idToUpdate,
      refund: refundCheck
    };
    try {
      const res = await BookingApi.updateAmount(value.id, {
        bookingAmount: {
          online: 0,
          cash: value.amount,
          total: value.amount
        }
        // isRefund: value.refund
      });
      setUpdateToast('Your Amount is updated successfully!');
    } catch (error) {
      console.log('please provide valid amount', error);
    }
    console.log('value', value);

    fetchInfo();
  };

  return (
    <>
      <MainCard title="Booking List">
        <Stack direction="column" spacing={4} width="100%" maxWidth={1120}>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Stack spacing={2}>
                <Typography>Select Booking Type</Typography>
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
                    <MenuItem value="ballMachine">Ball Machine</MenuItem>
                    <MenuItem value="badminton">Badminton</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item md={3}>
              <CustomDatePicker
                label="Start Date"
                date={startDateValue}
                setDate={handleStartDateChange}
                disablePast={false}
                disableprop={buttonDisable}
                shouldDisableDate={shouldDisableStartDate}
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
              <Stack spacing={2}>
                <Typography>Payment Type</Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={paymentType}
                    onChange={handlePaymentChange}
                    disabled={buttonDisable}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="online">Online</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item md={3}>
              <ToggleButtonComponent value={monthType} setValue={buttonhandleChange} disableprop={buttonDisable} />
            </Grid>
            <Grid item md={3}>
              <DropDownComponent label="Select Day" value={selectData} onChange={handleDataChange} options={Data} />
            </Grid>

            <Grid item md={5}>
              <Stack direction="row" spacing={2} mt={4.5}>
                {isApplyMode ? (
                  <Button
                    variant="outlined"
                    onClick={applyFilters}
                    sx={{ padding: '7px 15px', width: '150px', fontWeight: 600, fontSize: '15px' }}
                  >
                    Apply
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleButtonClick}
                    sx={{ padding: '7px 15px', width: '150px', fontWeight: 600, fontSize: '15px' }}
                  >
                    Clear
                  </Button>
                )}

                <Button
                  variant="outlined"
                  onClick={handleDownload}
                  sx={{ padding: '7px 15px', width: '150px', fontWeight: 600, fontSize: '15px' }}
                >
                  Download
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </MainCard>
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
        />
      </MainCard>
    </>
  );
}
