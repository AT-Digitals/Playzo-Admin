import * as React from 'react';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { TablePagination } from '@mui/material';
import DateUtils from 'utils/DateUtils';

export default function BookingTable({ bookingList, bookingtype }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const data = bookingList;

  const filteredData = bookingtype === 'All' ? data : data.filter((item) => item.type === bookingtype);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Booking List No</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Selected Date</TableCell>
              <TableCell>Selected Start Time</TableCell>
              <TableCell>Selected End Time</TableCell>
              <TableCell>Booking Type</TableCell>
              <TableCell>Booking Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{data.type}</TableCell>
                <TableCell>{moment(data.dateOfBooking).format('YYYY-MM-DD')}</TableCell>
                <TableCell>{DateUtils.formatMillisecondsToTime(data.startTime)}</TableCell>
                <TableCell>{DateUtils.formatMillisecondsToTime(data.endTime)}</TableCell>
                <TableCell>{data.bookingType}</TableCell>
                <TableCell>{data.bookingAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
