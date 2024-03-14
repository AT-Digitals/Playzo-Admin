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

const PieChart = ({ selectData, width, palette1 }) => {
  const { labels, series } = selectData;

  const chartOptions = {
    chart: {
      type: 'pie'
    },
    data: {
      datasets: [
        {
          label: 'Colors',
          data: [9, 8, 7, 6, 5, 4, 3, 2, 1],
          backgroundColor: [
            '#0074D9',
            '#FF4136',
            '#2ECC40',
            '#FF851B',
            '#7FDBFF',
            '#B10DC9',
            '#FFDC00',
            '#001f3f',
            '#39CCCC',
            '#01FF70',
            '#85144b',
            '#F012BE',
            '#3D9970',
            '#111111',
            '#AAAAAA'
          ]
        }
      ],
      labels: ['Total Amount', 'Online', 'Cash', 'UPI', 'Refund']
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
    // colors: ['pink', 'green'],
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
        <StyledCharts options={chartOptions} series={series} type="pie" width={width} />
      </Box>
    </Box>
  );
};

export default PieChart;
