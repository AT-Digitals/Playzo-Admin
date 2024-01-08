import { useEffect } from 'react';
import CommonTable from '../bookings/bookingComponents/CommonTable';
import MainCard from 'components/MainCard';
import { useState } from 'react';

const columns = [
  { id: 'No', label: 'No' },
  { id: 'userName', label: 'User Name' },
  { id: 'userNumber', label: 'user Number' },
  { id: 'email', label: 'Email ID' },
  { id: 'message', label: 'Message' }
];

const data = [
  {
    userName: 'thenmozhi',
    email: 'thenmozhivij@gmail.com',
    userNumber: '455656345',
    message: 'Enquiry details'
  },
  {
    userName: 'thenmozhi',
    email: 'thenmozhivij@gmail.com',
    userNumber: '455656345',
    message: 'Enquiry details'
  },
  {
    userName: 'thenmozhi',
    email: 'thenmozhivij@gmail.com',
    userNumber: '455656345',
    message: 'Enquiry details'
  },
  {
    userName: 'thenmozhi',
    email: 'thenmozhivij@gmail.com',
    userNumber: '455656345',
    message: 'Enquiry details'
  },
  {
    userName: 'thenmozhi',
    email: 'thenmozhivij@gmail.com',
    userNumber: '455656345',
    message: 'Enquiry details'
  },
  {
    userName: 'thenmozhi',
    email: 'thenmozhivij@gmail.com',
    userNumber: '455656345',
    message: 'Enquiry details'
  },
  {
    userName: 'thenmozhi',
    email: 'thenmozhivij@gmail.com',
    userNumber: '455656345',
    message: 'Enquiry details'
  },
  {
    userName: 'thenmozhi',
    email: 'thenmozhivij@gmail.com',
    userNumber: '455656345',
    message: 'Enquiry details'
  }
];

export default function EnquiriesPage() {
  //const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  return (
    <MainCard title="Enquiries">
      <CommonTable
        columns={columns}
        data={data}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChange={handleChangePage}
        value={[5, 10, 15]}
      />
    </MainCard>
  );
}
