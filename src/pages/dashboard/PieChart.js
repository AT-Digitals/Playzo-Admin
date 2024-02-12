import Chart from 'react-apexcharts';

const PieChart = () => {
  // Sample data for the pie chart
  const chartData = [
    { category: 'Turf', value: 30 },
    { category: 'Board Game', value: 40 },
    { category: 'Play Station', value: 20 },
    { category: 'Cricket Net', value: 10 },
    { category: 'Bowling Machine', value: 10 },
    { category: 'Badminton', value: 10 }
  ];

  // Options for the pie chart
  const chartOptions = {
    labels: chartData.map((data) => data.category)
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      <Chart options={chartOptions} series={chartData.map((data) => data.value)} type="pie" width="600" />
    </div>
  );
};

export default PieChart;
