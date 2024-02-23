import { useCallback, useEffect, useState } from 'react';

import MainCard from 'components/MainCard';
import NotificationSuccessToast from 'pages/components-overview/NotificationSuccessToast';
import { Stack } from '@mui/material';
import TableList from 'pages/common/TableList';
import UserApi from 'api/UserApi';

const columns = [
  { id: 'No', label: 'No' },
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email ID' },
  { id: 'phone', label: 'Phone' },
  { id: 'userType', label: 'User Type' },
  { id: 'accessType', label: 'Access Type' },
  { id: 'action', label: 'Action' }
];

export default function AdminUserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);
  const [editData, setEditData] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [updateSuccesstoast, setUpdateSuccesstoast] = useState(false);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorPassword(false);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setErrorConfirmPassword(false);
  };

  const UpdatePassword = () => {
    if (!password) {
      setErrorPassword(true);
    }
    if (!confirmPassword) {
      setErrorConfirmPassword(true);
    }
    const data = {
      password: password,
      confirmPassword: confirmPassword
    };
    UserApi.updatePassword('id', { password: data.password });
    setUpdatePasswordModal(false);
    setPassword('');
    setConfirmPassword('');
    setUpdateSuccesstoast(true);
    console.log('data', data);
  };

  const handleClickChange = (index) => {
    setEditData(index);
    setUpdatePasswordModal(true);
  };

  const handleClose = () => {
    setUpdatePasswordModal(false);
    setPassword('');
    setConfirmPassword('');
    setErrorPassword(false);
    setErrorConfirmPassword(false);
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
    <MainCard title="Admin Panel List">
      <Stack direction="column" spacing={4}>
        <TableList
          count={count}
          columns={columns}
          data={data}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          onSubmit={UpdatePassword}
          onClose={handleClose}
          isOpen={updatePasswordModal}
          password={password}
          setPassword={handlePasswordChange}
          confirmPassword={confirmPassword}
          setConfirm={handleConfirmPasswordChange}
          handleClick={handleClickChange}
          error={errorPassword}
          error1={errorConfirmPassword}
        ></TableList>
        {updateSuccesstoast !== '' ? <NotificationSuccessToast success={updateSuccesstoast} /> : <></>}
      </Stack>
    </MainCard>
  );
}
