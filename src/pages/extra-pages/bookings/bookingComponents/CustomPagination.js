import React from 'react';
import Pagination from '@mui/material/Pagination';

const CustomPagination = ({ currentPage, totalPages, onChange }) => {
  return <Pagination count={totalPages} page={currentPage} onChange={onChange} />;
};

export default PaginationComponent;
