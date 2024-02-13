import Chart from 'react-apexcharts';
import { Box } from '@mui/material';

const PieChart = ({ selectData }) => {
  // Sample data for the pie chart

  // Options for the pie chart
  // const chartOptions = {
  //   labels: selectData.map((data) => data.category)
  // };

  const { labels, series } = selectData;

  // Options for the pie chart
  const chartOptions = {
    labels: labels
  };

  return (
    <>
      <Box py={3}>
        <h2>Booking Chart</h2>
        <Chart options={chartOptions} series={series} type="pie" width="600" />
      </Box>
      {/* {selectedCategory === 'All Booking Type' ? (
        <></>
      ) : (
        selectData.map((data) => (
          <div key={data.category}>
            <h3>{data.category}</h3>
            <p>Total Orders: {data.totalBookings}</p>
            <p>Online Orders: {data.onlineBookings}</p>
            <p>Offline Orders: {data.offlineBookings}</p>
          </div>
        ))
      )} */}
    </>
  );
};

export default PieChart;
