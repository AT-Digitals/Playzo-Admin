import Chart from 'react-apexcharts';
import { Box, Typography, styled } from '@mui/material';

const StyledCharts = styled(Chart)(({ theme }) => ({
  '.apexcharts-canvas': {
    margin: '0 auto'
  }
  // ".apexcharts-tooltip .tooltip-container": {
  //   padding: theme.spacing(0.5, 1),
  //   ".label": {
  //     color: Colors.MENU_COLOR,
  //     fontSize: theme.typography.caption.fontSize,
  //   },
  //   ".value": {
  //     color: Colors.WHITE,
  //     fontSize: theme.typography.body3.fontSize,
  //     fontWeight: 700,
  //   },
  // },
}));

const PieChart = ({ selectData }) => {
  const { labels, series } = selectData;

  const chartOptions = {
    labels: labels,
    dataLabels: {
      enabled: true,
      formatter: function (value, { seriesIndex, dataPointIndex, w }) {
        return labels[dataPointIndex];
      }
    }
  };

  return (
    <Box paddingX={3} paddingY={2}>
      <Typography variant="h3">Booking Chart</Typography>
      <Box width="100%" maxWidth="1200px" margin="auto">
        <StyledCharts options={chartOptions} series={series} type="pie" width="650" />
      </Box>
    </Box>
  );
};

export default PieChart;
