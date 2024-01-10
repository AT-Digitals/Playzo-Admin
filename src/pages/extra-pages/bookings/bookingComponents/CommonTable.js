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
    const { id, label } = column;

    if (id === 'dateOfBooking') {
      return moment(rowData[id]).format('YYYY-MM-DD');
    } else if (id === 'startTime' || id === 'endTime') {
      return DateUtils.formatMillisecondsToTime(rowData[id]);
    } else if (id === 'user' && label === 'User Type') {
      const data = JSON.parse(rowData[id]).userType;
      return data;
    } else if (id === 'user' && label === 'Email ID') {
      const data = JSON.parse(rowData[id]).email;
      return data;
    } else if (id === 'user' && label === 'User Name') {
      const data = JSON.parse(rowData[id]).name;
      return data;
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
            {data.map((rowData, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.id === 'No' ? index + 1 : renderCellContent(column, rowData)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
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
