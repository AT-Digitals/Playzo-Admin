import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import UpdatePasswordModal from 'pages/extra-pages/user/UpdatePasswordModal';
import moment from 'moment';

export default function TableList({
  columns,
  data,
  rowsPerPage,
  page,
  handleChangeRowsPerPage,
  count,
  handleChangePage,
  onSubmit,
  onClose,
  isOpen,
  password,
  setPassword,
  confirmPassword,
  setConfirm,
  handleClick,
  error,
  error1,
  handleClickShowPassword,
  showPassword,
  showConfirmPassword,
  handleClickShowConfirmPassword
}) {
  const renderCellContent = (column, rowData) => {
    const { id, label } = column;

    if (id === 'dateOfEnquiry') {
      return moment(rowData[id]).format('DD-MM-yyyy');
    } else if (id === 'userType') {
      if (rowData[id] === 'user') {
        return 'Customer';
      } else {
        return 'Admin';
      }
    } else if (id === 'accessType') {
      if (rowData[id] === 'read') {
        return 'Read';
      } else if (rowData[id] === 'write') {
        return 'Read/Write';
      } else {
        return 'All';
      }
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
                  <TableCell
                    key={column.id}
                    sx={{ textTransform: column.id === 'email' || column.id === 'userEmail' ? 'normal' : 'capitalize' }}
                  >
                    {column.id === 'action' ? (
                      <IconButton aria-label="edit" color="primary" onClick={() => handleClick(rowData)}>
                        <EditIcon />
                      </IconButton>
                    ) : column.id === 'No' ? (
                      index + 1
                    ) : (
                      renderCellContent(column, rowData)
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <UpdatePasswordModal
        onSubmit={onSubmit}
        onClose={onClose}
        isOpen={isOpen}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirm={setConfirm}
        error={error}
        error1={error1}
        handleClickShowPassword={handleClickShowPassword}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        handleClickShowConfirmPassword={handleClickShowConfirmPassword}
      />
    </>
  );
}
