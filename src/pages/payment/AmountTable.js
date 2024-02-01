import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import { TablePagination } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import UpdateIcon from '@mui/icons-material/Update';
import IconButton from '@mui/material/IconButton';

export default function AmountTable({ columns, data }) {
  const renderCellContent = (column, rowData) => {
    const { id } = column;

    return rowData[id];
  };
  return (
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
          {data.map((rowData, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.id === 'action' ? (
                    <IconButton aria-label="edit" color="primary">
                      <UpdateIcon />
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
  );
}
