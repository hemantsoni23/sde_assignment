import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface BarChartProps {
  cropData: { crop: string; avgYield: string }[];
}

const BarChart: React.FC<BarChartProps> = ({ cropData }) => {
  useEffect(() => {
    const chartDom = document.getElementById('bar-chart')!;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Average Yield by Crop',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      xAxis: {
        type: 'category',
        data: cropData.map((item) => item.crop),
        axisLabel: {
          interval: 0,
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
        name: 'Average Yield (Kg/Ha)',
      },
      series: [
        {
          name: 'Average Yield',
          type: 'bar',
          data: cropData.map((item) => parseFloat(item.avgYield)),
          itemStyle: {
            color: '#73C0DE',
          },
        },
      ],
    };

    myChart.setOption(option);

    // Cleanup on unmount
    return () => {
      myChart.dispose();
    };
  }, [cropData]);

  return <div id="bar-chart" style={{ width: '100%', height: '400px' }} />;
};

export default BarChart;
