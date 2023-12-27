import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

import React, { useEffect } from 'react';

export default function NotificationToast({ error }) {
  useEffect(() => {
    if (error !== '') {
      const toastId = toast.error(error, {
        autoClose: 5000,
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'colored'
      });

      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [error]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
