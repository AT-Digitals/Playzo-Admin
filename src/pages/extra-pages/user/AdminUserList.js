import { useCallback, useEffect, useState } from 'react';

import MainCard from 'components/MainCard';
import NotificationSuccessToast from 'pages/components-overview/NotificationSuccessToast';
import { Stack } from '@mui/material';
import TableList from 'pages/common/TableList';
import UserApi from 'api/UserApi';
import NotificationToast from 'pages/components-overview/NotificationToast';

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
  const [updateSuccessToast, setUpdateSuccessToast] = useState('');
  const [errorToast, setErrorToast] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

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

  const handleClose = () => {
    setUpdatePasswordModal(false);
    setPassword('');
    setConfirmPassword('');
    setErrorPassword(false);
    setErrorConfirmPassword(false);
    setShowConfirmPassword(false);
    setShowPassword(false);
    setUpdateSuccessToast('');
    setErrorToast('');
  };

  const UpdatePassword = async () => {
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

    const updatePasswordChange = async () => {
      if (password === confirmPassword) {
        try {
          const response = await UserApi.updatePassword(editData.id, { password: data.password });
          setUpdatePasswordModal(false);
          setPassword('');
          setConfirmPassword('');
          setShowConfirmPassword(false);
          setShowPassword(false);
          setUpdateSuccessToast('Your password updated successfully');
        } catch (error) {
          setErrorToast(error.message);
        }
      } else {
        setErrorToast('Please provide same value for confirm password');
        setUpdateSuccessToast('');
      }
    };
    updatePasswordChange();
  };

  console.log('updateToast', updateSuccessToast);

  const handleClickChange = (index) => {
    console.log('index', index);
    setEditData(index);
    setUpdatePasswordModal(true);
    setUpdateSuccessToast('');
    setErrorToast('');
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
          handleClickShowPassword={handleClickShowPassword}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          handleClickShowConfirmPassword={handleClickShowConfirmPassword}
        ></TableList>
        {errorToast !== '' ? <NotificationToast error={errorToast} /> : <></>}
        {updateSuccessToast !== '' ? <NotificationSuccessToast success={updateSuccessToast} /> : <></>}
      </Stack>
    </MainCard>
  );
}
