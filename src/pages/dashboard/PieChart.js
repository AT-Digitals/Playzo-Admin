import Chart from 'react-apexcharts';
import { Box, Typography, styled } from '@mui/material';

const StyledCharts = styled(Chart)(({ theme }) => ({
  '.apexcharts-canvas': {
    margin: '0 auto'
  },
  '.apexcharts-legend': {
    top: '100px !important'
  },
  '.apexcharts-legend-series': {
    fontSize: '40px',
    marginTop: '50px'
  },
  '.apexcharts-legend-marker': {
    height: '20px !important',
    width: '20px !important'
  },
  '.apexcharts-legend-text': {
    fontSize: '20px !important'
  }
}));

const PieChart = ({ selectData, palette1 }) => {
  const { labels, series } = selectData;

  const chartOptions = {
    chart: {
      type: 'pie'
    },
    theme: {
      mode: 'light',
      palette: palette1,
      monochrome: {
        enabled: false,
        color: '#255aee',
        shadeTo: 'light',
        shadeIntensity: 0.65
      }
    },
    labels: labels,
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      offsetX: 50,
      offsetY: 40,
      style: {
        fontSize: '15px',
        paddingX: '40px'
      },
      formatter: function (value, { seriesIndex, dataPointIndex, w }) {
        const categoryName = w.config.labels[seriesIndex];
        const valueForCategory = w.config.series[seriesIndex];
        return `${valueForCategory}`;
      }
    }
  };

  return (
    <Box paddingX={3} paddingTop={5} paddingBottom={5}>
      <Box width="100%" maxWidth="1200px" margin="auto">
        <StyledCharts options={chartOptions} series={series} type="pie" width="700" />
      </Box>
    </Box>
  );
};

export default PieChart;
