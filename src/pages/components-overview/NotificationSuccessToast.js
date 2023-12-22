import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

import React from 'react';

export default function NotificationSuccessToast({ success }) {
  const notify = () => toast.success(success);
  if (success !== '') {
    notify();
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        limit={1}
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}
