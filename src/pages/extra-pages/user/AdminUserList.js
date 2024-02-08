import { useCallback, useEffect, useState } from 'react';

import MainCard from 'components/MainCard';
import { Stack } from '@mui/material';
import TableList from 'pages/common/TableList';
import UserApi from 'api/UserApi';

const columns = [
  { id: 'No', label: 'No' },
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email ID' },
  { id: 'phone', label: 'Phone' },
  { id: 'userType', label: 'User Type' },
  { id: 'accessType', label: 'Access Type' }
];

export default function AdminUserList() {
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

  const fetchInfo = useCallback(() => {
    try {
      UserApi.adminUserList({}).then((data) => {
        setCount(data.length);
      });
      UserApi.adminUserList({ page: page + 1, limit: rowsPerPage }).then((data) => {
        setData(data);
      });
    } catch {
      console.log('Error fetching data');
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  return (
    <MainCard title="Admin Users">
      <Stack direction="column" spacing={4}>
        <TableList
          count={count}
          columns={columns}
          data={data}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        ></TableList>
      </Stack>
    </MainCard>
  );
}
