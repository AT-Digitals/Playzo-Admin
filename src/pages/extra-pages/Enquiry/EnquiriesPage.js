import { Button, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import CommonTable from '../bookings/bookingComponents/CommonTable';
import CustomDatePicker from '../bookings/bookingComponents/CustomDatePicker';
import DateUtils from 'utils/DateUtils';
import EnquiryApi from 'api/EnquiryApi';
import MainCard from 'components/MainCard';
import TableList from 'pages/common/TableList';
import dayjs from 'dayjs';
import moment from 'moment';

const columns = [
  { id: 'No', label: 'No' },
  { id: 'userName', label: 'User Name' },
  { id: 'userEmail', label: 'Email ID' },
  { id: 'phoneNumber', label: 'User Number' },
  { id: 'enquiryMessage', label: 'Message' }
];

export default function EnquiriesPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [isApplyMode, setIsApplyMode] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [bool, setBool] = useState(false);
  const [filterData, setFilterData] = useState();

  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleButtonClick = async () => {
    setFilteredData(data);
    setIsApplyMode(true);
    setStartDate('');
    setEndDate('');
    setButtonDisable(false);
    setBool(false);
    const res = await EnquiryApi.getAll({}).then((data) => {
      setCount(data.length);
      setData(data);
    });
    const res1 = await EnquiryApi.getAllPaging({ page: page + 1, limit: rowsPerPage }).then((data) => {
      setFilteredData(data);
    });
    setPage(0);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStartDateChange = (newValue) => {
    let enddatedata = newValue.$d;
    const parsedDate = moment(enddatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setStartDate(formattedDate);
    setStartDateError(false);
  };

  const handleEndDateChange = (newValue) => {
    let enddatedata = newValue.$d;
    const parsedDate = moment(enddatedata);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setEndDate(formattedDate);
    setEndDateError(false);
  };

  const fetchInfo = useCallback(async () => {
    try {
      if (bool && filterData) {
        const res = await EnquiryApi.filterEnquiry(filterData).then((data) => {
          setCount(data.length);
          setData(data);
        });
        let filter = filterData;
        filter.page = page + 1;
        filter.limit = rowsPerPage;
        const res1 = await EnquiryApi.filterDateEnquiry(filter).then((data) => {
          setFilteredData(data);
        });
      } else {
        const res = await EnquiryApi.getAll({}).then((data) => {
          setCount(data.length);
          setData(data);
        });
        const res1 = await EnquiryApi.getAllPaging({ page: page + 1, limit: rowsPerPage }).then((data) => {
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
  // useEffect(() => {
  //   const fetchInfo = async () => {
  //     try {
  //       const res = await EnquiryApi.getAll({}).then((data) => {
  //         setCount(data.length);
  //       });
  //       const res1 = await EnquiryApi.getAllPaging({ page: page + 1, limit: rowsPerPage }).then((data) => {
  //         setData(data);
  //         setFilteredData(data);
  //       });
  //     } catch {
  //       console.log('Error fetching data');
  //     }
  //   };
  //   fetchInfo();
  // }, [page, rowsPerPage]);

  const ApplyFilter = useCallback(
    async (event) => {
      event.preventDefault();
      if (startDate && endDate === '') {
        setEndDateError(true);
        return;
      }

      if (endDate && startDate === '') {
        setStartDateError(true);
        return;
      }

      if (startDate !== '' || endDate !== '') {
        const filter = {
          startDate: startDate,
          endDate: endDate
        };
        if (filter.startDate && filter.endDate) {
          const a = DateUtils.add(new Date(filter.endDate), 1, 'day');
          filter.endDate = DateUtils.formatDate(new Date(a), 'yyyy-MM-DD');
        }
        console.log('filter', filter);
        setFilterData(filter);
        setBool(true);
      } else {
        setBool(false);
      }
      setButtonDisable(true);

      setIsApplyMode(false);
    },
    [endDate, startDate]
  );
  //   if (startDate && endDate === '') {
  //     setEndDateError(true);
  //   }

  //   if (endDate && startDate === '') {
  //     setStartDateError(true);
  //   }

  //   if (startDate && endDate) {
  //     setIsApplyMode(false);
  //     setButtonDisable(true);
  //   }

  //   const filterdata = {
  //     startdate: startDate,
  //     enddate: endDate
  //   };
  //   console.log('filter', filterdata);
  // };

  const shouldDisableEndDate = (date) => {
    if (!startDate) {
      return false;
    }
    return dayjs(date).isBefore(dayjs(startDate), 'day');
  };
  const shouldDisableStartDate = (date) => {
    if (!endDate) {
      return false;
    }
    return dayjs(date).isAfter(dayjs(endDate), 'day');
  };

  return (
    <MainCard title="Enquiries">
      <Stack direction="column" spacing={4}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <CustomDatePicker
              label="Start Date"
              date={startDate}
              setDate={handleStartDateChange}
              disablePast={false}
              disableprop={buttonDisable}
              error={startDateError}
              shouldDisableDate={shouldDisableStartDate}
            />
            <CustomDatePicker
              label="End Date"
              date={endDate}
              setDate={handleEndDateChange}
              disablePast={false}
              disableprop={buttonDisable}
              shouldDisableDate={shouldDisableEndDate}
              error={endDateError}
            />
          </Stack>
          {isApplyMode ? (
            <Button variant="outlined" onClick={ApplyFilter} sx={{ width: '150px', height: '50px' }}>
              Apply
            </Button>
          ) : (
            <Button variant="outlined" onClick={handleButtonClick} sx={{ width: '150px', height: '50px' }}>
              Clear
            </Button>
          )}
        </Stack>

        <TableList
          count={count}
          columns={columns}
          data={filteredData}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        ></TableList>
      </Stack>
    </MainCard>
  );
}
