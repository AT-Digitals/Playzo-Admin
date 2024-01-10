import { useEffect } from 'react';
import CommonTable from '../bookings/bookingComponents/CommonTable';
import MainCard from 'components/MainCard';
import { useState } from 'react';
import EnquiryApi from 'api/EnquiryApi';

const columns = [
  { id: 'No', label: 'No' },
  { id: 'userName', label: 'User Name' },
  { id: 'userEmail', label: 'Email ID' },
  { id: 'phoneNumber', label: 'User Number' },
  { id: 'enquiryMessage', label: 'Message' }
];

export default function EnquiriesPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        await EnquiryApi.getAll().then((data) => {
          setData(data);
        });
        // const details = await res.json();
        // setData(details);
      } catch {
        console.log('Error fetching data');
      }
    };

    fetchInfo();
  }, []);
  console.log('data', data);

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
