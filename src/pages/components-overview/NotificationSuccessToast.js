import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

import React, { useEffect } from 'react';

export default function NotificationSuccessToast({ success }) {
  useEffect(() => {
    if (success !== '') {
      const toastId = toast.success(success, {
        autoClose: 5000,
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'light'
      });

      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [success]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
