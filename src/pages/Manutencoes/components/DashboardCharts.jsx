import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';

export const DashboardCharts = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO'],
      datasets: [
        {
          label: 'Manutenções',
          data: [4, 2, 7, 3, 5, 6],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }
      ]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <Card className="m-2 w-6">
      <div >
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </Card>
  )
}