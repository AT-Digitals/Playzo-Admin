import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const rows = [
  {
    MembershipList: 1,
    Name: 'Frozen yoghurt',
    PhoneNumber: 5685235654,
    MembershipType: 'Turf',
    startDate: 23 / 5 / 2023,
    EndDate: 4.0 - 4.3,
    PaymentType: 300,
    Status: 450,
  },
  {
    MembershipList: 2,
    Name: 'Frozen yoghurt',
    PhoneNumber: 5685235654,
    MembershipType: 'Turf',
    startDate: 23 / 5 / 2023,
    EndDate: 4.0 - 4.3,
    PaymentType: 300,
    Status: 450,
  },
  {
    MembershipList: 3,
    Name: 'Frozen yoghurt',
    PhoneNumber: 5685235654,
    MembershipType: 'Turf',
    startDate: 23 / 5 / 2023,
    EndDate: 4.0 - 4.3,
    PaymentType: 300,
    Status: 450,
  },
  {
    MembershipList: 4,
    Name: 'Frozen yoghurt',
    PhoneNumber: 5685235654,
    MembershipType: 'Turf',
    startDate: 23 / 5 / 2023,
    EndDate: 4.0 - 4.3,
    PaymentType: 300,
    Status: 450,
  },
  {
    MembershipList: 5,
    Name: 'Frozen yoghurt',
    PhoneNumber: 5685235654,
    MembershipType: 'Turf',
    startDate: 23 / 5 / 2023,
    EndDate: 4.0 - 4.3,
    PaymentType: 300,
    Status: 450,
  },
]

export default function MembershipTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Membership List</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Membarship Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Payment Type</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.MembershipList} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.MembershipList}
              </TableCell>
              <TableCell>{row.Name}</TableCell>
              <TableCell>{row.PhoneNumber}</TableCell>
              <TableCell>{row.MembershipType}</TableCell>
              <TableCell>{row.startDate}</TableCell>
              <TableCell>{row.EndDate}</TableCell>
              <TableCell>{row.PaymentType}</TableCell>
              <TableCell>{row.Status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
