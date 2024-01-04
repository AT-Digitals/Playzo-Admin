import React from 'react';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from '@mui/material';
import DateUtils from 'utils/DateUtils';

const CommonTable = ({ columns, data, rowsPerPage, page, handleChangeRowsPerPage, handleChange }) => {
  const renderCellContent = (column, rowData) => {
    const { id } = column;

    if (id === 'dateOfBooking') {
      return moment(rowData[id]).format('YYYY-MM-DD');
    } else if (id === 'startTime' || id === 'endTime') {
      return DateUtils.formatMillisecondsToTime(rowData[id]);
    } else {
      return rowData[id];
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rowData, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.id === 'bookingListNo' ? index + 1 : renderCellContent(column, rowData)}</TableCell>
                ))}
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
        onPageChange={handleChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CommonTable;
