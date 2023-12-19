import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const rows = [
  {
    BookingList: 1,
    Type: 'Turf',
    BookingType: 'cash',
    DateofBooking: 23 / 5 / 2023,
    startTime: '10:00 am',
    endTime: '12:00 pm',
    BookingAmount: 450,
    status: 'paid'
  },
  {
    BookingList: 2,
    Type: 'Turf',
    BookingType: 'cash',
    DateofBooking: 23 / 5 / 2023,
    startTime: '10:00 am',
    endTime: '12:00 pm',
    BookingAmount: 450,
    status: 'paid'
  },
  {
    BookingList: 3,
    Type: 'Turf',
    BookingType: 'cash',
    DateofBooking: 23 / 5 / 2023,
    startTime: '10:00 am',
    endTime: '12:00 pm',
    BookingAmount: 450,
    status: 'paid'
  },
  {
    BookingList: 4,
    Type: 'Turf',
    BookingType: 'cash',
    DateofBooking: 23 / 5 / 2023,
    startTime: '10:00 am',
    endTime: '12:00 pm',
    BookingAmount: 450,
    status: 'paid'
  },
  {
    BookingList: 5,
    Type: 'Turf',
    BookingType: 'cash',
    DateofBooking: 23 / 5 / 2023,
    startTime: '10:00 am',
    endTime: '12:00 pm',
    BookingAmount: 450,
    status: 'pending'
  }
];

export default function BookingTable() {
  return (
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
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.BookingList} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.BookingList}
              </TableCell>
              <TableCell>{row.Type}</TableCell>
              <TableCell>{row.DateofBooking}</TableCell>
              <TableCell>{row.startTime}</TableCell>
              <TableCell>{row.endTime}</TableCell>
              <TableCell>{row.BookingType}</TableCell>
              <TableCell>{row.BookingAmount}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
