import CommonTable from '../bookings/bookingComponents/CommonTable';
import EnquiryApi from 'api/EnquiryApi';
import MainCard from 'components/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';

const columns = [
  { id: 'No', label: 'No' },
  { id: 'userName', label: 'User Name' },
  { id: 'userEmail', label: 'Email ID' },
  { id: 'phoneNumber', label: 'User Number' },
  { id: 'enquiryMessage', label: 'Message' }
];

export default function EnquiriesPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await EnquiryApi.getAll({}).then((data) => {
          setCount(data.length);
        });
        const res1 = await EnquiryApi.getAllPaging({ page: page + 1, limit: rowsPerPage }).then((data) => {
          setData(data);
          setFilteredData(data);
        });
      } catch {
        console.log('Error fetching data');
      }
    };
    fetchInfo();
  }, [page, rowsPerPage]);
  console.log('data', data);

  return (
    <MainCard title="Enquiries">
      <CommonTable
        columns={columns}
        count={count}
        data={data}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChange={handleChangePage}
      />
    </MainCard>
  );
}
