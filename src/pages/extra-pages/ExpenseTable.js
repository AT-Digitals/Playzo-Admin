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
    ItemList: 1,
    ItemCode: '123434',
    ItemName: 'Frozen yoghurt',
    PurchaseType: 'Turf',
    Quantity: 10,
    Amount: 100,
    TotalAmount: 1000,
    PaymentType: 300,
    Status: 'paid',
  },
  {
    ItemList: 2,
    ItemCode: '123434',
    ItemName: 'Frozen yoghurt',
    PurchaseType: 'Turf',
    Quantity: 10,
    Amount: 100,
    TotalAmount: 1000,
    PaymentType: 300,
    Status: 'paid',
  },
  {
    ItemList: 3,
    ItemCode: '123434',
    ItemName: 'Frozen yoghurt',
    PurchaseType: 'Turf',
    Quantity: 10,
    Amount: 100,
    TotalAmount: 1000,
    PaymentType: 300,
    Status: 'paid',
  },
  {
    ItemList: 4,
    ItemCode: '123434',
    ItemName: 'Frozen yoghurt',
    PurchaseType: 'Turf',
    Quantity: 10,
    Amount: 100,
    TotalAmount: 1000,
    PaymentType: 300,
    Status: 'paid',
  },
  {
    ItemList: 5,
    ItemCode: '123434',
    ItemName: 'Frozen yoghurt',
    PurchaseType: 'Today',
    Quantity: 10,
    Amount: 100,
    TotalAmount: 1000,
    PaymentType: 'cash',
    Status: 'paid',
  },
]

export default function ExpenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item List</TableCell>
            <TableCell>Item Code</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Purchase Type</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Payment Type</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.ItemList} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.ItemList}
              </TableCell>
              <TableCell>{row.ItemCode}</TableCell>
              <TableCell>{row.ItemName}</TableCell>
              <TableCell>{row.PurchaseType}</TableCell>
              <TableCell>{row.Quantity}</TableCell>
              <TableCell>{row.Amount}</TableCell>
              <TableCell>{row.TotalAmount}</TableCell>
              <TableCell>{row.PaymentType}</TableCell>
              <TableCell>{row.Status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
