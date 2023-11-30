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
    CustomerName: 'Frozen yoghurt',
    PhoneNumber: 5685235654,
    BookingType: 'Turf',
    Date: 23 / 5 / 2023,
    slots: 4.0 - 4.3,
    Bookingfees: 300,
    Totalfess: 450
  },
  {
    BookingList: 2,
    CustomerName: 'Frozen yoghurt',
    PhoneNumber: 5685235654,
    BookingType: 'Turf',
    Date: 23 / 5 / 2023,
    slots: 4.0 - 4.3,
    Bookingfees: 300,
    Totalfess: 450
  },
  {
    BookingList: 3,
    CustomerName: 'Frozen yoghurt',
    PhoneNumber: 5685235654,
    BookingType: 'Turf',
    Date: 23 / 5 / 2023,
    slots: 4.0 - 4.3,
    Bookingfees: 300,
    Totalfess: 450
  },
  {
    BookingList: 4,
    CustomerName: 'Frozen yoghurt',
    PhoneNumber: 5685235654,
    BookingType: 'Turf',
    Date: 23 / 5 / 2023,
    slots: 4.0 - 4.3,
    Bookingfees: 300,
    Totalfess: 450
  },
  {
    BookingList: 5,
    CustomerName: 'Frozen yoghurt',
    PhoneNumber: 5685235654,
    BookingType: 'Turf',
    Date: 23 / 5 / 2023,
    slots: 4.0 - 4.3,
    Bookingfees: 300,
    Totalfess: 450
  }
];

export default function BookingTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Booking List</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Booking Type</TableCell>
            <TableCell>Selected Date</TableCell>
            <TableCell>Selected Slots</TableCell>
            <TableCell>Booking fees</TableCell>
            <TableCell>Total fees</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.BookingList} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.BookingList}
              </TableCell>
              <TableCell>{row.CustomerName}</TableCell>
              <TableCell>{row.PhoneNumber}</TableCell>
              <TableCell>{row.BookingType}</TableCell>
              <TableCell>{row.Date}</TableCell>
              <TableCell>{row.slots}</TableCell>
              <TableCell>{row.Bookingfees}</TableCell>
              <TableCell>{row.Totalfess}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
