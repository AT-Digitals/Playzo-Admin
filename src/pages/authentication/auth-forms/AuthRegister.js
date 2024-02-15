import * as Yup from 'yup';

import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { AccessType } from './AccessType';
import AnimateButton from 'components/@extended/AnimateButton';
import DropDownComponent from 'pages/extra-pages/DropDownComponent';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Formik } from 'formik';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import RegisterApi from 'api/RegisterApi';
import { strengthIndicator } from 'utils/password-strength';
import { useNavigate } from 'react-router-dom';

// material-ui

// third party

// project import

// assets

const userType = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' }
];

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    // setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phoneNumber: '',
          password: '',
          user: '',
          access: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          phoneNumber: Yup.string().max(10).required('Phone Number is required'),
          user: Yup.string().max(255).required('User is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (values.user === 'admin') {
              const response = await RegisterApi.createAdmin({
                email: values.email,

                password: values.password,
                name: values.name,

                phone: values.phoneNumber,

                accessType: values.access ?? ''
              });
              if (response) {
                navigate('/dashboard/default');
                setStatus({ success: true });
                setSubmitting(true);
              } else {
                console.log('Admin create account Failed');
              }
            } else {
              const data = await RegisterApi.createUser({
                email: values.email,

                password: values.password,
                name: values.name,

                phone: values.phoneNumber
              });
              if (data) {
                navigate('/dashboard/default');
                setStatus({ success: true });
                setSubmitting(true);
              } else {
                console.log('User create account Failed');
              }
            }
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">Name</InputLabel>
                  <OutlinedInput
                    id="name-login"
                    type="name"
                    value={values.firstname}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="helper-text-name-signup">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="company-signup">Phone Number</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    id="phoneNumber-signup"
                    value={values.phoneNumber}
                    name="phoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <FormHelperText error id="helper-text-phoneNumber-signup">
                      {errors.phoneNumber}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <DropDownComponent
                  name="user"
                  label="User"
                  options={userType}
                  value={values.user || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.user && errors.user)}
                />
              </Grid>
              {values.user === 'admin' && (
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Access</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="access"
                      value={values.access}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel value={AccessType.ALL} control={<Radio />} label="R+" />
                      <FormControlLabel value={AccessType.WRITE} control={<Radio />} label="RW" />
                      <FormControlLabel value={AccessType.READ} control={<Radio />} label="R" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create User
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
