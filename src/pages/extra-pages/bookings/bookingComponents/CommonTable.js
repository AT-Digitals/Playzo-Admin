import { BookingSubTypes } from '../BookingSubTypes';
import DateUtils from 'utils/DateUtils';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TablePagination } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import UpdateModalComponent from '../UpdateModalComponent';
import moment from 'moment';

const CommonTable = ({
  columns,
  data,
  rowsPerPage,
  page,
  handleChangeRowsPerPage,
  handleChange,
  count,
  onChange,
  onClose,
  payAmount,
  updateModal,
  handleModalChange,
  UpdateChange,
  editableRowIndex,
  error,
  handleRefundChange,
  refund,
  Upichecked,
  handleUPIChange,
  Cashchecked,
  handleCashChange,
  handleUpiAmountChange,
  UpiAmount,
  showUpi,
  showCash,
  UpiError
}) => {
  const renderCellContent = (column, rowData, rowIndex) => {
    const { id, label } = column;

    if (editableRowIndex === rowIndex) {
      const currentvalue = rowData['id'];
    }
    if (id === 'startDate' || id === 'endDate') {
      return moment(rowData[id]).format('DD-MM-yyyy');
    } else if (id === 'startTime' || id === 'endTime') {
      return DateUtils.formatMillisecondsToTime(rowData[id]);
    } else if (id === 'userType' && label === 'User Type') {
      const data = rowData['user'] !== 'null' && JSON.parse(rowData['user']).userType;
      return data;
    } else if (id === 'userId' && label === 'Email ID') {
      const data = rowData['user'] !== 'null' && JSON.parse(rowData['user']).email;
      return data;
    } else if (id === 'user' && label === 'User Name') {
      const data = rowData['user'] !== 'null' && JSON.parse(rowData['user']).name;
      return data;
    } else if (id === 'bookingAmount' && label === 'Booking Amount') {
      const data = rowData[id].total;
      return data;
    } else if (id === 'cashPayment' && label === 'Cash Payment') {
      const data = rowData['bookingAmount'].cash;
      return data;
    } else if (id === 'upiPayment' && label === 'UPI Payment') {
      const data = rowData['bookingAmount'].upi;
      return data;
    } else if (id === 'onlinePayment' && label === 'Online Payment') {
      const data = rowData['bookingAmount'].online;
      return data;
    } else if (id === 'total' && label === 'Total') {
      const data = rowData['bookingAmount'].total;
      return data;
    } else if (id === 'refund' && label === 'Refund') {
      const data = rowData['bookingAmount'].refund;
      return data;
    } else if (id === 'court' && label === 'Service Type') {
      const data = BookingSubTypes[rowData['type']][rowData['court']];
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
              {columns.map((column, index) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((rowData, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ textTransform: 'capitalize' }}>
                    {column.id === 'action' ? (
                      <>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => handleModalChange(rowData)}
                          disabled={rowData.isRefund}
                        >
                          <EditIcon />
                        </IconButton>
                      </>
                    ) : column.id === 'No' ? (
                      index + 1
                    ) : (
                      renderCellContent(column, rowData, index)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <UpdateModalComponent
        onChange={onChange}
        value={payAmount}
        isOpen={updateModal}
        onClose={onClose}
        label="Enter Cash Amount"
        label1="Enter UPI Amount"
        onSubmit={UpdateChange}
        error={error}
        handleRefundChange={handleRefundChange}
        refund={refund}
        Upichecked={Upichecked}
        handleUPIChange={handleUPIChange}
        Cashchecked={Cashchecked}
        handleCashChange={handleCashChange}
        handleUpiAmountChange={handleUpiAmountChange}
        UpiAmount={UpiAmount}
        showUpi={showUpi}
        showCash={showCash}
        UpiError={UpiError}
      />
    </>
  );
};

export default CommonTable;
