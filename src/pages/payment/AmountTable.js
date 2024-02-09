import { BookingSubTypes } from 'pages/extra-pages/bookings/BookingSubTypes';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TablePagination } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import UpdateAmountModal from './UpdateAmountModal';

export default function AmountTable({
  columns,
  data,
  handleClick,
  editedData,
  setEditedData,
  details,
  onSubmit,
  onClose,
  isOpen,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage
}) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rowData, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === 'action' ? (
                      <IconButton aria-label="edit" color="primary" onClick={() => handleClick(rowData)}>
                        <EditIcon />
                      </IconButton>
                    ) : column.id === 'No' ? (
                      index + 1
                    ) : column.id === 'court' ? (
                      BookingSubTypes[rowData['bookingType']][rowData[column.id]]
                    ) : (
                      rowData[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <UpdateAmountModal
        editedData={editedData}
        setEditedData={setEditedData}
        data={details}
        onSubmit={onSubmit}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
}
